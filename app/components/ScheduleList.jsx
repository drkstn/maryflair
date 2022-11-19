import { isSameWeek, parseISO } from "date-fns";
import { format } from "date-fns/fp";

export default function ScheduleList({ schedule, dateLookup }) {
  const { dates, weeks } = schedule.calendar;

  // const formatDate = format("MMMM d, y");
  const formatDate2 = format("EEEE, MMMM d");

  const weeksWithDates = weeks.map((week) => {
    return dates.filter((date) => isSameWeek(parseISO(week), parseISO(date)));
  });

  return (
    <section>
      {weeksWithDates.map((week, index) => (
        <div key={index}>
          <h1 className="font-bold text-2xl text-purple-500 mb-2">
            Week {index + 1}
          </h1>
          <hr className="border-4 border-purple-500 mb-4" />
          <div className="">
            {week.map((date) => (
              <div key={date} className="mb-6">
                <p className="mb-2 font-bold">{formatDate2(parseISO(date))}</p>
                <div>
                  {dateLookup[date].courses.map((course) => (
                    <div
                      key={course._id}
                      className="p-2 mb-2 border border-1 rounded-xl"
                    >
                      <p className="text-purple-500">{course.name}</p>
                      {course.lessons.map((lesson) => (
                        <p key={lesson._id}>{lesson.name}</p>
                      ))}
                      <p className="text-slate-400">
                        {course.lessons.length < 1 && "No Lessons"}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400">
                  {dateLookup[date].courses.length < 1 && "No Courses"}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
