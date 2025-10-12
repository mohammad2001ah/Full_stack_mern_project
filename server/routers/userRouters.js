const express = require('express');
const {createUser,getAllUsers,loginUser,deleteUser,updateUser}=require('../controllers/userController');
const verifyToken =require('../middleware/auth.js');
const isAdmin=require('../middleware/isAdmin.js');

const router=express.Router();

router.post('/create', createUser);
router.post('/login',loginUser);
router.get('/all',verifyToken,isAdmin,getAllUsers);
router.delete("/delete/:id",verifyToken,deleteUser);
router.put("/update/:id",verifyToken,updateUser);


module.exports=router;