// Will need to trigger play() and pause() functions on our audio element (hidden
// from UI, but functionality is still accessible and necessary). 🎵

// querySelector here because we only have one audio element:
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Check if audio is playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  music.play();
};

// Pause
function pauseSong() {
  isPlaying = false;
  music.pause();
};