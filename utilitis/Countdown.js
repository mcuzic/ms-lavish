import getElement from './Get Element.js';

const countdownTitle = getElement('.countdown-title');
const numbers = document.querySelectorAll('.deadline-format h4');
const deadline = document.querySelector('.deadline');
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const futureDate = new Date(2023, 11, 26, 15, 30, 45);
const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const day = weekdays[futureDate.getDay()];
const monthDate = futureDate.getDate();
const hour = futureDate.getHours();
const minutes = futureDate.getMinutes();
const seconds = futureDate.getSeconds();

const futureTime = futureDate.getTime();

const countdown = () => {
  countdownTitle.innerHTML = `Mega sale Ends on <b>${day}, ${monthDate} ${month} ${year}, ${hour}:${minutes}`;
  const today = new Date().getTime();
  const t = futureTime - today;
  //1s = 1000ms
  //1m = 60 s
  //1h = 60m
  //1d = 24hr

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  const oneSec = 1000;

  const days = Math.floor(t / oneDay);
  const hours = Math.floor((t % oneDay) / oneHour);
  const minute = Math.floor(t / oneHour / oneMin);
  const seconds = Math.floor((t % oneMin) / oneSec);

  const timeArray = [days, hours, minute, seconds];

  const format = (array) => {
    if (array < 10) {
      return `0${array}`;
    }
    return array;
  };

  numbers.forEach((number, index) => {
    number.innerHTML = format(timeArray[index]);
  });
  if (t < 0) {
    clearInterval(count);
    deadline.innerHTML = '<h4>Sale has ended</h4>';
  }
};

let count = setInterval(countdown, 1000);

export default countdown;
