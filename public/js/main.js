// Frontend JS - Client

// Get form from UI
const chatForm = document.getElementById('chat-form');

// We have access to io from previous HTML script tag
const socket = io();

// When we get the "message" event from our server
socket.on("message", data => {
  // console.log(data);
  outputMessage(data);
})

// Create an event listen for form submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  // on form submission, emit / send msg to server
  socket.emit("chatMessage", msg)

});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p><p class="text">${message}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}
