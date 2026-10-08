const {Schema,model}=require('mongoose');
const { createHmac, randomBytes } = require("crypto");

const userschema=new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
       type:String,
    
    },
    password:{
        type:String,
        required:true,
    },
    profileimg:{
        type:String,
        default:"/images/default.png",
    },
    role:{
        type:String,
        enum: ["USER" , "ADMIN"],
        default:"USER",
    },
},{timestamps:true});

userschema.pre("save", function(next){
    const user=this;
    if(!user.isModified("password"))return;

    const salt=randomBytes(16).toString();
    const hashedpassword=createHmac("sha256",salt).update(user.password).digest("hex");
    this.password=hashedpassword;
    this.salt=salt;
    // next();
});

userschema.static("matchpassword", async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const userprovidedhash = createHmac("sha256", user.salt)
        .update(password)
        .digest("hex");

    if (user.password !== userprovidedhash) {
        throw new Error("Incorrect password");
    }

    return user;
});

const user=model('user',userschema);
module.exports=user;