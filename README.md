# Realtime Chats

Node, Express, Sock.io
Bi-directional communication between client / server

**Tutorial by Traversy Media**
https://www.youtube.com/watch?v=jD7FnbI76Hg&ab_channel=TraversyMedia

### Set up
Traversy Media provided the HTML. He then provides a tutorial on the JS part.

In `chatapp/`, `npm init`, which initializes a `package.json` file

Enter description, entry point as `server.js`

`npm install express socket.io moment`
Express is our web framework
Socket.io is a framework for working with WebSockets
Moment formats dates/times

`npm install -D nodemon`

In `package.json` in `scripts`replace the test script with
`"start": "node server"` and `"dev": "nodemon server"`

Create `server.js` for our backend / entry point
```
// Our backend / entry point

// Create an Express Server
const express = require('express');
const app = express();

// Run a server on 3000 or env input
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT} :D`));
```

`npm run dev`

Public folder will be our static folder for our frontend html
`app.use(expres.static(path.joing(__dirname, 'public')));`

### Set Up Socket.io
`const socketio = require('socket.io');`

```
const server = http.createServer(app);
const io = socketio(server);
```


```
// Run when a client connects
io.on('connection', socket => console.log("new WS connection"))
```

Go to `chat.html`, `<script src="/socket.io/socket.io.js"></script>` above `<script src="js/main.js"></script>`

----
In `server.js`
```
// Run when a client connects
io.on('connection', socket => {
  console.log("new WS connection")
  let data = "welcome to the chat!!!"

  // Send data from server to client
  socket.emit("message", data)
});
```
This above console.log() is to the terminal

----

Go to frontend JS, which is `public/js/main.js`
```
// Frontend JS

// We have access to io from previous HTML script tag
const socket = io();

// When we get the "message" event
socket.on("message", data => {
  console.log(data)
})

```
The above console.log() is in browser

-----

There's a difference between `socket.emit` and `socket.broadcast.emit` and `io.emit`

`socket.broadcast.emit` emits to everyone except the user that's connecting

`socket.emit` emits to the single user that's connecting

`io.emit` sends a message to everybody

### Implement Messaging
Client -> Server
then send it back to put it in the DOM

Client -> Server
```
// Create an event listen for form submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  // on form submission, emit / send msg to server
  socket.emit("chatMessage", msg)

});
```

On Server, in "connection"
```
  // Listen for chatMessage from Client
  socket.on("chatMessage", (msg) => {
    console.log(msg);
  });

```
Now our message entered in the client is processed by the server and printed in the terminal

Now we want to emit it back to the client (we want it to go to everybody, so we use io)
```
  // Listen for chatMessage from Client
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg)
  });
```

So we've sent our message from our client, to the server, and back to the client, and now message is printed in the browser, but we need to add it to the DOM

Go to `main.js` and create a function to output message to the DOM, and then call that in `socket.on("message", data{...})
```
// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = ```<p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">${message}</p>```;
  document.querySelector('.chat-messages').appendChild(div);
}
```

and

```
// When we get the "message" event from our server
socket.on("message", data => {
  // console.log(data);
  outputMessage(data);
})
```

It works!!!
