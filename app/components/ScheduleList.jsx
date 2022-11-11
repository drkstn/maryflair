import { isSameWeek, parseISO, getDay } from "date-fns";
import { format } from "date-fns/fp";

export default function ScheduleList({ data }) {
  const { dates, weeks } = data.calendar;
  const formatDate = format("EEEE, MMMM d, y");

  const { courses } = data;

  return (
    <section>
      {weeks.map((week, index) => (
        <div key={index} className="mb-4">
          <h1 className="font-bold text-lg">
            Week {index + 1} - {formatDate(parseISO(week))}
          </h1>
          {dates
            .filter((date) => isSameWeek(parseISO(week), parseISO(date)))
            .map((date) => (
              <div key={date}>
                <p className="text-purple-500 font-bold">
                  {formatDate(parseISO(date))}
                </p>
                {courses.map((subject) =>
                  subject.frequency.includes(getDay(parseISO(date))) ? (
                    <p key={subject.name}>- {subject.name}</p>
                  ) : null
                )}
              </div>
            ))}
          <p></p>
        </div>
      ))}
    </section>
  );
}
