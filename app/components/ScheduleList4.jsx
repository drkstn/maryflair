import { isSameWeek, parseISO, getDay, isSameDay } from "date-fns";
import { format } from "date-fns/fp";
import { createDateLookup } from "~/services/helpers.server";

export default function ScheduleList4({ schedule, dateLookup }) {
  const { dates, weeks } = schedule.calendar;

  const formatDate = format("MMMM d, y");
  const formatDate2 = format("EEEE, MMMM d");

  const datesForWeek = (week) => {
    return dates.filter((date) => isSameWeek(parseISO(week), parseISO(date)));
  };
  const weeksWithDates = weeks.map((week) => {
    return dates.filter((date) => isSameWeek(parseISO(week), parseISO(date)));
  });

  console.log(weeksWithDates);

  return (
    <section>
      {weeks.map((week, index) => (
        <div key={index}>
          <h1 className="font-bold text-2xl text-purple-500 mb-2">
            Week {index + 1}
          </h1>
          <hr className="border-4 border-purple-500 mb-4" />
          <div className="">{}</div>
        </div>
      ))}
    </section>
  );
}
