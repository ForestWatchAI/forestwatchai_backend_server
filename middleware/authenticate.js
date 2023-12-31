const jwt = require("jsonwebtoken");
const User=require("../model/userSchema");

const Authenticate=async (req,res,next) => {
    try{
        console.log(req.cookies);
        const token=req.cookies.jwttoken;
        console.log(token);
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);

        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
        console.log(rootUser);
        if(!rootUser){throw new Error('User not found');}

        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;

        next();
    } catch(err){
        res.status(401).send("Unauthorised:Token not found");
        console.log(err);
    }
}

module.exports = Authenticate;