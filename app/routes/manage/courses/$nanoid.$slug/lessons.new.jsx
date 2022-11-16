import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import ButtonOutline from "~/components/ButtonOutline";
import InputArray from "~/components/InputArray";
import TextAreaArray from "~/components/TextAreaArray";
import { authenticator } from "~/services/auth.server";
import { clear } from "~/services/helpers.server";
import Course from "~/services/models/Course";
import Lesson from "~/services/models/Lesson";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json(user._json.email);
};

export const action = async ({ request, params }) => {
  const { nanoid, slug } = params;

  const body = await request.formData();
  const owner = body.get("owner");
  const name = body.get("name");
  const materials = clear(body.getAll("materials"));
  const assignments = clear(body.getAll("assignments"));
  const notes = clear(body.getAll("notes"));
  const course = body.get("courseId");

  const data = {
    owner,
    name,
    materials,
    assignments,
    notes,
    course,
  };

  const newLesson = await Lesson.create(data);
  await Course.updateOne({ _id: course }, { $push: { lessons: newLesson } });

  return redirect(`/manage/courses/${nanoid}/${slug}`);
};

export default function NewLesson() {
  const data = useLoaderData();
  const context = useOutletContext();

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-purple-500 font-bold text-3xl">Add New Lesson</h1>
        <p className="mt-2 text-sm text-slate-500">
          Create and add a new lesson to this course.
        </p>
      </div>

      <Form method="post" className="mt-6 max-w-md">
        <input type="hidden" name="owner" value={data} />
        <input type="hidden" name="courseId" value={context._id} />

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

        <InputArray label="Materials" />
        <InputArray label="Assignments" />
        <TextAreaArray label="Notes" />

        <div className="space-x-2">
          <Button label="Create" type="submit" />
          <ButtonOutline label="Reset" type="reset" />
          <ButtonOutline label="Cancel" path=".." />
        </div>
      </Form>
    </section>
  );
}
