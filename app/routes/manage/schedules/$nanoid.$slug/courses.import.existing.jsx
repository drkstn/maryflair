import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { getISODay, parseISO } from "date-fns";
import Button from "~/components/Button";
import ValidationError from "~/components/ValidationError";
import { authenticator } from "~/services/auth.server";
import Course from "~/services/models/Course";
import Schedule from "~/services/models/Schedule";

export const loader = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const courses = await Course.find({ owner });

  return courses;
};

export const action = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  const scheduleNanoid = params.nanoid;
  const { slug } = params;
  const formData = await request.formData();

  const values = {
    owner: user._json.email,
    courseNanoid: formData.get("course"),
    frequency: formData.getAll("frequency").map((num) => parseInt(num)),
  };

  const { courseNanoid, owner, frequency } = values;

  const errors = {};

  if (!values.courseNanoid) {
    errors.courseNanoid = "Must select a course";
  }

  if (!values.frequency || values.frequency.length < 1) {
    errors.frequency = "Must select at lease one";
  }

  if (errors.courseNanoid || errors.frequency) {
    return { errors, values };
  }

  const schedule = await Schedule.findOne({ nanoid: scheduleNanoid, owner });

  const course = await Course.findOne({ nanoid: courseNanoid, owner }).select(
    "name objective notes lessons"
  );

  const courseConflict = schedule.courses.some(
    (existingCourse) => existingCourse.name === course.name
  );

  if (courseConflict) {
    errors.courseConflict =
      "A course with the same name has already been imported to this schedule. Please select a different course or create a new one with a unique name.";

    return { errors, values };
  }

  const dates = schedule.calendar.dates.filter((date) =>
    frequency.includes(getISODay(parseISO(date)))
  );

  const lessons = course.lessons.toObject().map((lesson, index) => ({
    ...lesson,
    date: dates[index],
  }));

  const courseDataToImport = {
    ...course.toObject(),
    frequency,
    dates,
    lessons,
  };

  await Schedule.updateOne(
    { nanoid: scheduleNanoid },
    { $push: { courses: courseDataToImport } }
  );

  return redirect(`/manage/schedules/${scheduleNanoid}/${slug}`);
};

export default function ImportExistingCourse() {
  const courses = useLoaderData();
  const actionData = useActionData();

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-purple-500 font-bold text-3xl">
          Import Existing Course
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Import an existing course to this schedule.
        </p>
      </div>

      <Form method="post" className="mt-6 max-w-lg">
        <div className="mb-6">
          <div className="mb-2 font-bold text-purple-500">
            Select a course to import:
          </div>
          <label>
            <select
              name="course"
              className=" p-1 border rounded-lg border-purple-500"
            >
              {courses?.length > 0 ? (
                <>
                  <option value="">Please Select</option>
                  {courses.map((course) => (
                    <option key={course.nanoid} value={course.nanoid}>
                      {course.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No courses found</option>
              )}
            </select>
          </label>
          <ValidationError error={actionData?.errors?.courseNanoid} />
        </div>

        <div className="mb-6">
          <div className="mb-2 font-bold text-purple-500">Weekly Schedule:</div>
          <div>
            <label className="inline-block mr-4">
              <input
                type="checkbox"
                name="frequency"
                className="mr-2"
                value={1}
              />
              Monday
            </label>
            <label className="inline-block mr-4">
              <input
                type="checkbox"
                name="frequency"
                className="mr-2"
                value={2}
              />
              Tuesday
            </label>
            <label className="inline-block mr-4">
              <input
                type="checkbox"
                name="frequency"
                className="mr-2"
                value={3}
              />
              Wednesday
            </label>
            <label className="inline-block mr-4">
              <input
                type="checkbox"
                name="frequency"
                className="mr-2"
                value={4}
              />
              Thursday
            </label>
            <label className="inline-block mr-4">
              <input
                type="checkbox"
                name="frequency"
                className="mr-2"
                value={5}
              />
              Friday
            </label>
            <ValidationError error={actionData?.errors?.frequency} />
          </div>
        </div>

        <div className="space-x-2 mt-4">
          <Button type="submit" label="Create" />
          <Button type="link" genre="outline" label="Cancel" to=".." />
        </div>
        <ValidationError error={actionData?.errors?.courseConflict} />
      </Form>
    </section>
  );
}
