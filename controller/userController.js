const userRouter = require("../routes/user");
const userModel = require("../model/user");
const productModel = require('../model/product')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "b91028378997c0b3581821456edefd417606a";

module.exports = {
    
  loginUser: async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email });
    try {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const accessToken = jwt.sign({ id: user._id }, TOKEN_SECRET);
        res.send({ accessToken: accessToken });
      } else {
        res.status(400).send({ message: "E-mail or password mismatch" });
      }
    } catch (err) {
      console.log(err);
    }
  },

  signUp: async (req, res, next) => {
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
  },

  search: async (req, res) => {
    let data = req.params.key
    if (data != null) {
      productModel.find({ "$or": [{ "title": { $regex: req.params.key } }]}).then((result) => {
        res.json(result)
      })
        .catch(err => {
          console.log(err)
        })
    }
  }
}