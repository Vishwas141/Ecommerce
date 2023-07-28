const express=require("express");
// const ErrorHandler = require("./utils/ErrorHandler");
const app=express();
const cors=require("cors");
const cookieParser=require("cookie-parser")
const bodyParser=require("body-parser")
const fileUpload=require("express-fileupload")
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
require("dotenv").config();


//import Routes
const router=require("./route/routes");
app.use("/api/v2",router);


//it is for errorhandling
// console.log("error wale ")
// app.use(ErrorHandler);
// console.log("error wale ")

module.exports=app;