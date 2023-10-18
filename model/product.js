const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    
    title:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true,
    },
    discription:{
        type:String,
        require:true,
    },
     rating:String,
     pieces:String,
     image:String,
  }
);
module.exports = new mongoose.model("product", User);
