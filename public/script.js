let medTimer;
let medIsRunning = false;
let medTimeLeft = 300; 

const medTimerDisplay = document.getElementById('timerDisplay');
const medStartButton = document.getElementById('startButton');
const medPauseButton = document.getElementById('pauseButton');
const medResetButton = document.getElementById('resetButton');

function medFormatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function medUpdateTimerDisplay() {
    medTimerDisplay.innerText = medFormatTime(medTimeLeft);
}

function medStartTimer() {
    if (!medIsRunning) {
        medIsRunning = true;
        medStartButton.textContent = 'Resume';
        medTimer = setInterval(() => {
            if (medTimeLeft > 0) {
                medTimeLeft--;
                medUpdateTimerDisplay();
            } else {
                clearInterval(medTimer);
                medIsRunning = false;
                alert('Meditation complete!');
                medResetTimer();
            }
        }, 1000);
    }
}

function medPauseTimer() {
    if (medIsRunning) {
        clearInterval(medTimer);
        medIsRunning = false;
        medStartButton.textContent = 'Resume';
    }
}

function medResetTimer() {
    clearInterval(medTimer);
    medIsRunning = false;
    medTimeLeft = 300;
    medUpdateTimerDisplay();
    medStartButton.textContent = 'Start';
}

medStartButton.addEventListener('click', medStartTimer);
medPauseButton.addEventListener('click', medPauseTimer);
medResetButton.addEventListener('click', medResetTimer);

medUpdateTimerDisplay();
