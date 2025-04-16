const selectableImages = document.querySelectorAll(".selectable");
const startBtn = document.getElementById("startBtn");
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const frame = document.getElementById("frame");
const timerEl = document.getElementById("timer");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

const timers = [5, 240, 300, 360];
const startSound = document.getElementById("startSound");
const endSound = document.getElementById("endSound");
let selected = 1;
let timer = 10;
let timerInterval;
let animationInterval;
let isPaused = false;
let frameIndex = 0;
const frames = [
  "chicken1.png",
  "chicken2.png",
  "chicken3.png",
  "chicken4.png",
  "chicken5.png",
  "chicken5.png",
  "chicken4.png",
  "chicken3.png",
  "chicken2.png",
  "chicken1.png",
];
const endFrames = ["chicken6.png", "chicken7.png"];

selectableImages.forEach((item) => {
  item.addEventListener("click", () => {
    selectableImages.forEach((i) => i.classList.remove("selected"));
    item.classList.add("selected");
    selected = item.id;
  });
});

startBtn.addEventListener("click", () => {
  stage1.classList.add("hidden");
  stage2.classList.remove("hidden");
  timer = timers[selected - 1];
  frameIndex = 0;
  timerEl.textContent = getTimer(timer);
  startAnimation();
  startTimer();
  startSound.play();
});

function getTimer(timer) {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return `${minutes < 10 ? "0" : ""}${minutes} : ${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function startAnimation() {
  animationInterval = setInterval(() => {
    frameIndex = (frameIndex + 1) % frames.length;
    frame.src = "assets/" + frames[frameIndex];
  }, 150);
}

function startEndAnimation() {
  animationInterval = setInterval(() => {
    frameIndex = (frameIndex + 1) % endFrames.length;
    frame.src = "assets/" + endFrames[frameIndex];
  }, 150);
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (!isPaused) {
      timer--;
      timerEl.textContent = getTimer(timer);
      if (timer <= 0) {
        endSound.play();
        pauseBtn.classList.add("hidden");
        clearInterval(timerInterval);
        clearInterval(animationInterval);
        startEndAnimation();
      }
    }
  }, 1000);
}

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Продолжить" : "Пауза";
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  clearInterval(animationInterval);
  backToStart();
});

function backToStart() {
  stage2.classList.add("hidden");
  stage1.classList.remove("hidden");
  pauseBtn.classList.remove("hidden");
  pauseBtn.textContent = "Пауза";
  startSound.currentTime = 0;
  endSound.currentTime = 0;
  startSound.pause();
  endSound.pause();
  frameIndex = 0;
  isPaused = false;
}
