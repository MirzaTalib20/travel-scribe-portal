
const mongoose = require('mongoose');

const ItineraryDaySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  activities: [String]
});

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const PackageSchema = new mongoose.Schema({
  title: {
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
  duration: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  itinerary: [ItineraryDaySchema],
  inclusions: [String],
  exclusions: [String],
  faqs: [FAQSchema],
  featured: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Package', PackageSchema);
