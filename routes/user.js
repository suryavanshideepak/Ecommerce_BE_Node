const express = require("express");
const userRouter = express.Router();
const userModel = require("../model/user");
const productModel = require("../model/product");
// const bcrypt = require("bcrypt");
// const TOKEN_SECRET = "b91028378997c0b3581821456edefd417606a";
// const jwt = require("jsonwebtoken");
const controller = require('../controller/auth')
const { verifyMiddelware } = require("../verifyToken");
const { body, validationResult } = require("express-validator");
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


userRouter.post(
  "/signup",
  body("name").isLength({ min: 25 }).withMessage("enter a valid name"),
  body("email").isEmail().withMessage("enter a valid email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("password must be atleast 6 characters"),
  (req, res) => {
    const newHash = bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) {
      } else if (hash) {
        let user = new userModel({
          name: req.body.name,
          lname: req.body.lname,
          email: req.body.email,
          password: hash,
        });
        console.log(user);
        user
          .save()
          .then((data) => {
            res.status(200).send({ data });
          })
          .catch((err) => {
            res.status(400).send({ err });
          });
      }
    });
  }
);

userRouter.post("/login",controller.loginUser);

userRouter.post("/verify", verifyMiddelware, (req, res) => {
  res.json(req.body);
});
//search api
userRouter.get("/search/:key", controller.search)

module.exports = userRouter;
