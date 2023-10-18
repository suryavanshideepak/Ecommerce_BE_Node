const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    name:{
      type:String,
      required:true
    },
    lname: {
      type: String,
      required: true
    }, 
    email: {
      type: String,
      required: true,
    },
    password:{
      type: String,
      required : true
    }
  },
  {
    collection: "user",
  }
);

module.exports = new mongoose.model("product_details", User);
