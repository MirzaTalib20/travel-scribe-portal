
import mongoose from 'mongoose';

const ItineraryDaySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  activities: [String]
});

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: false
  },
  answer: {
    type: String,
    required: false
  }
});

const PackageSchema = new mongoose.Schema({
  id: {
    type: String,
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
  people: {
    type: Number,
    required: false
  },
  rating: {
    type: String,
    required: false
  },
  reviews:  {
    type: String,
    required: false
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

const Package = mongoose.model('Package', PackageSchema);
export default Package;
