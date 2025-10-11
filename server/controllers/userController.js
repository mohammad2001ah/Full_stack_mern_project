//import user models
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

//user register

const createUser=async(req,res)=>{
  const{name,email,password}=req.body;

  try {
    //check if user already exists
    const existingUser= await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message:"User Already Exists"});
    };

    //hashed password
    const hashedPassword =await bcrypt.hash(password,10);

    //create nae user
    const newUser=new User({
      name,email,password:hashedPassword
    });
    await newUser.save();

    res.status(201).json({message:"User Registered Successfully"});
  }
  catch (error) {
    console.log("User registration error");
    res.status(500).json({message:error.message});
  };
};

//get all user

const getAllUsers=async(req,res)=>{
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

//login user
const loginUser=async(req,res)=>{
  const {email,password}=req.body;
  //check if user exists or not
  try {
    const user =await User.findOne({email});
    if(!user){
      res.status(401).json({message:"Invalid Email Or Password"});
    };

    const isMatched =await bcrypt.compare(password,user.password);

    if(!isMatched){
      res.status(401).json({message:"Invalid Email Or Password"});
    }

    if(user){
      const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
      res.status(200).json({message:"Login Successful",token,user});
    }
    else{
      res.status(401).json({message:"Invalid Email Or Password"});
    };
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};










module.exports={createUser,getAllUsers,loginUser};