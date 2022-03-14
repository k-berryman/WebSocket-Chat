// Our backend / entry point - Server
const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

// Create an Express Server
const app = express();

// Set up Socket.io
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = "KaitlinBot";

// Run when a client connects
// Send data from server to client
io.on('connection', socket => {
  socket.on("joinRoom", ({ username, room }) => {

    // Create User and Join the User to a room
    const user = userJoin(socket.id, username, room);
    socket.join();
    console.log("ROOM ... ", `${room}`, ",,,,")


    // Welcome current user. Send message only to single user
    socket.emit("message", formatMessage(botName, "Welcome to the chat!"));

    // Broadcast when a user connects. Send message to everyone except single user
    socket.broadcast
      //.to('JavaScript') //-- not working
      .emit(
        "message",
        formatMessage(botName, `${username} has joined the ${room} Chat :)`)
      );
  });

  // Print to terminal
  console.log("new WS connection")

  // Listen for chatMessage from Client
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io
      //.to('JavaScript')
    .emit("message", formatMessage(`${user.username}`, msg));
  });


  // Run when client disconnects. Send message to everyone
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if(user) {
      io
        .to(user.room).emit("message", formatMessage(user.username, 'A user has left the chat :('));
    }
  });

});

// Run a server on 3000 or env input
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT} :D`));
