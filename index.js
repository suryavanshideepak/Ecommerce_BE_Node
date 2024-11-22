const express=require("express");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
const config= require("./DB");
const userRoute=require('./routes/user');
const productRoute = require('./routes/product');

 
mongoose.connect(config.DB).then(()=>{
    console.log("connection Established")
})
.catch(err=>{
    console.log(err)
})
app.get('/', ( req, res )=>{
    res.status(200).send("Successfull done")
})
app.use(cors())
app.use(express.json())
app.use("/user",userRoute)
app.use("/product",productRoute)

const port=4500;
app.listen(port,()=>{
    console.log(`listening on Port ${port}`)
})



