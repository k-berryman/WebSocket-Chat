// Our backend / entry point - Server
const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

// Create an Express Server
const app = express();

// Set up Socket.io
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when a client connects
// Send data from server to client
io.on('connection', socket => {
  // Print to terminal
  console.log("new WS connection")

  // Welcome current user. Send message only to single user
  socket.emit("message", "Welcome to the chat!")

  // Broadcast when a user connects. Send message to everyone except single user
  socket.broadcast.emit("message", "A user has joined the chat :)");

  // Run when client disconnects. Send message to everyone
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat :(")
  });

  // Listen for chatMessage from Client
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg)
  });

});

// Run a server on 3000 or env input
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT} :D`));
