import { isSameWeek, parseISO, getDay } from "date-fns";
import { format } from "date-fns/fp";

export default function ScheduleList({ data }) {
  const { dates, weeks } = data.calendar;
  const formatDate = format("MMMM d, y");
  const formatDate2 = format("EEEE, MMMM d");

  const { courses } = data;

  return (
    <section>
      {weeks.map((week, index) => (
        <div key={index} className="">
          <h1 className="flex justify-between">
            <span className="font-bold text-sm tracking-wider text-slate-700 uppercase">
              Week {index + 1}
            </span>
            <span className="text-sm text-purple-500">
              {formatDate(parseISO(week))}
            </span>
          </h1>
          {dates
            .filter((date) => isSameWeek(parseISO(week), parseISO(date)))
            .map((date) => (
              <div key={date}>
                <p className="text-purple-500 font-bold">
                  {formatDate2(parseISO(date))}
                </p>
                {courses.map((subject) =>
                  subject.frequency.includes(getDay(parseISO(date))) ? (
                    <p key={subject.name}>- {subject.name}</p>
                  ) : null
                )}
              </div>
            ))}
          <p></p>
          <hr className="my-6" />
        </div>
      ))}
    </section>
  );
}
