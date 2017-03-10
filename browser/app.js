const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('persistent two-way connection to the server established!');
  console.log(socket);

  drumCircle.on('drum', (key) => {
    // console.log('hit it', key);
    socket.emit('drum', key);
  });

  socket.on('otherDrum', function (key) {
    // console.log('hearing other drums', key);
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    audio.play();
  });

});
