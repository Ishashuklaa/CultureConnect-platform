import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save/unsave story
router.post('/save-story/:storyId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.savedStories) {
      user.savedStories = [];
    }
    
    const storyIndex = user.savedStories.indexOf(req.params.storyId);
    
    if (storyIndex > -1) {
      user.savedStories.splice(storyIndex, 1);
    } else {
      user.savedStories.push(req.params.storyId);
    }
    
    await user.save();
    res.json({ saved: storyIndex === -1 });
  } catch (error) {
    console.error('Error saving story:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get saved stories
router.get('/saved-stories', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: 'savedStories',
        populate: { path: 'author', select: 'name avatar' }
      });
    
    res.json(user.savedStories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;