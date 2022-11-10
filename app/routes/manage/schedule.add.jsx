import { Form, Link, useLoaderData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { createPlan, createSchedule } from "~/services/requests.server";
import { authenticator } from "~/services/auth.server";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  formatISO,
  isWeekend,
  parseISO,
} from "date-fns";
import { isHoliday } from "date-fns-holiday-us";
import Button from "~/components/Button";
import { formatISOWithOptions } from "date-fns/fp";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json(user._json.email);
};

export async function action({ request }) {
  const formData = await request.formData();

  const owner = formData.get("owner");
  const name = formData
    .get("name")
    .replace(/[^a-zA-Z0-9- ]/g, "")
    .trim();
  const period = formData.get("period");
  const start = formData.get("start");
  const end = formData.get("end");
  const excludeHolidays = formData.get("excludeHolidays") || false;
  const excludeWeekends = formData.get("excludeWeekends") || false;

  const formatDate = formatISOWithOptions({ representation: "date" });

  const unfilteredDates = eachDayOfInterval({
    start: parseISO(start),
    end: parseISO(end),
  });

  const holidays = excludeHolidays
    ? unfilteredDates.filter(isHoliday).map(formatDate)
    : [];

  const weekends = excludeWeekends
    ? unfilteredDates.filter(isWeekend).map(formatDate)
    : [];

  const misc = [];

  const dates = unfilteredDates
    .map(formatDate)
    .filter((date) => !holidays.includes(date))
    .filter((date) => !weekends.includes(date))
    .filter((date) => !misc.includes(date));

  const weeks = eachWeekOfInterval(
    { start: parseISO(start), end: parseISO(end) },
    { weekStartsOn: 1 }
  ).map(formatDate);

  const data = {
    owner,
    name,
    calendar: {
      period,
      start,
      end,
      exclude: {
        holidays,
        weekends,
        misc,
      },
      weeks,
      dates,
    },
  };

  const res = await createSchedule(data);

  return redirect(`/manage/schedule/${res._id}`);
}

export default function ManageCreate() {
  const data = useLoaderData();

  return (
    <section>
      <div className="mb-4">
        <h1 className="font-bold text-2xl">Create a New Schedule</h1>
        <p className="text-sm text-slate-400">
          A schedule is a defined period of time in which one or more courses
          occur.
        </p>
      </div>

      <Form method="post" className="mt-4">
        <input type="hidden" name="owner" value={data} />

        <div className="mb-2">
          <label>
            <div className="font-bold text-purple-500">Name: </div>
            <input
              name="name"
              type="text"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </div>

        <div className="mb-2">
          <label>
            <div className="font-bold text-purple-500">Time Period:</div>
            <select
              name="period"
              className="my-2 p-1 border rounded-lg border-purple-500"
            >
              <option value="">Please Select</option>
              <option value="semester">Semester</option>
              <option value="quarter">Quarter</option>
              <option value="year">Year</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="mb-2">
          <label>
            <div className="font-bold text-purple-500">Start Date: </div>
            <input
              name="start"
              type="date"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </div>

        <div className="mb-2">
          <label>
            <div className="font-bold text-purple-500">End Date: </div>
            <input
              name="end"
              type="date"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </div>

        <div className="mb-2">
          <div className="mb-1 font-bold text-purple-500">Exclude:</div>
          <div className="space-x-3">
            <label>
              <input
                type="checkbox"
                name="excludeHolidays"
                className="mr-1"
                value={true}
              />
              Holidays
            </label>
            <label>
              <input
                type="checkbox"
                name="excludeWeekends"
                className="mr-1"
                value={true}
              />
              Weekends
            </label>
          </div>
        </div>

        <div className="space-x-2 mt-4">
          <Button label="Create" type="submit" />
          <Button label="Cancel" path="/manage" />
        </div>
      </Form>
    </section>
  );
}
