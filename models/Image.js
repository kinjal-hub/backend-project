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
  }
});


module.exports = mongoose.model("Image", imageSchema);
