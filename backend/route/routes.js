const express=require("express");
const router=express.Router();

//for user controller

const {createUser,activateUserFromToken}=require("../controller/user");

//create user 
router.post("/user/create-user",createUser);

//activate user
router.post("/activation",activateUserFromToken);

module.exports=router;