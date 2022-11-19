import { isSameWeek, parseISO, getDay, isSameDay } from "date-fns";
import { format } from "date-fns/fp";
import { createDateLookup } from "~/services/helpers.server";

export default function ScheduleList3({ schedule }) {
  const { dates, weeks } = schedule.calendar;
  const { courses } = schedule;

  // console.log(courses);

  const formatDate = format("MMMM d, y");
  const formatDate2 = format("EEEE, MMMM d");

  const testDate = "2022-10-04";

  // const datesForWeek = (week) => {
  //   return dates.filter((date) => isSameWeek(parseISO(week), parseISO(date)));
  // };
  // const weekDates = weeks.map((week) => datesForWeek(week));

  // const datesForCourses = (course) => {
  //   return dates
  //     .filter((date) => course.frequency.includes(getDay(parseISO(date))))
  //     .map((date) => formatDate2(parseISO(date)));
  // };
  // const courseDates = courses.map((course) => datesForCourses(course));

  // console.log(courseDates);

  // const dateLookup = dates.map((date) => ({ [date]: { name: date } }));

  return (
    <section>
      {weeks.map((week, index) => (
        <div key={index}>
          <h1 className="font-bold text-2xl text-purple-500 mb-2">
            Week {index + 1}
          </h1>
          <hr className="border-4 border-purple-500 mb-4" />
          <div className="">
            {dates
              .filter((date) => isSameWeek(parseISO(week), parseISO(date)))
              .map((date) => (
                <div key={date} className="mb-6">
                  <p className="mb-2 font-bold">
                    {formatDate2(parseISO(date))}
                  </p>
                  {courses.map((course) => (
                    <div key={course._id}>
                      {course.lessons
                        .filter((lesson) =>
                          isSameDay(parseISO(date), parseISO(lesson.date))
                        )
                        .map((lesson, index) => (
                          <div
                            key={lesson._id}
                            className="p-2 mb-2 border border-1 rounded-xl"
                          >
                            <p className="font-bold text-blue-500">
                              {course.name}
                            </p>
                            <p>{lesson.name}</p>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
