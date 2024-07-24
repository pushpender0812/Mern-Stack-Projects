const { default: mongoose } = require("mongoose");
const User = require("../Model/User-model");
const bcrypt = require("bcryptjs");
const Chat = require("../Model/Chat-model");
// const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
  //  console.log(req.body);
  try {
    //  console.log(req.body,"dfdf");
    const { name, phone, password } = req.body;
    // console.log(name, phone, password, "sdkhik");

    const useremail = await User.findOne({ phone: phone });

    if (useremail) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const registerUser = new User({
      name,

      phone,

      password: passwordHash,
    });

    const usercreated = await registerUser.save();
    await User.findOneAndUpdate({ phone: phone },{isloggedIn:true})

    res.status(200).json({
      message: "user registered successfully",
      token: await usercreated.generateToken(),
      userId: usercreated._id.toString(),
    });

    // console.log(req.body);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internel server Error While registering User" });
  }
};

const loginUser = async (req, res) => {
  // console.log("dfj");
  try {
    const phone = req.body.phone;
    const password = req.body.password;
    // console.log(`entered email is ${phone} and password is ${password}`);

    const useremail = await User.findOne({ phone: phone });

    if (!useremail) {
      return res
        .status(400)
        .json({ message: "invalid login Phone No,Phone no Does not Exist" });
    }

    const isMatch = await bcrypt.compare(password, useremail.password);
    // console.log(isMatch);

    if (isMatch === true) {
      await User.findOneAndUpdate({ phone: phone },{isloggedIn:true})
      return res.status(200).json({
        message: "User Login Successfully",
        token: await useremail.generateToken(),
        userId: useremail._id.toString(),
      });
    } else {
      res.status(400).json({ message: "Invalid Password details" });
    }
  } catch (error) {
    console.log(error);
  }
};

const meCurrentUser = async (req, res) => {
  // console.log("dugfi");
  // console.log(req.userID);
  try {
    //   const user = await User.aggregate([
    //     { $match: { _id: new mongoose.Types.ObjectId(req.userID) } },
    //     { $project: { password: 0 } },
    //   ]);
    const user = await User.findOne({ _id: req.userID }, { password: 0 });
    // console.log(user, "pjh");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "user data fetched successfully", result: user });
  } catch (error) {
    res.status(500).json({ mesage: "internal server error" });
  }
};

const newChat = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userID } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ mesage: "internal server error", error });
  }
};

const userToChat = async (req, res) => {
  try {
    const _id = req.query.id;

    const tochatdata = await User.findOne({ _id: _id });

    res.status(200).json(tochatdata);
  } catch (error) {
    res.status(500).json({ mesage: "internal server error", error });
  }
};

const chatwithUser = async (req, res) => {
  try {
    const { user_id, to_id, message } = req.body;
    const userchat = new Chat({ user_id, to_id, message });
    await userchat.save();
    res.status(200).json({
      message: "Message Sent successfully",
    });
  } catch (error) {
    res.status(500).json({ mesage: "internal server error", error });
  }
};

const findchatwiththisuser = async (req, res) => {
  try {
    const user_id = req.userID;
    const to_id = req.query.id;
    // console.log(user_id,"usr id");
    // console.log(to_id,"to id");e
    const findingChat = await Chat.find({ user_id: user_id, to_id: to_id });
    // console.log(findingChat,"dfjnjb");
    res.status(200).json(findingChat);
  } catch (error) {
    res.status(500).json({ mesage: "internal server error", error });
  }
};

const findotherusermessages = async (req, res) => {
  try {
    const user_id = req.query.id;
    const to_id = req.userID;

    const findingChat = await Chat.find({ user_id: user_id, to_id: to_id });

    res.status(200).json(findingChat);
  } catch (error) {
    res.status(500).json({ mesage: "internal server error", error });
  }
};

const changeSeen = async (req, res) => {
  // console.log("Seen ");
  try {
    const user_id = req.query.id;
    const to_id = req.userID;
    // console.log(`the user id is ${user_id} and to id is ${to_id}`);
    const result = await Chat.updateMany(
      { user_id: user_id, to_id: to_id, seen: false },  
      { $set: { seen: true } }  
    );
    // console.log(result,"pushpender");
    res.status(200).json({
      message: "Message Seen",
    });
  } catch (error) {
    res.status(500).json({ mesage: "internal server error", error });
  }
};

const deletemyMessage = async(req,res) => {
  const _id = req.query.id
  // console.log(_id,"pjdiug ............................................");
  await Chat.findByIdAndUpdate({_id:_id},{message:" ⦸ This Message Was Deleted"})
  res.status(200).json({
    message: "Message Deleted Successfully",
  });
}


const logOutUser = async(req,res) => {
  try {
    const {_id} = req.userID
    await User.findOneAndUpdate({ _id: _id },{isloggedIn:false})
    console.log("logout sucess");
    res.status(200).json({
      message: "User LogOut Success",
    });
  } catch (error) {
    res.status(500).json({ mesage: "internal server error", error });
  }
}

module.exports = {
  registerUser,
  loginUser,
  meCurrentUser,
  newChat,
  userToChat,
  chatwithUser,
  findchatwiththisuser,
  findotherusermessages,
  changeSeen,
  deletemyMessage,
  logOutUser
};
