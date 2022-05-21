
const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
}

refs.startBtn.addEventListener('click', colorChanger);
refs.stopBtn.addEventListener('click', toStopBtn);

// Для генерации случайного цветa
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function colorChanger() {
  interval = setInterval(() => {
    const color = getRandomHexColor();
    refs.body.style.background = color;
  }, 1000);
  refs.startBtn.disabled = true;
}

function toStopBtn() {
  clearInterval(interval);
refs.startBtn.disabled = false;
}



