//import user models
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

//user register

const createUser=async(req,res)=>{
  const{name,email,password,role}=req.body;

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
      name,email,password:hashedPassword,
      role:role ||"user"
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt:", email);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid Email Or Password" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid Email Or Password" });
    }

    const token = jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log("User logged in successfully:", user.email);

    return res.status(200).json({ message: "Login Successful", token, user,role:user.role });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message });
  }
};

//delete user
const deleteUser=async(req,res)=>{
  const{id}=req.params;
  try {
    const user=  await User.findById(id);
    if(!user){
      return res.status(404).json({message:"User Not Found"});
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({message:"User Deleted Successfully"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
//update user

const updateUser=async(req,res)=>{
  const {id}=req.params;
  const{name,email}=req.body;
  try {
    const userToUpdate = await User.findByIdAndUpdate(id,{name,email})
    res.status(200).json({message:"user Updated done",user:userToUpdate})
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports={createUser,getAllUsers,loginUser,deleteUser,updateUser};