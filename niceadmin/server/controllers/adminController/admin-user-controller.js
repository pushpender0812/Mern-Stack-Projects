const User = require("../../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Payment = require("../../model/payment-model");

const Login = async (req,res) => {  
    // res.render("Login")
    try {
        const email = req.body.email;   
        const password = req.body.password;
        console.log(`entered email is ${email} and password is ${password}`);

        const useremail = await User.findOne({email:email})

        if (!useremail) {
            return res.status(400).send("invalid login email")
        }

        const isMatch = await bcrypt.compare(password,useremail.password)

        // console.log(process.env.SECRET_KEY);

        // console.log(`the entered password is ${password} and saved password is ${useremail.password}`);

        const token = await  jwt.sign({_id:useremail._id.toString()},process.env.SECRET_KEY)


        res.cookie("jwt",token,{
            httpOnly:true,
        })

        // console.log(req.cookie.jwt);

        // console.log("data after login",useremail);

        if (isMatch) {
            res.status(200).redirect("/admin/user/dashboard")
        } else {
            res.json("Invalid Password details")
        }

    } catch (error) {
        console.log(error);
    }
}


const updatePassword = async(req,res) => {
    try {
        const {email,password,newPassword} = req.body
        // console.log(email," ",password," " ,newPassword);
        const useremail = await User.findOne({email:email})

        const isMatch = await bcrypt.compare(password,useremail.password)

        const passwordHash = await bcrypt.hash(newPassword,10);
        
        if (isMatch === true) {
            const userToUpdate =  await User.findOneAndUpdate({email:email},{password:passwordHash})
            console.log("password Updated Successfully");
            res.status(200).redirect("/admin/user/dashboard")
        }  else {
            console.log("Password Not Matched");
        }

      
    //   console.log(userToUpdate);
        
    } catch (error) {
        console.log("Error while updating Password",error);
    }
}

const logout = async(req,res) => {
    try {
        res.clearCookie("jwt")
        console.log("Logout Success");
        res.redirect("/admin/login")
    } catch (error) {
        console.log("Error While Logging Out",error);
    }
}

const viewAllUsers = async(req,res) => {
    try {
        const allUsers = await User.find({type:'User'})
        const sales = await Payment.find({order_status:"Approved"})
        // console.log(allUsers);
        res.render("Layout", { body: "AllUsers",data:{allUsers,sales} });
    } catch (error) {
        console.log("Error While Viewing All Users",error);
    }
}

const deleteUser = async(req,res) => {
   try {
    // console.log("jh");
    const _id = req.params.id
    const userDelete = await User.findByIdAndDelete({_id:_id})
    res.redirect("/admin/user/view-allusers")

   } catch (error) {    
    console.log("Error While Deleting this User");
   }
}


const blockUser = async(req,res) => {
   try {
    const _id = req.params.id
    console.log(_id,'dfhugui');
    const blockuser = await User.findByIdAndUpdate({_id:_id},{isblocked:true})
    res.redirect("/admin/user/view-allusers")
   } catch (error) {
    console.log("Error While Blocking the User");
   }
}

const unblockUser = async(req,res) => {
    try {
     const _id = req.params.id
     const blockuser = await User.findByIdAndUpdate({_id:_id},{isblocked:false})
     res.redirect("/admin/user/view-allusers")
    } catch (error) {
     console.log("Error While Unblocking the User");
    }
 }

 const viewUserSale = async(req,res) => {
  try {
    const sales = await Payment.find({user_id:req.params.id}).populate("product_id").populate("user_id").populate("coupon_id");
   console.log(sales);
    res.render("Layout", { body: "UserSale",data:sales} );
  } catch (error) {
    console.log(error,"While Viewing sales");
  }
 }

module.exports = {Login,updatePassword,logout,viewAllUsers,deleteUser,blockUser,unblockUser,viewUserSale}