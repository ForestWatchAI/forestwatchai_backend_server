const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    tokens:[
            {
                token:{
                    type:String,
                    required:true
                }
            }
        ]
});

//Hashing the password

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.confirmPassword= await bcrypt.hash(this.confirmPassword,12);
    }
    next();
});

// Generating JWT Token
userSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY); //jwt.sign(payload(as object),secret key,[options callback]);
        this.tokens=this.tokens.concat({token:token});
        this.save();
        return token;
    } catch(err){
        console.log(err);
    }
}

const User=mongoose.model('User',userSchema);

module.exports=User;

