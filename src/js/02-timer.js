// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";


const refs = {
    startBtn: document.querySelector('[data-start]'),
    input: document.querySelector('#datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let intervalID = null;
// неактивна кнопка при старті сторінки
refs.startBtn.setAttribute('disabled', true);
let selectUsersDates;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        selectUsersDates = selectedDates[0].getTime();
        timer(selectUsersDates);
        checkDate(selectUsersDates);
        console.log(selectedDates[0]);
    },
  };

flatpickr('#datetime-picker', options);


// перевірка вірної дати
function checkDate(time){
    if (time < options.defaultDate) {
    window.alert("Please choose a date in the future");
        refs.startBtn.setAttribute('disabled', true);
        return;
    } else {
        refs.startBtn.removeAttribute('disabled', true);
    }    
};

function timer() {
    const resultTime = selectUsersDates - options.defaultDate;
    const time = convertMs(resultTime);
    if (resultTime > 0) {
        updateComponentsTimer(time);
    } else
    {
        clearInterval(intervalID);
    }
    console.log(time);
}

function updateComponentsTimer({ days, hours, minutes, seconds }){
    refs.days.innerHTML = days;
    refs.hours.innerHTML = hours;
    refs.minutes.innerHTML = minutes;
    refs.seconds.innerHTML = seconds;
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function addLeadingZero(value) {
    return String(value).padStart(2, '0'); 
};

refs.startBtn.addEventListener('click', () => {
    intervalID = setInterval(timer, 1000);
    refs.startBtn.disabled = true;
    refs.input.disabled = true;
});