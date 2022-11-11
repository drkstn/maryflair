import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json(user._json.email);
};

export default function ManageCreate() {
  const data = useLoaderData();

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-purple-500 font-bold text-3xl">Add Course</h1>
        <p className="mt-2 text-sm text-slate-400">
          Add and apply a new or existing course to this schedule.
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
          <Button label="Add" type="submit" />
          <Button label="Cancel" path=".." />
        </div>
      </Form>
    </section>
  );
}
