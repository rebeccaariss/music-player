// Will need to trigger play() and pause() functions on our audio element (hidden
// from UI, but functionality is still accessible and necessary). 🎵

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
// querySelector here because we only have one audio element:
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'song-1',
    displayName: 'Music Is',
    artist: 'Pryces'
  },
  {
    name: 'song-2',
    displayName: 'Moonshine',
    artist: 'Prigida'
  },
  {
    name: 'song-3',
    displayName: 'Vlog King',
    artist: 'Pecan Pie'
  },
];

// Check if audio is playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
};

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
};

// Play or Pause Event Listener
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};