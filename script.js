let timerInterval = null;
let totalSeconds = 300; // Default 5 minutes
let remainingSeconds = 300;
let isRunning = false;
let isCountUp = false;
let selectedAlarm = 'double-beep';
let volume = 50;
let alarmDuration = 5;

const timerDisplay = document.getElementById('timerDisplay');
const endTimeDisplay = document.getElementById('endTime');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const countUpToggle = document.getElementById('countUpToggle');
const volumeControl = document.getElementById('volumeControl');
const volumeValue = document.getElementById('volumeValue');
const alarmDurationSelect = document.getElementById('alarmDuration');
const reminderMessage = document.getElementById('reminderMessage');
const completeModal = document.getElementById('completeModal');
const completeMessage = document.getElementById('completeMessage');
const okBtn = document.getElementById('okBtn');
const stopSoundBtn = document.getElementById('stopSoundBtn');
const quickBtns = document.querySelectorAll('.quick-btn');
const alarmBtns = document.querySelectorAll('.alarm-btn');
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');

// Initialize
updateDisplay();
setDefaultAlarm();

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
hoursInput.addEventListener('change', updateTotal);
minutesInput.addEventListener('change', updateTotal);
secondsInput.addEventListener('change', updateTotal);
countUpToggle.addEventListener('change', toggleCountUp);
volumeControl.addEventListener('input', updateVolume);
alarmDurationSelect.addEventListener('change', (e) => {
    alarmDuration = parseInt(e.target.value);
});
okBtn.addEventListener('click', closeModal);
stopSoundBtn.addEventListener('click', stopAlarmSound);

settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.toggle('active');
    settingsToggle.textContent = settingsPanel.classList.contains('active') ? 'Hide Settings' : 'Settings';
});

quickBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const seconds = parseInt(e.target.dataset.time);
        setTimerValue(seconds);
    });
});

alarmBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        selectedAlarm = e.target.dataset.sound;
        playAlarmSound(selectedAlarm);
        updateAlarmSelection();
    });
});

function updateTotal() {
    const h = parseInt(hoursInput.value) || 0;
    const m = parseInt(minutesInput.value) || 0;
    const s = parseInt(secondsInput.value) || 0;
    totalSeconds = h * 3600 + m * 60 + s;
    
    if (!isRunning) {
        remainingSeconds = totalSeconds;
        updateDisplay();
    }
}

function setTimerValue(seconds) {
    totalSeconds = seconds;
    remainingSeconds = seconds;
    
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    hoursInput.value = h;
    minutesInput.value = m;
    secondsInput.value = s;
    
    updateDisplay();
    if (isRunning) pauseTimer();
}

function updateDisplay() {
    const display = isCountUp 
        ? totalSeconds - remainingSeconds
        : remainingSeconds;
    
    const hours = Math.floor(display / 3600);
    const minutes = Math.floor((display % 3600) / 60);
    const seconds = display % 60;
    
    timerDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    updateEndTime();
}

function updateEndTime() {
    if (!isRunning) {
        endTimeDisplay.textContent = '--:--';
        return;
    }
    
    const now = new Date();
    const endTime = new Date(now.getTime() + remainingSeconds * 1000);
    const hours = endTime.getHours();
    const minutes = String(endTime.getMinutes()).padStart(2, '0');
    
    endTimeDisplay.textContent = `${hours}:${minutes}`;
}

function startTimer() {
    if (isRunning) return;
    if (totalSeconds === 0 && !isCountUp) return;
    
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    timerInterval = setInterval(() => {
        if (isCountUp) {
            remainingSeconds--;
            if (remainingSeconds < 0) {
                remainingSeconds = 0;
                completeTimer();
            }
        } else {
            remainingSeconds--;
            if (remainingSeconds <= 0) {
                remainingSeconds = 0;
                completeTimer();
            }
        }
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    
    isRunning = false;
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    remainingSeconds = totalSeconds;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopAlarmSound();
}

function completeTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    playAlarmSound(selectedAlarm);
    showCompleteModal();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function toggleCountUp(e) {
    isCountUp = e.target.checked;
    if (!isRunning) {
        remainingSeconds = isCountUp ? totalSeconds : totalSeconds;
        updateDisplay();
    }
}

function updateVolume(e) {
    volume = e.target.value;
    volumeValue.textContent = volume + '%';
}

function updateAlarmSelection() {
    alarmBtns.forEach(btn => {
        btn.style.background = btn.dataset.sound === selectedAlarm ? '#667eea' : 'white';
        btn.style.color = btn.dataset.sound === selectedAlarm ? 'white' : 'inherit';
    });
}

function setDefaultAlarm() {
    updateAlarmSelection();
}

function playAlarmSound(alarmType) {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = volume / 100;
    
    const now = audioContext.currentTime;
    const alarmDurationSecs = alarmDuration;
    
    switch(alarmType) {
        case 'double-beep':
            playBeep(audioContext, gainNode, now, 800, 0.2);
            playBeep(audioContext, gainNode, now + 0.3, 800, 0.2);
            break;
        case 'ti-ti':
            for (let i = 0; i < 4; i++) {
                playBeep(audioContext, gainNode, now + i * 0.2, 1000, 0.1);
            }
            break;
        case 'gentle':
            playBeep(audioContext, gainNode, now, 600, 0.5);
            break;
        case 'urgent':
            playBeep(audioContext, gainNode, now, 1200, 0.3);
            playBeep(audioContext, gainNode, now + 0.3, 1200, 0.3);
            break;
        case 'school':
            playBeep(audioContext, gainNode, now, 1000, 0.4);
            playBeep(audioContext, gainNode, now + 0.2, 1200, 0.4);
            break;
        case '8bit':
            playBeep(audioContext, gainNode, now, 800, 0.1);
            playBeep(audioContext, gainNode, now + 0.1, 1000, 0.1);
            playBeep(audioContext, gainNode, now + 0.2, 800, 0.1);
            break;
        case 'rooster':
            playBeep(audioContext, gainNode, now, 500, 0.3);
            playBeep(audioContext, gainNode, now + 0.4, 800, 0.3);
            break;
        case 'wind':
            playBeep(audioContext, gainNode, now, 600, 0.2);
            playBeep(audioContext, gainNode, now + 0.3, 800, 0.2);
            playBeep(audioContext, gainNode, now + 0.6, 1000, 0.2);
            break;
        case 'box':
            playBeep(audioContext, gainNode, now, 800, 0.15);
            playBeep(audioContext, gainNode, now + 0.2, 1000, 0.15);
            playBeep(audioContext, gainNode, now + 0.4, 800, 0.15);
            break;
        default:
            playBeep(audioContext, gainNode, now, 800, 0.2);
    }
}

function playBeep(audioContext, gainNode, startTime, frequency, duration) {
    const osc = audioContext.createOscillator();
    osc.frequency.value = frequency;
    osc.connect(gainNode);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
}

function stopAlarmSound() {
    // Stop audio context if needed
}

function showCompleteModal() {
    const msg = reminderMessage.value || 'Your timer has completed.';
    completeMessage.textContent = msg;
    completeModal.classList.remove('hidden');
}

function closeModal() {
    completeModal.classList.add('hidden');
}