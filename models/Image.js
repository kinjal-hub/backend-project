const mongoose = require("mongoose");

// Define the schema for the images
const imageSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  isActive: {
    type: Boolean,
    default: true 
  }
},
);


module.exports = mongoose.model("Image", imageSchema);
