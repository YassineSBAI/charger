const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let isGreen = false; 

io.on('connection', (socket) => {
  console.log('A user connected');

  if (isGreen) {
    socket.emit('colorChange', 'green');
  }

  // Turns it green for everyone
  socket.on('buttonClicked', () => {
    isGreen = true;
    io.emit('colorChange', 'green'); 
  });

  // NEW: Turns it black for everyone and resets the server memory
  socket.on('resetClicked', () => {
    isGreen = false;
    io.emit('colorChange', 'black');
  });
});

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});
