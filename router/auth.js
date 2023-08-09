const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('../db/conn');
const User=require('../model/userSchema');

router.get("/",(req,res)=>{
    // res.cookie("Test","ForestWatchAI");
    res.send("Hello Everyone");
});

//Registration/Signup Route
router.post('/signup',async (req,res) => {

    const {fname,lname,email,password,confirmPassword}=req.body;

    if(!fname || !lname || !email || !password || !confirmPassword){
        return res.status(422).json({error:"Please fill all the fields properly"});
    }

    try{
        const userExist=await User.findOne({email:email});

        if(userExist){
            return res.status(422).json({error:"User already registered"});
        } else if(password != confirmPassword){
            return res.status(422).json({error:"Password and Confirm Password must match"});
        } else{
            const user=new User({fname,lname,email,password,confirmPassword});

            const userRegister=await user.save();
            if(userRegister){
                res.status(201).json({message:"User registered successfully"});
            } else{
                res.status(500).json({error:"Failed to register"});
            }
        }
    } catch(err){
        console.log(err);
    }

});

//Login Route
router.post('/login',async (req,res) => {
    try{
        const {email,password}=req.body;
        let token;
        if(!email || !password){
            return res.status(400).json({error:"Please fill all the fields"});
        }

        const userLogin = await User.findOne({email:email});
        
        if(!userLogin){
            res.status(400).json({error:"Invalid Details"});
        } else{
            const isMatch = await bcrypt.compare(password,userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwttoken",token,{
                expires:new Date(Date.now()+1296000000),
                httpOnly:true
            })
            if(!isMatch){
                res.status(400).json({error:"Invalid Details"});
            } else{
                res.json({message:"User Login Successful"});
            } 
        } 
    } catch(err){
        console.log(err);
    }
});

/* {
    "fname":"Rahul",
    "lname":"Sen",
    "email":"rahulsen@gmail.com",
    "password":"rahul",
    "confirmpassword":"rahul"
} */

module.exports=router;