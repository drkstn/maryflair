import { Form, Link, useLoaderData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { createCalendar } from "~/services/requests.server";
import { authenticator } from "~/services/auth.server";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  formatISO,
  isWeekend,
  parseISO,
} from "date-fns";
import { isHoliday } from "date-fns-holiday-us";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json(user._json.email);
};

export async function action({ request }) {
  const formData = await request.formData();

  const owner = formData.get("owner");
  const title = formData
    .get("title")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim();
  const slug = title.replace(/\s+/g, "-").toLowerCase();
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const blockOutHolidays = formData.get("blockOutHolidays") || false;
  const blockOutWeekends = formData.get("blockOutWeekends") || false;

  const unfilteredDates = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  const blockOutDates = [];

  const days = unfilteredDates
    .filter((date) => (blockOutHolidays ? !isHoliday(date) : date))
    .filter((date) => (blockOutWeekends ? !isWeekend(date) : date))
    .filter(
      (date) =>
        !blockOutDates.includes(formatISO(date, { representation: "date" }))
    )
    .map((date) => formatISO(date, { representation: "date" }));

  const unfilteredWeeks = eachWeekOfInterval(
    {
      start: parseISO(startDate),
      end: parseISO(endDate),
    },
    { weekStartsOn: 1 }
  );

  const weeks = unfilteredWeeks.map((date) =>
    formatISO(date, { representation: "date" })
  );

  const data = {
    owner,
    title,
    slug,
    startDate,
    endDate,
    blockOut: {
      holidays: blockOutHolidays,
      weekends: blockOutWeekends,
      dates: blockOutDates,
    },
    days,
    weeks,
  };
  const res = await createCalendar(data);

  return redirect(`/home/manage/${res._id}/${res.slug}`);
}

export default function HomeCreate() {
  const data = useLoaderData();

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">Create a New Calendar</h1>
      <p className="mt-2">Cras eleifend vitae metus eget egestas.</p>
      <Form method="post" className="mt-4">
        <input type="hidden" name="owner" value={data} />
        <div className="mb-2">
          <label>
            <span className="font-bold text-purple-500">Title: </span>
            <br />
            <input
              name="title"
              type="text"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </div>
        <div className="mb-2">
          <label>
            <span className="font-bold text-purple-500">Start Date: </span>
            <br />
            <input
              name="startDate"
              type="date"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </div>
        <div className="mb-2">
          <label>
            <span className="font-bold text-purple-500">End Date: </span>
            <br />
            <input
              name="endDate"
              type="date"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </div>
        <div>
          <div className="font-bold text-purple-500">Block Out:</div>
          <div className=" space-x-2">
            <input
              type="checkbox"
              id="holidays"
              name="blockOutHolidays"
              value={true}
            />
            <label htmlFor="holidays">Holidays</label>
            <input
              type="checkbox"
              id="weekends"
              name="blockOutWeekends"
              value={true}
            />
            <label htmlFor="weekends">Weekends</label>
          </div>
        </div>

        <div className="space-x-2 mt-4">
          <button
            type="submit"
            className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700"
          >
            Create
          </button>
          <Link
            to="/home/manage"
            className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700"
          >
            Cancel
          </Link>
        </div>
        <input type="hidden" name="owner" value={data} />
      </Form>
    </section>
  );
}
