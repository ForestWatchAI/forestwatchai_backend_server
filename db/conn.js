const mongoose=require("mongoose");

const DB=process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Successful!!");
}).catch((err)=>{
    console.log(`No connection; error:${err}`);
})

const db =mongoose.connection;

module.exports=db;
 