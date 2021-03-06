window.drumCircle = new window.EventEmitter();

(function () {

    const backgrounds = ['BG', 'BG2', 'BG3', 'BG4', 'BG5', 'BG6', 'BG7'];
    let selectBG = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.background = `url(/images/drum${selectBG}.jpg) center center`;
    document.body.style.backgroundSize = `cover`;


    function removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
    }

    function playSound(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
        if (!audio) return;

        key.classList.add('playing');
        audio.currentTime = 0;
        audio.play();
        drumCircle.emit('drum', key.dataset.key);
    }

    function newDrums() {
        console.log('change it up');
        drumCircle.emit('newDrums');
    }

    const button = document.querySelector('#new');
    button.addEventListener('click', newDrums);

    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    window.addEventListener('keydown', playSound);

    // resize()
    // window.addEventListener('resize', resize)

})();
