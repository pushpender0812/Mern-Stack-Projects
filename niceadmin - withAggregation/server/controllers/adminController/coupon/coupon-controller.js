const { default: mongoose } = require("mongoose");
const Coupon = require("../../../model/coupon-model")

const couponforAdd = async(req,res) => {
    try {
        res.render("Layout", { body: "Coupons/AddCoupons" });
    } catch (error) {
        console.log(error);
    }
}

const addCoupon = async(req,res) => {
    try {
        const {coupon_name,coupon_value,expire_date,coupon_type,maximum_discount,min_cart} = req.body
        // console.log(coupon_name,coupon_value,expire_date,coupon_type,maximum_discount);
        
      
        const couponAdd = new Coupon({
            coupon_name,
            coupon_value,
            expire_date,
            coupon_type,
            maximum_discount,
            min_cart

        }) 
        await couponAdd.save()
        res.redirect("/admin/user/coupon/add-coupon");

    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

const viewAllCoupons = async(req,res) => {
    try {
        const viewCoupon = await Coupon.find()
        res.render("Layout", { body: "Coupons/ViewCoupons",coupons:viewCoupon });
    } catch (error) {
        console.log(`Error while Viewing all coupons ${error}`);
    }
}

const deleteCoupon = async(req,res) => {
    try {
        const _id = req.params.id
        // console.log(_id ,"cfudgolhig");
        await Coupon.findByIdAndDelete({_id:_id})
        res.redirect("/admin/user/coupon/view-coupon");
    } catch (error) {
        console.log(`Error while deleting the coupons ${error}`);
    }
}

const editCoupon = async(req,res) => {
  try {
    
    // const viewCoupon = await Coupon.findOne({_id:req.params.id})
    const viewCoupon = await Coupon.aggregate([{$match:{_id:new mongoose.Types.ObjectId(req.params.id)}}])

        res.render("Layout", { body: "Coupons/EditCoupon",coupon:viewCoupon[0] });
  } catch (error) {
    console.log(`Error while Edit the coupons ${error}`);
  }
}

const updateCoupon = async(req,res) => {
    try {
        const { coupon_name, coupon_value, expire_date, coupon_type, maximum_discount,min_cart } = req.body;
        let coupon = await Coupon.findById(req.params.id);
    
        if (!coupon) {
          return res.status(404).send('Coupon not found');
        }
    
        coupon.coupon_name = coupon_name;
        coupon.coupon_value = coupon_value;
        coupon.expire_date = expire_date;
        coupon.coupon_type = coupon_type;
        coupon.maximum_discount = maximum_discount;
        coupon.min_cart = min_cart;
        await coupon.save();
    
        res.redirect('/admin/user/coupon/view-coupon'); // Redirect to the coupons list page
      } catch (error) {
        res.status(500).send('Server Error');
      }
}

module.exports = {addCoupon,couponforAdd,viewAllCoupons,deleteCoupon,editCoupon,updateCoupon}