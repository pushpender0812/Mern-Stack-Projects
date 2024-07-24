const express = require("express")
const {pendingOrders,approveOrder,rejectOrder,approvedOrders,rejectedOrders} = require("../../../controllers/adminController/orders/orders-controller")

const router = express.Router()

router.route("/pending-orders").get(pendingOrders)

router.route("/approve/:id").post(approveOrder)

router.route("/reject/:id").post(rejectOrder)

router.route("/approved-orders").get(approvedOrders)


router.route("/rejected-orders").get(rejectedOrders)


module.exports = router