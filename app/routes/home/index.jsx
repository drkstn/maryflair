import {
  useLoaderData,
  useNavigate,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { isWithinInterval, parseISO } from "date-fns";
import { formatISOWithOptions } from "date-fns/fp";
import DailyScheduleList from "~/components/DailyScheduleList";
import { authenticator } from "~/services/auth.server";
import { createDateLookup } from "~/services/helpers.server";
import Schedule from "~/services/models/Schedule";
import { formatInTimeZone } from "date-fns-tz";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  // const url = new URL(request.url);
  // const date = url.searchParams.get("date");
  // Intl.DateTimeFormat().resolvedOptions().timeZone;
  // const newDate3 = formatInTimeZone(
  //   newDate,
  //   Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   "yyyy-MM-dd HH:mm:ss zzz"
  // );

  const formatDate = formatISOWithOptions({ representation: "date" });

  const schedules = await Schedule.find({ owner });

  const date = new Date();
  const dateInTimeZone = formatInTimeZone(
    date,
    schedules[0].calendar.timeZone,
    "yyyy-MM-dd"
  );

  const scheduleData = schedules.filter((schedule) => {
    const dateInTimeZone = formatInTimeZone(
      date,
      schedule.calendar.timeZone,
      "yyyy-MM-dd"
    );

    return isWithinInterval(parseISO(dateInTimeZone), {
      start: parseISO(schedule.calendar.start),
      end: parseISO(schedule.calendar.end),
    });
  });

  const dateLookups = scheduleData.map((schedule) => {
    return createDateLookup(schedule.calendar.dates, schedule.courses);
  });

  const lessonData = dateLookups.map((lookup, index) => {
    const dateInTimeZone = formatInTimeZone(
      date,
      schedules[0].calendar.timeZone,
      "yyyy-MM-dd"
    );
    return lookup[dateInTimeZone];
  });

  return { scheduleData, lessonData, dateInTimeZone };
};

export default function HomeIndex() {
  const data = useLoaderData();
  const { scheduleData, lessonData, dateInTimeZone } = data;

  console.log(dateInTimeZone);
  return (
    <section>
      <div>
        <h1 className="text-slate-700 font-bold text-3xl">Today's Schedules</h1>
        <p className="mt-2 text-sm text-slate-500">
          A schedule is a defined period of time in which one or more courses
          occur.
        </p>
        {dateInTimeZone && <p>{dateInTimeZone}</p>}
      </div>
      <hr className="my-6" />
      <DailyScheduleList scheduleData={scheduleData} lessonData={lessonData} />
    </section>
  );
}
