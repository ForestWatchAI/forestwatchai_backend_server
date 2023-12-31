const dotenv=require("dotenv");
const express=require("express");
const app=express();
const cookieParser = require('cookie-parser');
app.use(cookieParser()); 
const cors=require("cors");


dotenv.config({path:'./.env'});
require('./db/conn');

app.use(cookieParser()); 
app.use(express.json());
app.use(cors({
    origin:"https://forest-watch-ai-one.vercel.app",
    credentials: true,
}));

//Setting up middleware for requiring different routes
app.use(require('./router/auth'));

const PORT=process.env.PORT || 8000;



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
