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

  const [numberOfNotes, setNumberOfNotes] = useState(1);
  const noteInputs = Array(numberOfNotes).fill("note");

  const handleClick = (event) => {
    setNumberOfNotes(numberOfNotes + 1);
  };

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-slate-700 font-bold text-3xl">Create New Course</h1>
        <p className="mt-2 text-sm text-slate-500">
          A course is a sequential collection of lessons.
        </p>
      </div>

      <Form method="post" className="mt-4">
        <input type="hidden" name="owner" value={data} />

        <div className="mb-2">
          <label>
            <div className="font-bold text-purple-500">Name: </div>
            <input
              name="name"
              type="text"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </div>

        <div className="mb-2">
          <label>
            <div className="font-bold text-purple-500">Objective: </div>
            <textarea
              name="objective"
              type="text"
              className="my-2 p-1 border rounded-lg border-purple-500 h-24"
            />
          </label>
        </div>

        <div className="mb-2">
          <label>
            <div className="font-bold text-purple-500">Notes: </div>
            {noteInputs.map((value, index) => (
              <textarea
                key={index}
                name="notes"
                type="text"
                className="flex my-2 p-1 border rounded-lg border-purple-500 h-24"
              />
            ))}
            <button
              type="button"
              onClick={handleClick}
              className="text-purple-500 hover:text-purple-700 min-w-max"
            >
              + Add Note
            </button>
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
