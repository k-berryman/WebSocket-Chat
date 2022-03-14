// Frontend JS - Client

// Get elements from DOM
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Get username and room from query string
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

// We have access to io from previous HTML script tag
const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room })
console.log(`room is ${room}`);

// When we get the "message" event from our server
socket.on("message", data => {
  // console.log(data);
  outputMessage(data);

  // Scroll to latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

// Create an event listen for form submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  // on form submission, emit / send msg to server
  socket.emit("chatMessage", msg)

  // Clear input field after submission
  e.target.elements.msg.value='';

  // Put typing cursor into input field
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p><p class="text">${message.text}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}
