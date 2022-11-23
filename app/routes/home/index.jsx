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
import User from "~/services/models/User";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const url = new URL(request.url);
  const queryDate = url.searchParams.get("date");

  const userData = await User.findOne({ email: owner });
  const formatDate = formatISOWithOptions({ representation: "date" });
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
  const { scheduleData, lessonData } = data;

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
