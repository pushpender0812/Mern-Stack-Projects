const Message = require("../Model/Message-model");

const sendMessage = async(req,res) => {
   const {content,chatId} = req.body

   if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
   }

   var newMessage = {
    sender:req.user._id,
    content:content,
    chat:chatId
   }
   try {
    var message = await Message.create(newMessage)

    message = await message


   } catch (error) {
    
   }
}

module.exports = {sendMessage}