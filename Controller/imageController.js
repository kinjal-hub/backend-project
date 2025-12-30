const timeoutMiddleware = require("../Middleware/settimeout");
const Image = require("../models/Image");

// Route for get all images
const getAllImages = async (req, res) => {
  try {
    const { title, fromDate, toDate } = req.body || {};
    
    const allImages = await Image.find({});

    const filteredImages = allImages.filter((img) => {
      let matcheTitle = true;
      let matcheDate = true;

      // serch by title (case-insensitive)
      if (title) {
        matcheTitle = img.title.toLowerCase().includes(title.toLowerCase());
      }
      // Filter by Date 
      const imgDate = new Date(img.createdAt);
      if (fromDate) {
        matcheDate = matcheDate && imgDate >= new Date(fromDate);
      }
      if (toDate) {
        matcheDate = matcheDate && imgDate <= new Date(toDate);
      }
      return matcheTitle && matcheDate;
    });
     res.json(filteredImages);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving images", error: error.message });
  }
};


// Route for get image by id
const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving image", error });
  }
};

// Route for delete image by id
const deleteImage = async (req, res) => {
  try {
    const deletedImage = await Image.findByIdAndDelete(req.params.id);
    if (!deletedImage) return res.status(404).json({ message: 'Image not found' });
    res.json({ message: 'Image deleted successfully', deletedImage });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error });
  }
};

module.exports = {
    getAllImages,
    getImageById,
    deleteImage,
}

