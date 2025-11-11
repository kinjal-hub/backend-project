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

// Middleware to handle timeouts (optional, but recommended for cleaner code)
const timeoutMiddleware = (req, res, next) => {
  req.setTimeout(5000, () => { // 5 seconds timeout
    if (!res.headersSent) {
      res.status(503).json({ message: "Request timed out" });
    }
  });
  next();
};

// Routes
// Route for get all images
app.get("/api/images", async (req, res) => {
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      return res.status(503).json({ message: "Request timed out" });
    }
  }, 5000); // 5 seconds timeout

  try {
    const images = await Image.find({}); // Find all images
    clearTimeout(timeout); // Clear timeout if operation completes
    return res.json(images);
  } catch (error) {
    clearTimeout(timeout); // Clear timeout on error
    return res.status(500).json({ message: "Error retrieving images", error });
  }
});

// Route for get image by id
app.get("/api/images/:_id", async (req, res) => {
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      return res.status(503).json({ message: "Request timed out" });
    }
  }, 5000); // 5 seconds timeout

  try {
    const id = req.params._id;
    const image = await Image.findById(id); // Find image by ID
    clearTimeout(timeout); // Clear timeout if operation completes
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    return res.json(image);
  } catch (error) {
    clearTimeout(timeout); // Clear timeout on error
    return res.status(500).json({ message: "Error retrieving image", error });
  }
});

// Route for delete image by id
app.delete('/api/images/:_id', async (req, res) => {
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      return res.status(503).json({ message: "Request timed out" });
    }
  }, 5000); // 5 seconds timeout

  try {
    const id = req.params._id;
    const deletedImage = await Image.findByIdAndDelete(id); // Find and delete image by ID
    clearTimeout(timeout); // Clear timeout if operation completes
    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }
    return res.json({ message: 'Image deleted successfully', deletedImage });
  } catch (error) {
    clearTimeout(timeout); // Clear timeout on error
    return res.status(500).json({ message: 'Error deleting image', error });
  }
}); 



// Start server
app.listen(PORT, console.log(`Server Started at PORT:${PORT}`));
