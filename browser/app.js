const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('persistent two-way connection to the server established!');
  console.log(socket);

  socket.emit('ask-for-settings', function () {});

  socket.on('settings', function (audio) {
    const audioTags = Array.from(document.querySelectorAll('audio'));
    audioTags.forEach((tag, index) => {tag.src = audio[index];});
  });

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

