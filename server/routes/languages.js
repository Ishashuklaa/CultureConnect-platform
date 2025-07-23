import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Static language data
const languageData = {
  'Tamil Nadu': {
    language: 'Tamil',
    lessons: [
      { id: 1, title: 'Basic Greetings', content: 'Vanakkam - Hello', difficulty: 'beginner' },
      { id: 2, title: 'Numbers', content: 'Onnu, Rendu, Moonu - One, Two, Three', difficulty: 'beginner' }
    ]
  },
  'Gujarat': {
    language: 'Gujarati',
    lessons: [
      { id: 1, title: 'Basic Greetings', content: 'Namaste - Hello', difficulty: 'beginner' },
      { id: 2, title: 'Common Phrases', content: 'Kem cho? - How are you?', difficulty: 'beginner' }
    ]
  }
};

// Get languages by state
router.get('/state/:state', async (req, res) => {
  try {
    const { state } = req.params;
    const data = languageData[state] || null;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update language progress
router.post('/progress', auth, async (req, res) => {
  try {
    const { language, state, progress, level } = req.body;
    
    const user = await User.findById(req.userId);
    const existingProgress = user.languageProgress.find(
      p => p.language === language && p.state === state
    );

    if (existingProgress) {
      existingProgress.progress = progress;
      existingProgress.level = level;
    } else {
      user.languageProgress.push({ language, state, progress, level });
    }

    await user.save();
    res.json(user.languageProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;