const socketio = require('socket.io');
const express = require('express');
const path = require('path');
const app = express();

const server = app.listen(3000, function () {
  console.log('We are live on 3000!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const io = socketio(server);

io.on('connect', function (socket) {
  console.log('A new client connected!');
  console.log(socket.id);

  socket.on('drum', (key) => {
    socket.broadcast.emit('otherDrum', key);
  });

  socket.on('disconnect', function() {
    console.log('A client disconnected.');
    console.log(socket.id);
  });

});

