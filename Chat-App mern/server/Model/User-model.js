const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    type:{
        type:String,
        enum:["Admin","User"],
       
        default:"User"
    },
    isloggedIn:{
       type:Boolean,
       default:false
    },
  
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            phone:this.phone,
            type:this.type
        },process.env.SECRET_KEY,{
            expiresIn:"30d"
        })
    } catch (error) {
        console.error(error);
    }
}

const User = new mongoose.model("User",userSchema)

module.exports = User