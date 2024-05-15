document.addEventListener('DOMContentLoaded', function() {
    var button1 = document.getElementById('button1');
    var button2 = document.getElementById('button2');
    var track = document.getElementById('track');
    var duration = document.getElementById('duration');
    var timer = document.getElementById('timer');
    var playBtn = document.getElementById('playBtn');
    var pauseBtn = document.getElementById('pauseBtn');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var list = document.getElementById('list');

    var sound2 = new Howl({
        src:["Music/Song1.mp3"],
        volume: 0.5,
        loop: true,
        autoplay: false,
        onend: function() {
            console.log("Finished!");
        }
    });

    button1.addEventListener("click", function() {
        sound2.play();
    });

    button2.addEventListener("click", function() {
        if (sound2.playing()) {
            sound2.pause();
        } else {
            sound2.play();
        }
    });

    var player = new Player([
        { title: "Will I Ever See You Again? - Red Velvet", file: "Song1", howl: null },
        { title: "august - Taylor Swift", file: "Song2", howl: null },
        { title: "Holssi - IU", file: "Song3", howl: null },
        { title: "Weekend - Taeyeon", file: "Song4", howl: null }
    ]);

    function Player(playlist) {
        this.playlist = playlist;
        this.index = 0;

        track.innerHTML = "1." + playlist[0].title;

        playlist.forEach(function(song, index) {
            var div = document.createElement("div");
            div.className = "list-song";
            div.innerHTML = song.title;
            div.onclick = function() {
                player.skipTo(index);
            };
            list.appendChild(div);
        });
    }

    Player.prototype = {
        play: function(index) {
            var self = this;
            var data = self.playlist[index];
            var sound = data.howl || new Howl({
                src: [data.file],
                html5: true,
                onplay: function() {
                    duration.innerHTML = self.formatTime(Math.round(sound.duration()));
                    requestAnimationFrame(self.step.bind(self));
                }
            });

            data.howl = sound;
            sound.play();
            track.innerHTML = (index + 1) + ". " + data.title;
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            self.index = index;
        },

        pause: function() {
            var self = this;
            var sound = self.playlist[self.index].howl;
            sound.pause();
            playBtn.style.display = "block";
            pauseBtn.style.display = "none";
        },

        skip: function(direction) {
            var self = this;
            var index = self.index;
            if (direction === "prev") {
                index = index > 0 ? index - 1 : self.playlist.length - 1;
            } else {
                index = index < self.playlist.length - 1 ? index + 1 : 0;
            }
            self.skipTo(index);
        },

        skipTo: function(index) {
            var self = this;
            var currentTrack = self.playlist[self.index];
            if (currentTrack.howl) {
                currentTrack.howl.stop();
            }
            self.play(index);
        },

        step: function() {
            var self = this;
            var sound = self.playlist[self.index].howl;
            var seek = sound.seek() || 0;
            timer.innerHTML = self.formatTime(Math.round(seek));
            if (sound.playing()) {
                requestAnimationFrame(self.step.bind(self));
            }
        },

        formatTime: function(secs) {
            var minutes = Math.floor(secs / 60) || 0;
            var seconds = (secs - minutes * 60) || 0;
            return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }
    };

    playBtn.addEventListener("click", function() {
        player.play(player.index);
    });

    pauseBtn.addEventListener("click", function() {
        player.pause();
    });

    prevBtn.addEventListener("click", function() {
        player.skip('prev');
    });

    nextBtn.addEventListener("click", function() {
        player.skip('next');
    });
});
