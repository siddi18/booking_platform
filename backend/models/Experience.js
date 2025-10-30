import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  times: [{
    time: {
      type: String,
      required: true
    },
    available: {
      type: Number,
      required: true,
      default: 10
    },
    booked: {
      type: Number,
      default: 0
    }
  }]
});

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300'
  },
  category: {
    type: String,
    default: 'Adventure'
  },
  slots: [slotSchema],
  minAge: {
    type: Number,
    default: 18
  },
  includes: {
    type: String,
    default: 'Curated small-group experience. Certified guide. Safety first with gear included.'
  }
}, {
  timestamps: true
});

export default mongoose.model('Experience', experienceSchema);
