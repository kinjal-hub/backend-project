const express = require("express");
const images = require("./data.json");
const app = express();

const PORT = 8000;

//Routes
// Route for get all images
app.get("/api/images", (req, res) => {
    return res.json(images);
});
// Route for get image by id
app.get("/api/images/:id", (req, res) => {
  const id = Number(req.params.id);
  const image = images.find((image) => image.id === id);
  return res.json(image);
})
app.listen(PORT,console.log(`Server Started at PORT:${PORT}`));