const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());


var userRouter = require('./routers/userRouter');
var loginRouter = require('./routers/loginRouter');
var blogRouter = require('./routers/blogRouter')


//Routing
app.use('/',userRouter);
app.use('/',loginRouter);
app.use('/',blogRouter);

app.use('*',(req,res)=>{
    res.status(404);
    res.send("Sorry! Wrong url");
})




//mongoDB connection
var URI = 'mongodb://localhost:27017/blog';
var OPTION = {
    user:'',
    pass:'',
    autoIndex:true
}

mongoose.connect(URI,OPTION,{useNewUrlParser:true,useUnifiedTopology:true}).then
(
    (res)=>
    {
        console.log("connection established")
    }
).catch
(
    (err)=>{
        console.log("connection failed");
    }
)


app.listen(3000);