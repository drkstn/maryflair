import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import { authenticator } from "~/services/auth.server";
import Course from "~/services/models/Course";
import Schedule from "~/services/models/Schedule";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const schedules = await Schedule.find({ owner });
  const courses = await Course.find({ owner });

  return json({ schedules, courses });
};

export async function action({ request }) {
  const formData = await request.formData();
  const _id = formData.get("id");
  const action = formData.get("action");

  switch (action) {
    case "deleteSchedule":
      return await Schedule.deleteOne({ _id });
    case "deleteCourse":
      return await Course.deleteOne({ _id });
    default:
      throw new Error("Unknown action");
  }
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
          <Button type="link" label="New Schedule" to="schedules/new" />
        </div>
        {data?.schedules?.length > 0 ? (
          <div>
            {data.schedules.map((schedule) => (
              <section className="mb-2" key={schedule.nanoid}>
                <Form
                  method="post"
                  onSubmit={(event) => {
                    if (!confirm("Are you sure?")) {
                      event.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="id" value={schedule._id} />
                  <div className="text-purple-500 hover:text-purple-700 font-bold text-lg space-x-2 group flex">
                    <Link to={`schedules/${schedule.nanoid}/${schedule.slug}`}>
                      {schedule.name}
                    </Link>
                    <div className="hidden group-hover:block group-focus:block group-focus-within:block">
                      <Button
                        type="submit"
                        genre="sm-outline-warning"
                        label="Delete"
                        name="action"
                        value="deleteSchedule"
                      />
                    </div>
                  </div>
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
          <Button type="link" label="New Course" to="courses/new" />
        </div>
        {data?.courses?.length > 0 ? (
          <div>
            {data.courses.map((course) => (
              <section className="mb-2" key={course.nanoid}>
                <Form
                  method="post"
                  onSubmit={(event) => {
                    if (!confirm("Are you sure?")) {
                      event.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="id" value={course._id} />
                  <div className="text-purple-500 hover:text-purple-700 font-bold text-lg space-x-2 group flex">
                    <Link to={`courses/${course.nanoid}/${course.slug}`}>
                      {course.name}
                    </Link>
                    <div className="hidden group-hover:block group-focus:block group-focus-within:block">
                      <Button
                        type="submit"
                        genre="sm-outline-warning"
                        label="Delete"
                        name="action"
                        value="deleteCourse"
                      />
                    </div>
                  </div>
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
