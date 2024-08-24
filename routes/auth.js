const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
var jwt= require('jsonwebtoken');
const JWT_SECRET =  'Masoomisagirl';

const router = express.Router();


// Define the POST route for authentication
router.post('/createuser', [
  body('name', 'Enter a Valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
],async (req, res) => {

  //IF there are errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

// check whether the email exist already
try{
let user = await User.findOne({email:req.body.email});
if(user){
  return res.status(400).json({error:"Sorry a user with this email already exist"})
}
const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password,salt); 

user = await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass,

    
  });
  const data={
    user:{
      id:user.id
    }
  }
const authToken= jwt.sign(data,JWT_SECRET);


 res.json({authToken})
}
catch(error){console.log(error.message)};
res.status(500).send
});

module.exports = router;
