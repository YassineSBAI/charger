const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Tell the server to serve your HTML file
app.use(express.static('public'));

// This keeps track of the color so if a friend joins LATE, 
// they still see the green background if someone already clicked it.
let isGreen = false; 

io.on('connection', (socket) => {
  console.log('A user connected');

  // If the page is already green, tell the new user
  if (isGreen) {
    socket.emit('colorChange', 'green');
  }

  // Listen for the "3afak" button click
  socket.on('buttonClicked', () => {
    isGreen = true;
    // 'io.emit' sends the message to EVERYONE who is connected
    io.emit('colorChange', 'green'); 
  });
});

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});
