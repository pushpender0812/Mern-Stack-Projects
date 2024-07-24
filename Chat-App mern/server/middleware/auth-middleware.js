const jwt = require("jsonwebtoken")
const User = require("../Model/User-model")


const authMiddleware = async(req,res,next) => {
    const token = req.header("Authorization")

    const jwtToken = token.replace("Bearer","").trim();
    if (!jwtToken) {
     return res.status(401).json({message:"Token not found"})   
    }
    try {
    const isVerified = jwt.verify(jwtToken,process.env.SECRET_KEY)
    const userData = await User.findOne({phone:isVerified.phone},{password:0})  

    req.user = userData;
    req.token = token;
    req.userID = userData._id
    next()

    } catch (error) {
        return res.status(401).json({ message: "token not found",error });
    }
}

module.exports = authMiddleware