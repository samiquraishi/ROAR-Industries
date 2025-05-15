import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: {
  type: String,
  required: [true, 'Name is required'],
  trim: true,
  minlength: [2, 'Name must be at least 2 characters'],
  maxlength: [50, 'Name cannot exceed 50 characters'],
  match: [
    /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/,
    'Name can only contain letters, spaces, hyphens, and apostrophes'
  ]
},
  email: {
  type: String,
  required: [true, 'Email is required'],
  trim: true,
  lowercase: true,
  match: [
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Please enter a valid email address'
  ],
},
  fieldOfInterest: {
    type: String,
    required: [true, 'Field of interest is required'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema); 