import { parseISO, getDay, isSameDay } from "date-fns";

export const clear = (arr) => {
  return arr.reduce(
    (start, value) => (value.length > 0 ? [...start, value] : start),
    []
  );
};

export const moveElement = (arr, value, pos) => {
  const newArr = [...arr];
  const fromIndex = newArr.indexOf(value);
  if (fromIndex === -1) return "not found";

  const toIndex = fromIndex + pos >= 0 ? fromIndex + pos : 0;

  const element = newArr.splice(fromIndex, 1)[0];

  newArr.splice(toIndex, 0, element);

  return newArr;
};

export const moveByIndex = (arr, fromIndex, toIndex) => {
  const arrLength = arr.length - 1;

  if (fromIndex < 0) fromIndex = 0;
  else if (fromIndex > arrLength) fromIndex = arrLength;

  if (toIndex < 0) toIndex = 0;
  else if (toIndex > arrLength) toIndex = arrLength;

  const item = arr.at(fromIndex);

  const leftOfFromIndex = arr.slice(0, fromIndex);
  const rightOfFromIndex = arr.slice(fromIndex + 1);

  const filteredArr = [...leftOfFromIndex, ...rightOfFromIndex];

  const leftOfToIndex = filteredArr.slice(0, toIndex);
  const rightOfToIndex = filteredArr.slice(toIndex);

  const newArr = [...leftOfToIndex, item, ...rightOfToIndex];

  return newArr;
};

export const createDateLookup = (dates, courses) => {
  // Create keys from ISO date strings
  const dateLookup = dates.reduce((start, date) => {
    // Create object on each date with 'lessons' key and [] value
    const lessonsOnDate = courses.map((course) => {
      const lessons = course.lessons
        .toObject()
        .filter((lesson) => {
          return isSameDay(parseISO(date), parseISO(lesson.date));
        })
        .map((lesson) => {
          return {
            ...lesson,
            course: course.name,
          };
        });
      return lessons;
    });

    // Create object on each date with 'courses' key and [] value
    const coursesOnDate = courses
      .filter((course) => course.frequency.includes(getDay(parseISO(date))))
      .map((course) => {
        // Create object on each course with 'lessons' key and [] value
        const lessonsForCourseOnDate = course.lessons.filter((lesson) => {
          return isSameDay(parseISO(date), parseISO(lesson.date));
        });

        return {
          name: course.name,
          _id: course._id,
          frequency: course.frequency,
          lessons: lessonsForCourseOnDate,
        };
      });

    // Return lookup object
    return {
      ...start,
      [date]: {
        courses: coursesOnDate,
        lessons: lessonsOnDate.flat(),
      },
    };
  }, {});

  return dateLookup;
};
