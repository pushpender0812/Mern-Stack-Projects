const express = require("express")
const {registerUser,loginUser,meCurrentUser,newChat,userToChat,deletemyMessage,logOutUser,chatwithUser,findchatwiththisuser,findotherusermessages,changeSeen} = require("../controllers/api-controllers")
const authMiddleware = require("../middleware/auth-middleware")


const router = express.Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)


router.route("/user-me").get(authMiddleware,meCurrentUser)

router.route("/chat-users").get(authMiddleware,newChat)

router.route("/user-chat").get(authMiddleware,userToChat)

router.route("/chatwithuser").post(authMiddleware,chatwithUser)

router.route("/findChat").get(authMiddleware,findchatwiththisuser)


router.route("/from-message").get(authMiddleware,findotherusermessages)

router.route("/delete-message").get(authMiddleware,deletemyMessage)

router.route("/set-seen").get(authMiddleware,changeSeen)


router.route("/logout-user").get(authMiddleware,logOutUser)



module.exports = router