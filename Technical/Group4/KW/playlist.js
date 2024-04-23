var playlist = [
    { title: "Will I Ever See You Again?", file: "Music/Song1.mp3" },
    { title: "august", file: "Music/Song2.mp3" },
    { title: "Holssi", file: "Music/Song3.mp3" },
    { title: "Weekend", file: "Music/Song4.mp3" }
];

var currentSong = 0;

var sound = new Howl({
    src: [playlist[currentSong].file],
    html5: true,
    onend: function() {
        playNext();
    }
});

function playAudio() {
    if (!sound.playing()) {
        sound.play();
    }
}

function pauseAudio() {
    sound.pause();
}

function playNext() {
    currentSong = (currentSong + 1) % playlist.length;
    sound.stop();
    sound = new Howl({
        src: [playlist[currentSong].file],
        html5: true,
        onend: function() {
            playNext();
        }
    });
    playAudio();
}

function playPrevious() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    sound.stop();
    sound = new Howl({
        src: [playlist[currentSong].file],
        html5: true,
        onend: function() {
            playNext();
        }
    });
    playAudio();
}

function togglePlayPause() {
    if (sound.playing()) {
        pauseAudio();
    } else {
        playAudio();
    }
}

