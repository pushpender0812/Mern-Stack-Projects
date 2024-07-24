const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/Whats-app").then(() => {
    console.log("mongo db connected successfully");
}).catch((err) => {
    console.log(err);
})