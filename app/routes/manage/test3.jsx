var {
  eachDayOfInterval,
  format,
  isFriday,
  formatISO,
  parseISO,
} = require("date-fns");
const { formatISOWithOptions } = require("date-fns/fp");

const formatw = formatISOWithOptions({ representation: "date" });

const dates = eachDayOfInterval({
  start: new Date(2022, 9, 8),
  end: new Date(2022, 11, 30),
});

const lessons = [
  { lesson: "Cookies" },
  { lesson: "Tarts" },
  { lesson: "Pies" },
  { lesson: "Biscuits" },
];

const possibleDates = dates.filter((date) => isFriday(date)).map(formatw);

const givenIndex = 2;

const deployLessons = lessons.reduce((start, value, index) => {
  const deployDate = possibleDates[index + givenIndex];
  return [
    ...start,
    {
      ...value,
      date: deployDate,
    },
  ];
}, []);

const givenIndex2 = 2;

const deployLessons2 = deployLessons.reduce((start, value, index) => {
  const newIndex = possibleDates.indexOf(value.date);
  const newDate =
    index >= givenIndex2 ? possibleDates[newIndex + 1] : value.date;
  return [
    ...start,
    {
      ...value,
      date: newDate,
    },
  ];
}, []);

const givenIndex3 = 3;

const deployLessons3 = deployLessons2.reduce((start, value, index) => {
  const newIndex = possibleDates.indexOf(value.date);
  const newDate =
    index >= givenIndex3 ? possibleDates[newIndex + 1] : value.date;
  return [
    ...start,
    {
      ...value,
      date: newDate,
    },
  ];
}, []);

// console.log(possibleDates);
// console.log(deployLessons);
// console.log(deployLessons2);
// console.log(deployLessons3);
