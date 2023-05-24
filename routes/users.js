const router = require('express').Router();
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {authenticateToken}=require('../middleware')
require('dotenv').config()

//Get all users on default route
router.get('/',authenticateToken, async (req, res) => {
    const users = await User.find()
    res.status(200).json(users);
})

//Get a user by id
router.route('/:id',authenticateToken).get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      }
      //console.log(user);
      //console.log(req.params.id);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//Update User By id
router.route('/:id').put(async (req, res) => {  
    if(req.body.userId === req.params.id){
        if(req.body.userPassword){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.userPassword = await bcrypt.hash(req.body.userPassword , salt)
            } catch (error) {
                return res.status(404).json(error)
                
            }
        }
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                { new: true });
            res.status(200).json({message: "Account has been Updated Successfully" ,user})
            
            }
        catch (error) {
            return res.status(404).json(error)
        }
    }
    else{
        return res.status(405).json("You can update only your account")
    }

  });

  //Delete User By id
  router.route('/:id').delete(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
            } 
        else{
                await User.findByIdAndDelete(req.params.id);
                return res.status(200).json({ message: "User has been deleted" });
            }
        }
        catch (error) {
           return res.status(500).json(error)
        }
});

  router.route('/username/:userName').delete(async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ userName: req.params.userName });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        return res.status(200).json({ message: "User has been deleted" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  

module.exports = router
