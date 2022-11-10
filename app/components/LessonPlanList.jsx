import { isSameWeek, parseISO } from "date-fns";
import { format } from "date-fns/fp";

export default function LessonPlanList({ weeks, dates }) {
  const formatDate = format("EEEE, MMMM d, y");

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
              <p key={date}>{formatDate(parseISO(date))}</p>
            ))}
          <p></p>
        </div>
      ))}
    </section>
  );
}
