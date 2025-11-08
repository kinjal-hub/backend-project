const express = require("express");
const mongoose = require("mongoose");
const Image = require("./models/Image"); 

const app = express();
const PORT = 8000;

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    
    await mongoose.connect('mongodb://127.0.0.1:27017/my_image_db'); 
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Could not connect to MongoDB...', err);
  }
};

connectToDatabase();

// Routes

// Route for get all images
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find({}); // Find all images
    return res.json(images);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving images", error });
  }
});

// Route for get image by id
app.get("/api/images/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const image = await Image.findById(id); // Find image by ID
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    return res.json(image);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving image", error });
  }
});

// Start server
app.listen(PORT, console.log(`Server Started at PORT:${PORT}`));
