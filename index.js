const title = document.getElementById('sourat-title'),
    qari = document.getElementById('qari-sourat'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    volumeSlider = document.getElementById('volume');

const sourat = new Audio();

const sourats = [
    {
        path: 'assets/001.mp3',
        displayName: 'سورة الفاتحة بصوت القارئ ماهر المعيقلي',
        cover: 'assets/quran.jpg',
        qari: 'maher al muaiqly',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: 'assets/2.jpg',
        qari: 'NEFFEX',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Intellect',
        cover: 'assets/3.jpg',
        qari: 'Yung Logos',
    }
];

// const changevolume = (amount) => {
//     var audioobject = document.getElementsByTagName("audio")[0];
//     sourat.volume = amount;
// }

let souratIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseSourat();
    } else {
        playSourat();
    }
}

function playSourat() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    sourat.play();
}

function pauseSourat() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    sourat.pause();
}

function loadSourat(s) {
    sourat.src = s.path;
    title.textContent = s.displayName;
    qari.textContent = s.qari;
}

function changeSourat(direction) {
    souratIndex = (souratIndex + direction + sourats.length) % sourats.length;
    loadSourat(sourats[souratIndex]);
    playSourat();
}

function updateProgressBar() {
    const { duration, currentTime } = sourat;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    sourat.currentTime = (clickX / width) * sourat.duration;
}

window.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        togglePlay();
    }
});
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeSourat(-1));
nextBtn.addEventListener('click', () => changeSourat(1));
sourat.addEventListener('ended', () => changeSourat(1));
sourat.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadSourat(sourats[souratIndex]);