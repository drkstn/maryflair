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
import Button from "~/components/Button";

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
      <div className="sm:flex justify-between items-start">
        <h1 className="text-slate-700 font-bold text-2xl">
          {formatDate2(parseISO(dateInTimeZone))}
        </h1>
        <div className="space-x-2 mt-2 sm:mt-0">
          <Button
            type="link"
            label="Previous"
            genre="sm"
            to={`/home?date=${prevDay}`}
          />
          <Button
            type="link"
            label="Next"
            genre="sm"
            to={`/home?date=${nextDay}`}
          />
        </div>
      </div>
      <hr className="my-6" />
      <DailyScheduleList scheduleData={scheduleData} lessonData={lessonData} />
    </section>
  );
}
