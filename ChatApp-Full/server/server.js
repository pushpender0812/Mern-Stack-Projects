require('dotenv').config()
const express = require("express")

const app = express()
const port =  8000

app.get("/",(req,res) => {
    res.send("Server Running")
})


app.listen(port,() => {
    console.log(`server start on PORT ${port}`);
})