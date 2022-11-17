import { Form, Link, useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import ScheduleList from "~/components/ScheduleList";
import Schedule from "~/services/models/Schedule";

export async function action({ request, params }) {
  const scheduleNanoid = params.nanoid;
  const formData = await request.formData();
  const courseId = formData.get("courseId");
  const action = formData.get("action");

  switch (action) {
    case "remove":
      return await Schedule.updateOne(
        { nanoid: scheduleNanoid },
        { $pull: { courses: { _id: courseId } } }
      );
    default:
      throw new Error("Unknown action");
  }
}

export default function ScheduleByIdIndex() {
  const schedule = useOutletContext();

  return (
    <>
      <div className="mt-4">
        <Button type="link" label="Import Course" to="courses/import" />
      </div>
      <hr className="my-6" />
      <section className="mb-6">
        <h2 className="font-bold text-2xl text-slate-700 mb-2">Course List</h2>
        {schedule?.courses?.length > 0 ? (
          <div>
            {schedule.courses.map((course) => (
              <section className="mb-2" key={course._id}>
                <Form
                  method="post"
                  onSubmit={(e) => {
                    if (!confirm("Are you sure?")) {
                      e.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="courseId" value={course._id} />
                  <input type="hidden" name="owner" value={schedule.owner} />
                  <p className="text-purple-500 hover:text-purple-700 font-bold text-lg space-x-2">
                    <Link
                      to={`/manage/schedules/${schedule.nanoid}/${schedule.slug}`}
                    >
                      {course.name}
                    </Link>
                    <Button
                      type="submit"
                      genre="sm-outline-warning"
                      label="Remove"
                      name="action"
                      value="remove"
                    />
                  </p>
                </Form>
              </section>
            ))}
          </div>
        ) : (
          <p>You currently do not have any courses.</p>
        )}
        <hr className="my-6" />
      </section>
      <section className="mb-6">
        <h2 className="font-bold text-2xl text-slate-700 mb-6">Schedule</h2>
        <ScheduleList data={schedule} />
      </section>
    </>
  );
}
