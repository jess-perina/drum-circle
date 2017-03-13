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



    const sounds = {
        65: ['clap', 'clap-808', 'clap-analog', 'clap-crushed', 'clap-fat', 'clap-slapper', 'clap-tape'],
        83: ['hihat', 'hihat-808', 'hihat-acoustic01', 'hihat-acoustic02', 'hihat-analog', 'hihat-digital', 'hihat-dist01', 'hihat-dist02', 'hihat-electro', 'hihat-plain', 'hihat-reso', 'hihat-ring'],
        68: ['kick', 'kick-808', 'kick-acoustic01', 'kick-acoustic02', 'kick-big', 'kick-classic', 'kick-cultivator', 'kick-deep', 'kick-dry', 'kick-electro01', 'kick-electro02', 'kick-floppy', 'kick-gritty', 'kick-heavy', 'kick-newwave', 'kick-oldschool', 'kick-plain', 'kick-slapback', 'kick-softy', 'kick-stomp', 'kick-tape', 'kick-thump', 'kick-tight', 'kick-tron', 'kick-vinyl01', 'kick-vinyl02', 'kick-zapper'],
        70: ['openhat-808', 'openhat-acoustic01', 'openhat-analog', 'openhat-slick', 'openhat-tight', 'openhat'],
        71: ['boom'],
        72: ['ride-acoustic01', 'ride-acoustic02', 'ride'],
        74: ['snare-808', 'snare-acoustic01', 'snare-acoustic02', 'snare-analog', 'snare-big', 'snare-block', 'snare-brute', 'snare-dist01', 'snare-dist02', 'snare-dist03', 'snare-electro', 'snare-lofi01', 'snare-lofi02', 'snare-modular', 'snare-noise', 'snare-pinch', 'snare-punch', 'snare-smasher', 'snare-sumo', 'snare-tape', 'snare-vinyl01', 'snare-vinyl02', 'snare'],
        75: ['tom-808', 'tom-acoustic01', 'tom-acoustic02', 'tom-analog', 'tom-chiptune', 'tom-fm', 'tom-lofi', 'tom-rototom', 'tom-short', 'tom'],
        76: ['perc-808', 'perc-chirpy', 'perc-hollow', 'perc-laser', 'perc-metal', 'perc-nasty', 'perc-short', 'perc-tambo', 'perc-tribal', 'perc-weirdo', 'tink', 'shaker-analog', 'shaker-shuffle']
    };

    function randomSound(soundObj) {
      let keys = Object.keys(soundObj);
      let sources = [];
      keys.forEach(key => sources.push(`sounds/${soundObj[key][Math.floor(Math.random() * soundObj[key].length)]}.wav`));
      return sources;
    }

let audio = randomSound(sounds);

io.on('connect', function (socket) {
  console.log('A new client connected!');
  console.log(socket.id);


  socket.on('ask-for-settings', function () {
    socket.emit('settings', audio);
  });

  socket.on('drum', (key) => {
    socket.broadcast.emit('otherDrum', key);
  });

  socket.on('disconnect', function() {
    console.log('A client disconnected.');
    console.log(socket.id);
  });

});