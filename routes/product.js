const express = require("express");
const productRouter = express.Router();
const controller = require('../controller/productController')
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

productRouter.post("/upload", upload.single("image"),controller.addProduct);

productRouter.get("/upload",controller.getAllProduct);

module.exports = productRouter;
