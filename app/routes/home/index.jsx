import { Link, useLoaderData } from "@remix-run/react";
import {
  addDays,
  isToday,
  isWithinInterval,
  parseISO,
  subDays,
} from "date-fns";
import { format, formatISOWithOptions } from "date-fns/fp";
import DailyScheduleList from "~/components/DailyScheduleList";
import { authenticator } from "~/services/auth.server";
import { createDateLookup } from "~/services/helpers.server";
import Schedule from "~/services/models/Schedule";
import { formatInTimeZone } from "date-fns-tz";
import User from "~/services/models/User";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const url = new URL(request.url);
  const queryDate = url.searchParams.get("date");

  const userData = await User.findOne({ email: owner });
  const date = new Date();
  const dateInTimeZone =
    queryDate || formatInTimeZone(date, userData.timeZone, "yyyy-MM-dd");

  const schedules = await Schedule.find({ owner });

  const scheduleData = schedules.filter((schedule) => {
    return isWithinInterval(parseISO(dateInTimeZone), {
      start: parseISO(schedule.calendar.start),
      end: parseISO(schedule.calendar.end),
    });
  });

  const dateLookups = scheduleData.map((schedule) => {
    return createDateLookup(schedule.calendar.dates, schedule.courses);
  });

  const lessonData = dateLookups.map((lookup, index) => {
    return lookup[dateInTimeZone];
  });

  return { scheduleData, lessonData, dateInTimeZone };
};

export default function HomeIndex() {
  const data = useLoaderData();
  const { scheduleData, lessonData, dateInTimeZone } = data;

  const formatDate = formatISOWithOptions({ representation: "date" });
  const nextDay = formatDate(addDays(parseISO(dateInTimeZone), 1));
  const prevDay = formatDate(subDays(parseISO(dateInTimeZone), 1));

  const formatDate2 = format("EEEE, MMMM d");

  return (
    <section>
      <div>
        <div className="flex justify-between">
          <h1 className="text-slate-700 font-bold text-3xl">
            {isToday(parseISO(dateInTimeZone))
              ? "Today's Schedule"
              : formatDate2(parseISO(dateInTimeZone))}
          </h1>
          <div className="space-x-4 text-purple-500">
            <Link
              className="hover:text-purple-400 inline-block"
              to={`/home?date=${prevDay}`}
            >
              &lt; Prev
            </Link>
            <Link
              className="hover:text-purple-400 inline-block"
              to={`/home?date=${nextDay}`}
            >
              Next &gt;
            </Link>
          </div>
        </div>
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
