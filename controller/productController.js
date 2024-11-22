const productModel = require('../model/product')

module.exports = {
    addProduct: async (req, res) => {
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
    },
    getAllProduct: async (req,res) => {
        productModel.find(function (err, data) {
            if (err) {
              console.log(err);
            } else {
              res.send(data);
            }
          });
    }
}