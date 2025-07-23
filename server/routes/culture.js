import express from 'express';

const router = express.Router();

// Static cultural data - in production this would be from database
const culturalData = {
  traditions: {
    'Rajasthan': [
      { name: 'Ghoomar Dance', description: 'Traditional folk dance of Rajasthan', image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg' },
      { name: 'Puppet Shows', description: 'Traditional string puppet performances', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg' }
    ],
    'Kerala': [
      { name: 'Kathakali', description: 'Classical dance-drama of Kerala', image: 'https://images.pexels.com/photos/3992653/pexels-photo-3992653.jpeg' },
      { name: 'Boat Races', description: 'Traditional snake boat races', image: 'https://images.pexels.com/photos/3992647/pexels-photo-3992647.jpeg' }
    ]
  },
  festivals: {
    'Maharashtra': [
      { name: 'Ganesh Chaturthi', description: 'Festival celebrating Lord Ganesha', image: 'https://images.pexels.com/photos/3992651/pexels-photo-3992651.jpeg' }
    ],
    'West Bengal': [
      { name: 'Durga Puja', description: 'Festival celebrating Goddess Durga', image: 'https://images.pexels.com/photos/3992649/pexels-photo-3992649.jpeg' }
    ]
  }
};

// Get cultural content by category and state
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { state } = req.query;

    if (state && culturalData[category] && culturalData[category][state]) {
      res.json(culturalData[category][state]);
    } else if (culturalData[category]) {
      res.json(culturalData[category]);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;