import { Form, Link } from "@remix-run/react";
import Button from "./Button";

export default function ScheduleLinkList({ schedules }) {
  const handleSubmit = (e) => {
    if (!confirm("Are you sure?")) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div className="mb-2 flex justify-between items-start space-x-4">
        <div>
          <h1 className="text-slate-700 font-bold text-3xl">Schedules</h1>
          <p className="mt-2 text-sm text-slate-500">
            A schedule is a defined period of time in which one or more courses
            occur.
          </p>
        </div>
        <Button type="link" label="New Schedule" to="schedules/new" />
      </div>
      {schedules?.length > 0 ? (
        <div>
          {schedules.map((schedule) => (
            <section className="mb-2" key={schedule.nanoid}>
              <Form method="post" onSubmit={handleSubmit}>
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
  );
}
