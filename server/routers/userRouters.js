const express = require('express');
const {createUser,getAllUsers,loginUser}=require('../controllers/userController');

const router=express.Router();

router.post('/create', createUser);
router.get('/all',getAllUsers);
router.post('/login',loginUser)


module.exports=router;