const express=require('express');
const mongoose=require('mongoose');
const userroute=require('./routes/user');
const path=require('path');

mongoose
.connect('mongodb://localhost:27017/Blog-app')
.then(console.log("mongodb connected"));

const app=express();
// middlewares
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use('/user',userroute);

// routes
app.get('/',(req,res)=>{
    res.render('home');
})


app.listen(8000,()=>{
    console.log("server started at 8000")
});