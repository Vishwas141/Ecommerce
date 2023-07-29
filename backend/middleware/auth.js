const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();
const mongoose = require("mongoose");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please Login ton continue",
      });
    }
    console.log(process.env.JWT_SECRET);

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    //adding user detaisl in req

    const user=await User.findById(decode.id);
    console.log("req user", user);

    req.user = user;

    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
