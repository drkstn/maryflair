import { useLoaderData } from "@remix-run/react";
import { isWithinInterval, parseISO, startOfDay } from "date-fns";
import { formatISOWithOptions } from "date-fns/fp";
import DailyScheduleList from "~/components/DailyScheduleList";
import { authenticator } from "~/services/auth.server";
import { createDateLookup } from "~/services/helpers.server";
import Schedule from "~/services/models/Schedule";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const formatDate = formatISOWithOptions({ representation: "date" });

  const schedules = await Schedule.find({ owner });

  const today = formatDate(startOfDay(new Date()));
  const scheduleData = schedules.filter((schedule) => {
    return isWithinInterval(parseISO(today), {
      start: parseISO(schedule.calendar.start),
      end: parseISO(schedule.calendar.end),
    });
  });

  const dateLookups = scheduleData.map((schedule) => {
    return createDateLookup(schedule.calendar.dates, schedule.courses);
  });

  const lessonData = dateLookups.map((lookup) => lookup[today]);

  return { scheduleData, lessonData };
};

export default function HomeIndex() {
  const data = useLoaderData();
  const { scheduleData, lessonData } = data;
  console.log(lessonData);
  console.log(scheduleData);

  return (
    <section>
      <div>
        <h1 className="text-slate-700 font-bold text-3xl">Today's Schedules</h1>
        <p className="mt-2 text-sm text-slate-500">
          A schedule is a defined period of time in which one or more courses
          occur.
        </p>
      </div>
      <hr className="my-6" />
      <DailyScheduleList scheduleData={scheduleData} lessonData={lessonData} />
    </section>
  );
}
