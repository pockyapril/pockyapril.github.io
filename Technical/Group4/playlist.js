// Whole playlist
var playlist = [
    { title: "Will I Ever See You Again?", file: "../Music/Song1.mp3" },
    { title: "august", file: "/Music/Song2.mp3" },
    { title: "Holssi", file: "/Music/Song3.mp3" },
    { title: "Weekend", file: "/Music/Song4.mp3" },
    { title: "Womxnly", file: "/Music/Song5.mp3" },
];

var currentSong = 0;
var sound = new Howl({
    src: [playlist[currentSong].file],
    html5: true,
    onend: function() {
        playNext();
    }
});

// Diaplay the Now Playing song
function updatePlayingTitle() {
    document.getElementById('nowPlaying').innerText = playlist[currentSong].title;
}

// Play audio
function playAudio() {
    if (!sound.playing()) {
        sound.play();
        updatePlayingTitle();
    }
}

// Pause audio
function pauseAudio() {
    sound.pause();
}

// Play next song
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

// Play previous song
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

// Select song from playlist and play
function selectSong(index) {
    currentSong = index;
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

// Use the same button for play and pause
function togglePlayPause() {
    if (sound.playing()) {
        pauseAudio();
    } else {
        playAudio();
    }
}


