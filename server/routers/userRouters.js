const express = require('express');
const {createUser,getAllUsers,loginUser,deleteUser,updateUser}=require('../controllers/userController');

const router=express.Router();

router.post('/create', createUser);
router.get('/all',getAllUsers);
router.post('/login',loginUser);
router.delete("/delete/:id",deleteUser);
router.put("/update/:id",updateUser);


module.exports=router;