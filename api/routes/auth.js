import express from "express";
import User from "../models/user.js";
import bcrypt from 'bcrypt'

const userAuth = express.Router();

//Register
userAuth.post("/register", async (req, res) => { 
  try{
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    //create user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
    //save user and respond
    const user = await newUser.save();
    res.status(200).json({
        status:true,
        user:user,
    })
  }catch(error) {
    res.status(500).json(error)
  }
});

//LOGIN
userAuth.post("/login",async(req,res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        !user && res.status(404).json("User Not Found")
        
        const validPassword = await bcrypt.compare(req.body.password,user.password)
        !validPassword && res.status(400).json("Invalid Password")

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


export { userAuth };
