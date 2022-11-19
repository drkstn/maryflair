import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import Button from "~/components/Button";
import InputArray from "~/components/InputArray";
import TextAreaArray from "~/components/TextAreaArray";
import ValidationError from "~/components/ValidationError";
import { authenticator } from "~/services/auth.server";
import { clear } from "~/services/helpers.server";
import Course from "~/services/models/Course";

export const action = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  const { nanoid, slug } = params;

  const formData = await request.formData();

  const values = {
    owner: user._json.email,
    name: formData.get("name"),
    materials: clear(formData.getAll("materials")),
    assignments: clear(formData.getAll("assignments")),
    notes: clear(formData.getAll("notes")),
  };

  const errors = {};

  if (!values.name) {
    errors.name = "Must enter a name";
  }

  if (errors.name) {
    return { errors, values };
  }

  await Course.updateOne({ nanoid }, { $push: { lessons: values } });

  return redirect(`/manage/courses/${nanoid}/${slug}`);
};

export default function NewLesson() {
  const actionData = useActionData();
  actionData && console.log(actionData);

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-purple-500 font-bold text-3xl">Add New Lesson</h1>
        <p className="mt-2 text-sm text-slate-500">
          Create and add a new lesson to this course.
        </p>
      </div>

      <Form method="post" className="mt-6 max-w-lg">
        <div className="mb-6">
          <label>
            <div className="mb-2 font-bold text-purple-500">Name: </div>
            <input
              name="name"
              type="text"
              className="p-1 border rounded-lg border-purple-500 w-full"
            />
          </label>
          <ValidationError error={actionData?.errors?.name} />
        </div>

        <InputArray label="Materials" />
        <InputArray label="Assignments" />
        <TextAreaArray label="Notes" />

        <div className="space-x-2">
          <Button type="submit" label="Create" />
          <Button type="reset" genre="outline" label="Reset" />
          <Button type="link" genre="outline" label="Cancel" to=".." />
        </div>
      </Form>
    </section>
  );
}
