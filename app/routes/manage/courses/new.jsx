import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import TextAreaArray from "~/components/TextAreaArray";
import { authenticator } from "~/services/auth.server";
import { createCourse } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json(user._json.email);
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const owner = formData.get("owner");
  const name = formData.get("name");
  const objective = formData.get("objective");
  const notes = formData
    .getAll("notes")
    .reduce(
      (start, value) => (value.length > 0 ? [...start, value] : start),
      []
    );

  const data = {
    owner,
    name,
    ...(objective.length > 0 && { objective }),
    notes,
  };

  const res = await createCourse(data);

  return redirect(`/manage/courses/${res.nanoid}/${res.slug}`);
};

export default function CourseNew() {
  const data = useLoaderData();

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-slate-700 font-bold text-3xl">Create New Course</h1>
        <p className="mt-2 text-sm text-slate-500">
          A course is a sequential collection of lessons.
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
