import { isSameWeek, parseISO, getDay } from "date-fns";
import { format } from "date-fns/fp";

export default function ScheduleList({ data }) {
  const { dates, weeks } = data.calendar;
  const formatDate = format("MMMM d, y");
  const formatDate2 = format("EEEE, MMMM d");

  const { courses } = data;

  return (
    <div>
      {weeks.map((week, index) => (
        <div
          key={index}
          className="mb-4 border border-slate-200 rounded-xl p-3"
        >
          <h1 className="flex justify-between">
            <span className="text-purple-500 font-bold text-xl">
              Week {index + 1}
            </span>
            <span className="text-sm text-purple-500">
              {formatDate(parseISO(week))}
            </span>
          </h1>
          {dates
            .filter((date) => isSameWeek(parseISO(week), parseISO(date)))
            .map((date) => (
              <div key={date} className="py-2">
                <p className="text-purple-500">{formatDate2(parseISO(date))}</p>
                {courses.map((subject) =>
                  subject.frequency.includes(getDay(parseISO(date))) ? (
                    <p key={subject.name}>- {subject.name}</p>
                  ) : null
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
