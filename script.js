const songs = [
    {
        title: "Song One",
        artist: "Artist One",
        src: "songs/alec_koff-carnaval-484622.mp3"
    },
    {
        title: "Song Two",
        artist: "Artist Two",
        src: "songs/fassounds-escape-your-love-upbeat-fashion-pop-dance-412230.mp3"
    },
    {
        title: "Song Three",
        artist: "Artist Three",
        src: "songs/kontraa-water-afro-pop-music-445661.mp3"
    }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

function loadSong(song){
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
}

loadSong(songs[songIndex]);

// Play Song
function playSong(){
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
}

// Pause Song
function pauseSong(){
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶";
}

// Play/Pause Button
playBtn.addEventListener("click", () => {
    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});

// Next Song
function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Previous Song
function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Progress Bar
audio.addEventListener("timeupdate", () => {

    const {duration, currentTime} = audio;

    progress.value = (currentTime / duration) * 100;

    // Duration
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if(durationSeconds < 10){
        durationSeconds = "0" + durationSeconds;
    }

    if(durationMinutes){
        durationEl.textContent =
            durationMinutes + ":" + durationSeconds;
    }

    // Current Time
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if(currentSeconds < 10){
        currentSeconds = "0" + currentSeconds;
    }

    currentTimeEl.textContent =
        currentMinutes + ":" + currentSeconds;
});

// Set Progress
progress.addEventListener("input", () => {
    audio.currentTime =
        (progress.value * audio.duration) / 100;
});

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Autoplay Next Song
audio.addEventListener("ended", nextSong);

// Playlist
songs.forEach((song, index) => {

    const li = document.createElement("li");

    li.textContent = song.title + " - " + song.artist;

    li.addEventListener("click", () => {
        songIndex = index;
        loadSong(songs[songIndex]);
        playSong();
    });

    playlist.appendChild(li);
});