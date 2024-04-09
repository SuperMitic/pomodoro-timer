const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const timerDisplay = document.getElementById('pomodoro-time');
const work_or_break = document.getElementById('work-or-break');
const repeatNumber = document.getElementById('repeat-time');

let interval;
let isWorking = true;
let totalSeconds = 5 * 60;
let isTimerRunning = false;
let totalTime = 0;
let totalBreakTime = 0;
let repeatTime = 0;

function updateTimer() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {

    if (isTimerRunning) { 
        return; 
    }
    repeatTime = repeatNumber.value;
    isTimerRunning = true;
    work_or_break.textContent = 'Working Time';
    setTimer();

    interval = setInterval(() => {
      if (repeatTime >= 0) {
        totalSeconds--;
        updatePomodoro();
        updateTimer();

        if (totalSeconds === 0) {
          if (isWorking) {
            totalSeconds = breakTimeInput.value * 60;
            work_or_break.textContent = 'Break Time';
            isWorking = false;
            repeatTime--;
          } else {
            totalSeconds = workTimeInput.value * 60;
            work_or_break.textContent = 'Working Time';
            isWorking = true;
          }
        }
      }
      else {
        clearInterval(interval);
        isTimerRunning = false;
        isWorking = false;
        setTimer();
        work_or_break.textContent = 'Pomodoro Timer';
      }
    }, 1000);
}

function setTimer() {
    totalSeconds = workTimeInput.value * 60;
    totalTime = totalSeconds;
    totalBreakTime = breakTimeInput.value * 60;
    repeatTime = repeatNumber.value;
    updateTimer();
}

function stopTimer() {
  if (isTimerRunning){
    clearInterval(interval);
    isTimerRunning = false;
    work_or_break.textContent = 'Paused';
  }
}

function resetTimer() {
  stopTimer();
  setTimer();
  work_or_break.textContent = 'Pomodoro Timer';
  document.getElementById('fill').style.height = `0%`;
}

function workTimeChange() {
    if (isTimerRunning) {
        return;
    }
    setTimer();
}

function updatePomodoro() {
  let progress = 0;
  if (isWorking) {
    progress = (totalTime - totalSeconds) / totalTime * 100;
  }
  else {
    progress = (totalSeconds) / totalBreakTime * 100;
  }
  document.getElementById('fill').style.height = `${progress}%`;
}


startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
workTimeInput.addEventListener('change', workTimeChange);
breakTimeInput.addEventListener('change', workTimeChange);
repeatNumber.addEventListener('change', workTimeChange);
