import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'seller'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  interests: [{
    type: String
  }],
  savedStories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  }],
  itinerary: [{
    culturalSite: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    location: {
      type: String,
      default: ''
    },
    bestTime: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
  }],
  languageProgress: [{
    language: String,
    state: String,
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    progress: {
      type: Number,
      default: 0
    }
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);