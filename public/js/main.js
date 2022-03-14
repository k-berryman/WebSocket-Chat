// Frontend JS - Client

// We have access to io from previous HTML script tag
const socket = io();

// When we get the "message" event from our server
socket.on("message", data => {
  console.log(data)
})
