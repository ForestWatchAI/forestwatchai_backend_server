const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const db=require('../db/conn');
const authenticate=require("../middleware/authenticate");
const User=require('../model/userSchema');


//Registration/Signup Route
router.post('/register',async (req,res) => {

    const {fname,lname,email,password,confirmPassword}=req.body;
    // console.log(req.body);
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
                httpOnly:true,
                sameSite: 'strict'
            });
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

//Service route
router.get("/service",authenticate,(req,res)=>{
    res.send(req.rootUser);
});

//Contact Page
router.post("/contact",async(req,res)=>{
    try{
        const {name,phone,email,subject,message}=req.body;
        if(!name || !phone || !email || !subject || !message){
            console.log("All fields are not filled");
            return res.status(422).json({error:"Please fill all the fields properly"});
        }
        const userContact=await User.findOne({email:email});
        if(userContact){
            const userMessage=await userContact.addMessage(name,phone,email,subject,message);
            await userContact.save();
            res.status(201).json({message:"Message send successfully"});
        }
    }catch(err){
        console.log(err);
    }
})

//Fire data Table
router.get("/fireData",async(req,res)=>{
        try {
            // Get the list of all collection names
            // const collections = await mongoose.connection.db.listCollections().toArray();
            // console.log(collections[3]);
            // Extract the names from the collections list
            //   const collectionNames = collections.map(collection => collection.name);
            //   console.log('Collections:', collectionNames);

            // Get a reference to the desired collection
            const collectionName="forest_fire_data";
            const collection = db.collection(collectionName);

            // Retrieve the documents from the collection
            const collectionContents = await collection.find({}).toArray();

            // console.log('Collection Contents:', collectionContents);
            if(collectionContents){
                res.status(200).json(collectionContents.reverse());
            } else{
                res.status(500).json({Error:"Can't send data"});
            }

      
        }  catch (error) {
            console.error('Error:', error);
        }
 
    })

//Flood Data Table
router.get("/floodData",async(req,res)=>{
    try {
        // Get a reference to the desired collection
        const collectionName="forest_flood_data";
        const collection = db.collection(collectionName);

        // Retrieve the documents from the collection
        const collectionContents = await collection.find({}).toArray();

        // console.log('Collection Contents:', collectionContents);
        if(collectionContents){

            res.status(200).json(collectionContents.reverse());
        } else{
            res.status(500).json({Error:"Can't send data"});
        }

  
    }  catch (error) {
        console.error('Error:', error);
    }
})

//Poacher Data Table
router.get("/poacherData",async(req,res)=>{
    try {
        // Get a reference to the desired collection
        const collectionName="human_images";
        const collection = db.collection(collectionName);

        // Retrieve the documents from the collection
        const collectionContents = await collection.find({}).toArray();

        // console.log('Collection Contents:', collectionContents);
        if(collectionContents){
            res.status(200).json(collectionContents.reverse());
        } else{
            res.status(500).json({Error:"Can't send data"});
        }

  
    }  catch (error) {
        console.error('Error:', error);
    }
})

module.exports=router;