// Will need to trigger play() and pause() functions on our audio element (hidden
// from UI, but functionality is still accessible and necessary). 🎵

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
// querySelector can be used here because we only have one audio element:
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
// progress indicator:
const progress = document.getElementById('progress');
// time indicators:
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
//
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
  image.src = `images/${song.name}.jpg`;
};

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1; // goes to last song in array if user clicks
    // "previous" from index 0 of the array
  }
  loadSong(songs[songIndex]);
  playSong();
};

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0; // goes back to first song if end of list is reached
  }
  loadSong(songs[songIndex]);
  playSong();
};

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration (duration is in seconds by default)
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration element to avoid NaN appearing on screen
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    // Display current time as song progresses
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
// (total width divided by the position we're at to get the percentage)
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music; // "music" refers to the audio element, which is
  // initialized as a new element for each audio file/track.

  music.currentTime = (clickX / width) * duration; // click position (clickX)
  // divided by progress bar width gives the position by percentage; multiplying
  // by audio file duration gives the position value in seconds.
};

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);