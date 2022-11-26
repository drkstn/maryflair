import { Form, Link } from "@remix-run/react";
import Button from "./Button";

export default function CourseLinkList({ courses }) {
  const handleSubmit = (e) => {
    if (!confirm("Are you sure?")) {
      e.preventDefault();
    }
  };

  return (
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
      {courses?.length > 0 ? (
        <div>
          {courses.map((course) => (
            <section className="mb-2" key={course.nanoid}>
              <Form method="post" onSubmit={handleSubmit}>
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
  );
}
