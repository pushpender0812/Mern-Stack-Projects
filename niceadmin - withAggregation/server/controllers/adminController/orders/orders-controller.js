const Payment = require("../../../model/payment-model");
const Product = require("../../../model/product-model")
const User = require("../../../model/User")




const pendingOrders = async(req,res) => {
    try {
        // const viewOrders = await Payment.find({order_status:'Pending'}).populate("product_id").populate("user_id").populate("coupon_id");
        const viewOrders = await Payment.aggregate([{$match:{order_status:'Pending'}},{
                 $lookup:{
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: "userResult"
                 }
        },
        {
            $unwind:{
                path: "$userResult",
                preserveNullAndEmptyArrays: true
            }
        },{
            $lookup:{
                from: 'products',
                localField: 'product_id',
                foreignField: '_id',
                as: "productResult"
             }
        },
       
        {
            $lookup:{
                from: 'coupons',
                localField: 'coupon_id',
                foreignField: '_id',
                as: "couponResult"
             }
        },
        {
            $unwind:{
                path: "$couponResult",
                preserveNullAndEmptyArrays: true
            }
        }

    ])
       console.log(viewOrders,"push pejd");
        res.render("Layout", { body: "Orders/Pending",orders:viewOrders });
    } catch (error) {
        console.log(`Error while Viewing Pending Orders ${error}`);
    }
}

const approveOrder = async(req,res) => {
        try {
            const _id = req.params.id

           await Payment.findOneAndUpdate({_id:_id},{order_status:'Approved'})

            res.redirect("/admin/user/orders/pending-orders")
        } catch (error) {
            console.log(`Error while approving Order ${error}`);
        }
}


const rejectOrder = async(req,res) => {
    try {
        const _id = req.params.id

       await Payment.findOneAndUpdate({_id:_id},{order_status:'Rejected'})

        res.redirect("/admin/user/orders/pending-orders")
    } catch (error) {
        console.log(`Error while Rejecting Order ${error}`);
    }
}


const approvedOrders = async(req,res) => {
    try {
        // const viewOrders = await Payment.find({order_status:'Approved'}).populate("product_id").populate("user_id").populate("coupon_id");

        const viewOrders = await Payment.aggregate([{$match:{order_status:'Approved'}},{
            $lookup:{
               from: 'users',
               localField: 'user_id',
               foreignField: '_id',
               as: "userResult"
            }
   },
   {
       $unwind:{
           path: "$userResult",
           preserveNullAndEmptyArrays: true
       }
   },{
       $lookup:{
           from: 'products',
           localField: 'product_id',
           foreignField: '_id',
           as: "productResult"
        }
   },
  
   {
       $lookup:{
           from: 'coupons',
           localField: 'coupon_id',
           foreignField: '_id',
           as: "couponResult"
        }
   },
   {
       $unwind:{
           path: "$couponResult",
           preserveNullAndEmptyArrays: true
       }
   }

])
        // console.log(viewOrders);
        res.render("Layout", { body: "Orders/Approved",orders:viewOrders });
    } catch (error) {
        console.log(`Error while Viewing Pending Orders ${error}`);
    }
}

const rejectedOrders = async(req,res) => {
    try {
        // const viewOrders = await Payment.find({order_status:'Rejected'}).populate("product_id").populate("user_id").populate("coupon_id");
       
        const viewOrders = await Payment.aggregate([{$match:{order_status:'Rejected'}},{
            $lookup:{
               from: 'users',
               localField: 'user_id',
               foreignField: '_id',
               as: "userResult"
            }
   },
   {
       $unwind:{
           path: "$userResult",
           preserveNullAndEmptyArrays: true
       }
   },{
       $lookup:{
           from: 'products',
           localField: 'product_id',
           foreignField: '_id',
           as: "productResult"
        }
   },
  
   {
       $lookup:{
           from: 'coupons',
           localField: 'coupon_id',
           foreignField: '_id',
           as: "couponResult"
        }
   },
   {
       $unwind:{
           path: "$couponResult",
           preserveNullAndEmptyArrays: true
       }
   }

])
       
       
        // console.log(viewOrders);
        res.render("Layout", { body: "Orders/Rejected",orders:viewOrders });
    } catch (error) {
        console.log(`Error while Viewing Pending Orders ${error}`);
    }
}

module.exports = {pendingOrders,approveOrder,rejectOrder,approvedOrders,rejectedOrders}