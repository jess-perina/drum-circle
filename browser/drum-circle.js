window.drumCircle = new window.EventEmitter();

(function () {

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

        // audio.src = randomSound(sounds, e.keyCode);
        key.classList.add('playing');
        audio.currentTime = 0;
        audio.play();
        drumCircle.emit('drum', key.dataset.key);
    }

    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    window.addEventListener('keydown', playSound);

    const audioTags = Array.from(document.querySelectorAll('audio'));
    audioTags.forEach(tag => {tag.src = randomSound(sounds, tag.dataset.key);});

    // resize()
    // window.addEventListener('resize', resize)


function randomSound(soundObj, keyCode) {
    let sound = sounds[keyCode][Math.floor(Math.random() * sounds[keyCode].length)];
    return `sounds/${sound}.wav`;
}


})();
