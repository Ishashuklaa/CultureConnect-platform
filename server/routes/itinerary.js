import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user's itinerary
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('itinerary');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.itinerary || []);
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add to itinerary
router.post('/', auth, async (req, res) => {
  try {
    console.log('Add to itinerary request body:', req.body);
    console.log('User ID:', req.userId);
    
    const { culturalSite, state, type, location = '', bestTime = '', description = '' } = req.body;
    
    // Validate required fields
    if (!culturalSite || !state || !type) {
      console.log('Missing required fields:', { culturalSite, state, type });
      return res.status(400).json({ 
        message: 'Cultural site, state, and type are required fields' 
      });
    }
    
    const user = await User.findById(req.userId);
    if (!user) {
      console.log('User not found:', req.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user.name);

    // Initialize itinerary if it doesn't exist
    if (!user.itinerary) {
      user.itinerary = [];
    }

    console.log('Current itinerary length:', user.itinerary.length);

    // Check if item already exists in itinerary
    const existingItem = user.itinerary.find(
      item => item.culturalSite === culturalSite && item.state === state
    );

    if (existingItem) {
      console.log('Item already exists in itinerary');
      return res.status(400).json({ message: 'Item already in itinerary' });
    }

    // Create new item object with proper structure
    const newItem = {
      culturalSite: String(culturalSite),
      state: String(state),
      type: String(type),
      location: String(location || ''),
      bestTime: String(bestTime || ''),
      description: String(description || ''),
      dateAdded: new Date()
    };

    console.log('Adding new item:', newItem);

    // Add new item to itinerary
    user.itinerary.push(newItem);
    
    // Save the user
    const savedUser = await user.save();
    console.log('User saved successfully, new itinerary length:', savedUser.itinerary.length);
    
    res.status(201).json({ 
      message: 'Added to itinerary successfully',
      item: newItem,
      itinerary: savedUser.itinerary 
    });
  } catch (error) {
    console.error('Error adding to itinerary:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Remove from itinerary
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    user.itinerary = user.itinerary.filter(
      item => item._id.toString() !== req.params.id
    );
    
    await user.save();
    
    res.json({
      message: 'Item removed from itinerary',
      itinerary: user.itinerary
    });
  } catch (error) {
    console.error('Error removing from itinerary:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;