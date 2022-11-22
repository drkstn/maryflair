import { useLoaderData } from "@remix-run/react";
import { endOfDay, isWithinInterval, parseISO, startOfDay } from "date-fns";
import { formatISOWithOptions } from "date-fns/fp";
import DailyScheduleList from "~/components/DailyScheduleList";
import { authenticator } from "~/services/auth.server";
import { createDateLookup } from "~/services/helpers.server";
import Schedule from "~/services/models/Schedule";
import {} from "date-fns/getUnixTime";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const formatDate = formatISOWithOptions({ representation: "date" });

  const schedules = await Schedule.find({ owner });

  const createDate = new Date();
  const getOffset = createDate.getTimezoneOffset();
  const todayRaw = createDate - getOffset;
  const today = formatDate(todayRaw);
  // const today = formatDate(new Date().getTimezoneOffset());
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

  return { scheduleData, lessonData, today };
};

export default function HomeIndex() {
  const data = useLoaderData();
  const { scheduleData, lessonData, today } = data;
  console.log(today);

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
