import express from 'express';
import Story from '../models/Story.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all stories
router.get('/', async (req, res) => {
  try {
    const { category, state, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (state) query.state = state;

    const stories = await Story.find(query)
      .populate('author', 'name avatar')
      .populate('comments.user', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Story.countDocuments(query);

    res.json({
      stories,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create story
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    // Handle uploaded image
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const story = new Story({
      ...req.body,
      author: req.userId,
      image: image
    });
    await story.save();
    
    const populatedStory = await Story.findById(story._id)
      .populate('author', 'name avatar');
    
    res.status(201).json(populatedStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like/unlike story
router.post('/:id/like', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    const likeIndex = story.likes.findIndex(like => 
      like.user.toString() === req.userId
    );

    if (likeIndex > -1) {
      story.likes.splice(likeIndex, 1);
    } else {
      story.likes.push({ user: req.userId });
    }

    await story.save();
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    story.comments.push({
      user: req.userId,
      text: req.body.text
    });

    await story.save();
    
    const updatedStory = await Story.findById(story._id)
      .populate('author', 'name avatar')
      .populate('comments.user', 'name avatar');
    
    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;