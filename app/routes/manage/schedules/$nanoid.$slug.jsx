import { Outlet, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { createDateLookup } from "~/services/helpers.server";
import Schedule from "~/services/models/Schedule";

export const loader = async ({ params, request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const { nanoid } = params;

  const schedule = await Schedule.findOne({ nanoid, owner });

  const dateLookup = createDateLookup(
    schedule.calendar.dates,
    schedule.courses
  );

  return { schedule, dateLookup };
};

export default function ScheduleById() {
  const data = useLoaderData();
  const { schedule } = data;

  return (
    <section>
      <h2 className="min-w-max mb-1 font-bold text-sm tracking-wider text-purple-500 uppercase">
        Schedule
      </h2>
      <h1 className="text-slate-700 font-bold text-3xl">{schedule.name}</h1>
      <Outlet context={data} />
    </section>
  );
}
