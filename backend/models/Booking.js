import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  experienceName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  promoCode: {
    type: String,
    default: null
  },
  discount: {
    type: Number,
    default: 0
  },
  subtotal: {
    type: Number,
    required: true
  },
  taxes: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  bookingRef: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'pending'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

// Index for checking duplicate bookings
bookingSchema.index({ email: 1, experienceId: 1, date: 1, time: 1 });

export default mongoose.model('Booking', bookingSchema);
