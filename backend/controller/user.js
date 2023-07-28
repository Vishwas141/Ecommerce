const express = require("express");
const User = require("../model/user");
const sendToken =require("../utils/jwtToken");

require("dotenv").config();

var cloudinary = require("cloudinary").v2;

const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");





function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);

  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// create user
exports.createUser = async (req, res, next) => {
  try {
  
    const { name, email, password } = req.body;

    //extract file from request

    const file = req.files.avatar;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({
        success: false,
        message: "User Already exists",
      });
    }

    try
    {

      const imageUpload=await uploadFileToCloudinary(file,"avatars");
      const user={
        name:name,
        email:email,
        password:password,
        avatar:
        {
          public_id:imageUpload.public_id,
          url:imageUpload.secure_url
        }

      }

      console.log("imageUpload to cloudinary",imageUpload);
     

      const activationToken=createActivationToken(user);

      const activationUrl=`http://localhost:3000/activation/${activationToken}`;

      try
      {
           await sendMail({
              email:user.email,
              subject:"Activate Your account",
              message:`Hello ${user.name} , Please click on the link to activate your account :${activationUrl}`,
            
            })

            console.log("mail sent successfully");
            

            return res.status(201).json({
              success:true,
              message:`please check user email : ${user.email } to activate user Account`


            })
      }
      catch(err)
      {
        return res.status(500).json({
          success: false,
          message:"Error while sending mail",
        });
      }
    }
    catch(err)
    {
      return res.status(400).json({
        success: false,
        message:"Error while Upload Image to cloudinary",
      });
    }

   
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:"Error while sign Up",
    });
  }
};

//create activation Token
const createActivationToken=(user)=>
{
    return jwt.sign(user,process.env.ACTIVATION_SECRET,{
      expiresIn:"5m"
    });
}


//activate user  

exports.activateUserFromToken=async(req,res,next)=>
{
  try
  {
        
       
       const activation_token=req.body.activation_token;
        

        console.log("activation token from body",activation_token);

        const newUser=await jwt.verify(activation_token,process.env.ACTIVATION_SECRET);

        if (!newUser) 
        {
          return res.status(400).json({
            message:"Invalid Token",
            success:false
          })
        }

        const {name,email,password,avatar}=newUser;

        let user = await User.findOne({ email });

        if (user)
        {
          return res.status(400).json({
            message:"User already exists",
            success:false
          })
        }

        console.log("user created but i am still confused");
        console.log("avatar",avatar);

        user = await User.create({
          name,
          email,
          avatar,
          password,
        });

        console.log("token called user ccreated ",user);

        sendToken(user,201,res);

        console.log("lets pray all is clear");
        

  }
  catch(err)
  {
    return res.status(400).json({
      message:"Token not succesful",
      success:err.message
    })
  }
}