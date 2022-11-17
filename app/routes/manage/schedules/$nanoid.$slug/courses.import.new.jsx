import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import TextAreaArray from "~/components/TextAreaArray";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json(user._json.email);
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const values = {
    owner: formData.get("owner"),
    nanoid: formData.get("course"),
    frequency: formData.getAll("frequency").map((num) => parseInt(num)),
  };

  return values;
};

export default function ImportNewCourse() {
  const data = useLoaderData();

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-purple-500 font-bold text-3xl">
          Import New Course
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Import a new course to this schedule.
        </p>
      </div>

      <Form method="post" className="mt-6 max-w-lg">
        <input type="hidden" name="owner" value={data} />

        <div className="mb-6">
          <label>
            <div className="mb-2 font-bold text-purple-500">Name: </div>
            <input
              name="name"
              type="text"
              className="p-1 border rounded-lg border-purple-500 w-full"
            />
          </label>
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
          </div>
        </div>

        <div className="mb-6">
          <label>
            <div className="mb-2 font-bold text-purple-500">Objective: </div>
            <textarea
              name="objective"
              type="text"
              rows={3}
              className="p-1 border rounded-lg border-purple-500 w-full"
            />
          </label>
        </div>

        <div className="mb-6">
          <TextAreaArray label="Notes" />
        </div>

        <div className="space-x-2 mt-4">
          <Button type="submit" label="Create" />
          <Button type="link" genre="outline" label="Cancel" to=".." />
        </div>
      </Form>
    </section>
  );
}
