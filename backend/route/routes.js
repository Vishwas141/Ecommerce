const express=require("express");
const router=express.Router();

//middleware
const {isAuthenticated}=require("../middleware/auth");
//for user controller

const {createUser,activateUserFromToken, loginUser,loadUserDetails}=require("../controller/user");

//create user 
router.post("/user/create-user",createUser);

//activate user and signup token storing in cookies 
router.post("/user/activation",activateUserFromToken);

// login process
router.post("/user/login",loginUser);

//load user details 
router.get("/user/loaduser-details",isAuthenticated,loadUserDetails);



module.exports=router;