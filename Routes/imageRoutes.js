const express = require("express");
const router = express.Router();
const imageController = require("../Controller/imageController");

router.get("/", imageController.getAllImages);
router.get("/:id", imageController.getImageById);
router.delete("/:id", imageController.deleteImage);

module.exports = router;
