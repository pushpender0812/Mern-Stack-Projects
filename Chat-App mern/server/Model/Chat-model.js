const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    to_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    message:{
        type:String
    },
    seen:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
    versionKey:false
})


const Chat = new mongoose.model("Chat",chatSchema)

module.exports = Chat