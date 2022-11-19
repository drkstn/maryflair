import { isSameWeek, parseISO, getDay, isSameDay } from "date-fns";
import { format } from "date-fns/fp";

export default function ScheduleList2({ schedule }) {
  const { dates, weeks } = schedule.calendar;
  const { courses } = schedule;

  // console.log(courses);

  const formatDate = format("MMMM d, y");
  const formatDate2 = format("EEEE, MMMM d");

  return (
    <section>
      {weeks.map((week, index) => (
        <div key={index}>
          <p>Week {index + 1}</p>
          {/* {courses.map((course) =>
            course.lessons
              .filter((lesson) =>
                isSameWeek(parseISO(week), parseISO(lesson.date))
              )
              .map((lesson, index) => <p key={index}>{lesson.name}</p>)
          )} */}
          {dates
            .filter((date) => isSameWeek(parseISO(week), parseISO(date)))
            .map((date) => (
              <div key={date} className="py-2">
                <p className="text-purple-500">{formatDate2(parseISO(date))}</p>
                {courses.map((course) =>
                  course.lessons
                    .filter((lesson) =>
                      isSameDay(parseISO(date), parseISO(lesson.date))
                    )
                    .map((lesson, index) => (
                      <div key={lesson._id}>
                        <p className="font-bold text-blue-500">{course.name}</p>
                        <p>{lesson.name}</p>
                      </div>
                    ))
                )}
              </div>
            ))}
        </div>
      ))}
    </section>
  );
}
