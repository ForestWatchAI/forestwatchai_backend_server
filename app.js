const dotenv=require("dotenv");
const express=require("express");
const app=express();

dotenv.config({path:'./.env'});
require('./db/conn');

app.use(express.json());

//Setting up middleware for requiring different routes
app.use(require('./router/auth'));

const PORT=process.env.PORT;



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})