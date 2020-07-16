// Create the audio
let audio = new Audio('audio/spring-migration.mp3');

// Get the buttons and other elements
let playButton     = document.querySelector('.audio-button-play'),
    pauseButton    = document.querySelector('.audio-button-pause'),
    backwardButton = document.querySelector('.audio-button-backward'),
    forwardButton  = document.querySelector('.audio-button-forward'),
    downloadButton = document.querySelector('.audio-button-download'),
    seekBar        = document.querySelector('.audio-seek-bar'),
    spentTime      = document.querySelector('.audio-spent-time'),
    totalTime      = document.querySelector('.audio-total-time');

// On audio ready, set the right duration and total time
audio.addEventListener('canplaythrough', (e) => {
    seekBar.setAttribute('max', audio.duration + '');
    totalTime.innerText = getDurationString(audio.duration);
});

// On audio playing, update the seek bar and time
audio.addEventListener('timeupdate', (e) => {
    if (audio.ended) {
        show(playButton);
        hide(pauseButton);
    } else {
        seekBar.value = audio.currentTime;
        seekBar.dispatchEvent(new Event('update', {bubbles: true}))
        spentTime.innerText = getCurrentTimeString(audio.currentTime);
    }
});

// Play action
playButton.addEventListener('click', (e) => {
    e.preventDefault();
    hide(playButton);
    show(pauseButton);
    audio.play();
});

// Stop action
pauseButton.addEventListener('click', (e) => {
    e.preventDefault();
    hide(pauseButton);
    show(playButton);
    audio.pause();
});

// Backward action
backwardButton.addEventListener('click', (e) => {
    e.preventDefault();
    audio.currentTime = audio.currentTime - 10;
})

// Forward action
forwardButton.addEventListener('click', (e) => {
    e.preventDefault();
    audio.currentTime = audio.currentTime + 10;
})

// Download action
downloadButton.addEventListener('click', (e) => {
    let link = document.createElement("a");
    link.download = getFilename(audio.src);
    link.href = audio.src;
    link.click();
});

// Update seek bar
seekBar.addEventListener('update', (e) => {
    let min = e.target.min,
        max = e.target.max,
        val = e.target.value;
    seekBar.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
});

// On time drag
seekBar.addEventListener('input', (e) => {
    audio.currentTime = seekBar.value;
    seekBar.dispatchEvent(new Event('update', {bubbles: true}));
});

// Get duration time
let getDurationString = (length) => {
    let minutes    = Math.floor(length / 60),
        secondsInt = length - minutes * 60,
        secondsStr = secondsInt.toString(),
        seconds    = secondsStr.substr(0, 2);
    return minutes + ':' + seconds;
}

// Get current time
let getCurrentTimeString = (currentTime) => {
    let currentMinute      = parseInt(currentTime / 60) % 60,
        currentSecondsLong = currentTime % 60,
        currentSeconds     = currentSecondsLong.toFixed();
    return currentMinute + ":" + (currentSeconds < 10 ? "0" + currentSeconds : currentSeconds);
}

// Get file name for download
let getFilename = (url) => {
    return url.substring(url.lastIndexOf("/") + 1);
}

// Hide a element
let hide = (element) => {
    element.style.display = 'none';
}

// Show a element
let show = (element) => {
    element.style.display = 'block';
}