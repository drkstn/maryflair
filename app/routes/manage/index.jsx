import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import { authenticator } from "~/services/auth.server";
import {
  deleteSchedule,
  getSchedules,
  getUnits,
  getSubjects,
} from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const schedules = await getSchedules(owner);
  const subjects = await getSubjects(owner);
  const units = await getUnits(owner);

  return json({ schedules, subjects, units });
};

export async function action({ request }) {
  const formData = await request.formData();
  const id = formData.get("id");

  await deleteSchedule(id);

  return redirect("/manage");
}

export default function ManageIndex() {
  const data = useLoaderData();

  return (
    <section>
      <div>
        <div className="mb-2 flex justify-between items-start space-x-4">
          <div>
            <h1 className="text-slate-700 font-bold text-3xl">Schedules</h1>
            <p className="mt-2 text-sm text-slate-400">
              A schedule is a defined period of time in which one or more
              courses occur.
            </p>
          </div>
          <Button label="New Schedule" path="schedule/new" />
        </div>
        {data?.schedules?.length > 0 ? (
          <div>
            {data.schedules.map((schedule) => (
              <section className="mb-2" key={schedule._id}>
                <Form method="post">
                  <input type="hidden" name="id" value={schedule._id} />
                  <p className="text-purple-500 hover:text-purple-700 font-bold text-lg space-x-2">
                    <Link to={`schedule/${schedule._id}`}>{schedule.name}</Link>
                    <button
                      type="submit"
                      className="px-2 rounded-full text-sm border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </p>
                </Form>
              </section>
            ))}
          </div>
        ) : (
          <p>Create a new schedule to get started.</p>
        )}
        <hr className="my-6" />
      </div>
      <div>
        <div className="mb-2 flex justify-between items-start space-x-4">
          <div>
            <h1 className="text-slate-700 font-bold text-3xl">Courses</h1>
            <p className="mt-2 text-sm text-slate-400">
              A course is a sequential collection of lessons.
            </p>
          </div>
          <Button label="New Course" path="course/new" />
        </div>
        {data?.subjects?.length > 0 ? (
          <ul className="my-2">
            {data.subjects.map((subject) => (
              <li key={subject._id}>
                <span className=" text-purple-500 font-bold">
                  {subject.name}
                </span>
                <ul>
                  {data.units.map((unit) =>
                    subject._id === unit.subject ? (
                      <li key={unit._id} className="ml-4">
                        <span className=" text-purple-300 font-bold">- </span>
                        {unit.name}
                      </li>
                    ) : null
                  )}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>You currently have no courses.</p>
        )}
        <hr className="my-6" />
      </div>
    </section>
  );
}
