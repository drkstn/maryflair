import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import ButtonOutline from "~/components/ButtonOutline";
import { authenticator } from "~/services/auth.server";
import Course from "~/services/models/Course";
import { getCourses } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  const owner = user._json.email;
  const data = await getCourses(owner);

  return json({ owner, data });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const nanoid = formData.get("course");
  const owner = formData.get("owner");

  const res = await Course.findOne({ nanoid, owner }).populate("lessons");

  return { res };
};

export default function ManageCreate() {
  const { owner, data } = useLoaderData();
  const actionResponse = useActionData();
  // console.log(data, owner);
  // console.log(actionResponse);

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

      <Form method="post" className="mt-6">
        <input type="hidden" name="owner" value={owner} />

        <div className="mb-6">
          <div className="mb-2 font-bold text-purple-500">
            Select a course to import:
          </div>
          <label>
            <select
              name="course"
              className=" p-1 border rounded-lg border-purple-500"
            >
              {data?.length > 0 ? (
                <>
                  <option value="">Please Select</option>
                  {data.map((course) => (
                    <option key={course._id} value={course.nanoid}>
                      {course.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No courses found</option>
              )}
            </select>
          </label>
        </div>

        <div className="mb-6">
          <div className="mb-2 font-bold text-purple-500">Weekly Schedule:</div>
          <div>
            <label className="whitespace-nowrap mr-4">
              <input
                type="checkbox"
                name="frequency"
                className="mr-2"
                value={1}
              />
              Monday
            </label>
            <label className="whitespace-nowrap mr-4">
              <input
                type="checkbox"
                name="frequency"
                className="mr-2"
                value={2}
              />
              Tuesday
            </label>
            <label className="whitespace-nowrap mr-4">
              <input
                type="checkbox"
                name="frequency"
                className="mr-2"
                value={3}
              />
              Wednesday
            </label>
            <label className="whitespace-nowrap mr-4">
              <input
                type="checkbox"
                name="frequency"
                className="mr-2"
                value={4}
              />
              Thursday
            </label>
            <label className="whitespace-nowrap mr-4">
              <input
                type="checkbox"
                name="frequency"
                className="mr-2"
                value={5}
              />
              Friday
            </label>
          </div>
        </div>

        <div className="space-x-2 mt-4">
          <ButtonOutline label="Back" path="../courses/import" />
          <Button label="Create" type="submit" />
        </div>
      </Form>
    </section>
  );
}
