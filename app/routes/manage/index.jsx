import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import { authenticator } from "~/services/auth.server";
import {
  deleteCourse,
  deleteSchedule,
  getCourses,
  getSchedules,
} from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const schedules = await getSchedules(owner);
  const courses = await getCourses(owner);

  return json({ schedules, courses });
};

export async function action({ request }) {
  const formData = await request.formData();
  const id = formData.get("id");
  const intent = formData.get("intent");

  switch (intent) {
    case "deleteSchedule":
      await deleteSchedule(id);
      break;
    case "deleteCourse":
      await deleteCourse(id);
      break;
    default:
      console.log(`Sorry, can't find ${intent}.`);
  }

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
            <p className="mt-2 text-sm text-slate-500">
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
                      name="intent"
                      value="deleteSchedule"
                      className="px-2 rounded-full text-sm font-normal border border-slate-500 text-slate-500 hover:bg-slate-500 hover:text-white"
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
            <p className="mt-2 text-sm text-slate-500">
              A course is a sequential collection of lessons.
            </p>
          </div>
          <Button label="New Course" path="course/new" />
        </div>
        {data?.courses?.length > 0 ? (
          <div>
            {data.courses.map((course) => (
              <section className="mb-2" key={course._id}>
                <Form method="post">
                  <input type="hidden" name="id" value={course._id} />
                  <p className="text-purple-500 hover:text-purple-700 font-bold text-lg space-x-2">
                    <Link to={`course/${course._id}`}>{course.name}</Link>
                    <button
                      type="submit"
                      name="intent"
                      value="deleteCourse"
                      className="px-2 rounded-full text-sm font-normal border border-slate-500 text-slate-500 hover:bg-slate-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </p>
                </Form>
              </section>
            ))}
          </div>
        ) : (
          <p>You currently do not have any courses.</p>
        )}
        <hr className="my-6" />
      </div>
    </section>
  );
}
