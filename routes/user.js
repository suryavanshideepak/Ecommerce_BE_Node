const express = require("express");
const userRouter = express.Router();
const productModel = require("../model/product");
const controller = require('../controller/userController')
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

userRouter.post("/upload", upload.single("image"), (req, res) => {
  // console.log(req)
  const user = new productModel({
    image: req.file.path,
    rating: req.body.rating,
    pieces: req.body.pieces,
    title: req.body.title,
    price: req.body.price,
    discription: req.body.discription,
  });
  user
    .save()
    .then((data) => {
      console.log(data)
      res.status(200).json({ data: data });
    })
    .catch((err) => {
      res.status(400).json({ err: err });
    });
});

userRouter.get("/upload", (req, res) => {
  productModel.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});


userRouter.post("/signup",controller.signUp);

userRouter.post("/login",controller.loginUser);

userRouter.get("/search/:key", controller.search)

module.exports = userRouter;
