import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/Button";
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

  return redirect(`/manage/course/${res._id}`);
};

export default function CourseNew() {
  const data = useLoaderData();

  const [noteCounter, setNoteCounter] = useState(1);
  const numOfNotes = Array(noteCounter).fill();

  const handleClick = (event) => {
    setNoteCounter(noteCounter + 1);
  };

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-slate-700 font-bold text-3xl">Create New Course</h1>
        <p className="mt-2 text-sm text-slate-500">
          A course is a sequential collection of lessons.
        </p>
      </div>

      <Form method="post">
        <input type="hidden" name="owner" value={data} />

        <div className="mb-6">
          <label>
            <div className="mb-2 font-bold text-purple-500">Name: </div>
            <input
              name="name"
              type="text"
              className="p-1 border rounded-lg border-purple-500 w-full max-w-md"
            />
          </label>
        </div>

        <div className="mb-6">
          <label>
            <div className="mb-2 font-bold text-purple-500">Objective: </div>
            <textarea
              name="objective"
              type="text"
              className="p-1 border rounded-lg border-purple-500 h-20 w-full max-w-md"
            />
          </label>
        </div>

        <div className="mb-6">
          <label>
            <div className="mb-2 font-bold text-purple-500 ">Notes: </div>
            <div className="mb-2 p-4 border rounded-lg border-purple-500 max-w-md space-y-4">
              {numOfNotes.map((value, index) => (
                <textarea
                  key={index}
                  name="notes"
                  type="text"
                  className="flex p-1 border rounded-md border-purple-200 w-full h-16"
                />
              ))}
            </div>
            <div className="flex justify-end max-w-md">
              <button
                type="button"
                onClick={handleClick}
                className="text-purple-500 hover:text-purple-700 min-w-max text-sm font-bold"
              >
                + Add Note
              </button>
            </div>
          </label>
        </div>

        <div className="space-x-2 mt-4">
          <Button label="Create" type="submit" />
          <Button label="Cancel" path=".." />
        </div>
      </Form>
    </section>
  );
}
