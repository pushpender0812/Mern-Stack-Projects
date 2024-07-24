const express = require("express")
const authMiddleware = require("../middleware/auth-middleware")
const {sendMessage} = require("../controllers/message-controllers")

const router = express.Router()

router.route("/").post(authMiddleware,sendMessage)
// router.route("/:chatId").get(authMiddleware,allMessages)


module.exports = router