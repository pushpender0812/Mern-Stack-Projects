const express = require("express");
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let users = 0;

var roomno = 1;
var full = 0;

io.on('connection', (socket) => {
    console.log('A user connected');
    users++;



    socket.join("room-"+roomno);

    io.sockets.in("room-"+roomno).emit('connectedRoom',"Room no you are connected to is"+ roomno)

    full++;
    if (full >= 2) {
        full = 0;
        roomno++;
    }


    socket.emit('newuserconnect', { message: 'Hi, welcome!' });
    io.emit('testEvent', 'Tester event call');
    socket.broadcast.emit('newuserconnect', { message: users + ' users connected!' });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        users--;
        socket.broadcast.emit('newuserconnect', { message: users + ' users connected!' });
    });
});

app.use(express.static(path.resolve("/public")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
});

server.listen(3000, () => {
    console.log("Server started at port 3000");
});
