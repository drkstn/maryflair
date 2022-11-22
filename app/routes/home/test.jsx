import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { Link } from "react-router-dom";
import Button from "~/components/Button";
import { authenticator } from "~/services/auth.server";
import Schedule from "~/services/models/Schedule";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const schedules = await Schedule.find({ owner });

  return schedules;
};

export const action = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const formData = await request.formData();
  const nanoid = formData.get("course");

  if (!nanoid) {
    return "Please select a schedule";
  }
  const schedule = await Schedule.findOne({ nanoid, owner });

  return schedule;
};

export default function HomeTest() {
  const schedules = useLoaderData();

  // console.log(schedules);
  const actionData = useActionData();
  actionData && console.log(actionData);

  const submit = useSubmit();

  function handleChange(event) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <section>
      <h1 className="text-slate-700 font-bold text-3xl">Today's Lesson Plan</h1>
      <p className="mt-2 text-slate-700 mb-6">
        Yay! No lessons scheduled. <b>Enjoy.</b>
      </p>

      <p>
        Your selected schedule:{" "}
        {actionData ? actionData.name : schedules[0].name}
      </p>

      <Form method="post" onChange={handleChange}>
        <div className="mb-6">
          <div className="mb-2 font-bold text-purple-500">
            Select a schedule to view:
          </div>
          <label>
            <select
              name="course"
              className=" p-1 border rounded-lg border-purple-500"
            >
              {schedules?.length > 0 ? (
                <>
                  {/* <option value="">Please Select</option> */}
                  {schedules.map((schedule) => (
                    <option key={schedule.nanoid} value={schedule.nanoid}>
                      {schedule.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No schedules found</option>
              )}
            </select>
          </label>
        </div>
      </Form>

      <Link to="/home/event" className=" text-purple-500 underline">
        Create Test Event
      </Link>
    </section>
  );
}
