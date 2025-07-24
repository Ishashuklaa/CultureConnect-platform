import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import storyRoutes from './routes/stories.js';
import productRoutes from './routes/products.js';
import cultureRoutes from './routes/culture.js';
import languageRoutes from './routes/languages.js';
import itineraryRoutes from './routes/itinerary.js';

dotenv.config();

const app = express();
const allowedOrigins = [
  'https://culture-connect-platform.vercel.app',
  'https://culture-connect-platform-ji4k7ruu3-ishashuklaas-projects.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ohisha00:72hUoS9gaeyMSyBx@cluster0.x1jp1ss.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB',process.env.MONGODB_URI))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/products', productRoutes);
app.use('/api/culture', cultureRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/itinerary', itineraryRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  console.error('Error stack:', error.stack);
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});