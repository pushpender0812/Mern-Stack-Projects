require('dotenv').config();
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const app = express();
const apiRouter = require("../server/router/api-router");
require("../server/db/conn");
const bodyParser = require("body-parser");
const messageRoutes = require('../server/router/message-routes');

app.use(express.json());
app.use(bodyParser.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello there");
});

app.use("/api", apiRouter);
app.use("/api/message", messageRoutes);

io.on("connection", (socket) => {
  console.log("Connected to socket.io", socket.id);

  socket.on("setup", (user) => {
    console.log("User setup:", user);
    socket.emit('connected');
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room:", room);
  });

  socket.on("message", (userData) => {
    console.log("Message received on server:", userData);
    io.to(userData.room).emit("message recieved", userData);
  });
  

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


server.listen(8000, () => {
  console.log("Server started at port 8000");
});
