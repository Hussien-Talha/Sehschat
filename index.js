// Require the express and socket.io modules
const express = require('express');
const socketio = require('socket.io');

// Create an express app and a server
const app = express();
const server = app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Serve the static files in the public folder
app.use(express.static('public'));

// Create a socket.io instance and attach it to the server
const io = socketio(server);

// Listen for connection events from the clients
io.on('connection', (socket) => {
  console.log('A user connected with id: ' + socket.id);

  // Listen for chat events from the clients
  socket.on('chat', (data) => {
    // Broadcast the chat message to all connected clients
    io.sockets.emit('chat', data);
  });

  // Listen for typing events from the clients
  socket.on('typing', (data) => {
    // Broadcast the typing status to all connected clients except the sender
    socket.broadcast.emit('typing', data);
  });
});
