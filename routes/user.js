const express=require("express");
const router=express.Router();
const user=require('../models/user');
router.get("/signin",(req,res)=>{
    return res.render("signin");
});

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.post('/signup',async (req,res)=>{
    const {fullname,password,email}=req.body;
    await user.create({
        fullname,
        email,
        password,

    });
    return res.redirect('/');
});

router.post("/signin",async (req,res)=>{
   const {password,email}=req.body;
   const user1=await user.matchpassword(email,password);
   

   console.log("user",user1);
   return res.redirect("/");
})
module.exports=router;
