import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/Button";
import ButtonOutline from "~/components/ButtonOutline";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json(user._json.email);
};

export default function ManageCreate() {
  const data = useLoaderData();

  const [numberOfNotes, setNumberOfNotes] = useState(1);
  const noteInputs = Array(numberOfNotes).fill("note");

  const handleClick = (event) => {
    setNumberOfNotes(numberOfNotes + 1);
  };

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-purple-500 font-bold text-3xl">Add New Course</h1>
        <p className="mt-2 text-sm text-slate-500">
          Add a new course to this schedule.
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
              className="my-2 p-1 border rounded-lg border-purple-500 w-full max-w-md"
            />
          </label>
        </div>

        <div className="mb-2">
          <label>
            <div className="font-bold text-purple-500">Objective: </div>
            <textarea
              name="objective"
              type="text"
              className="my-2 p-1 border rounded-lg border-purple-500 h-20 w-full max-w-md"
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
                className="flex my-2 p-1 border rounded-lg border-purple-500 h-16 w-full max-w-md"
              />
            ))}
            <button
              type="button"
              onClick={handleClick}
              className="text-purple-500 hover:text-purple-700 min-w-max mb-2"
            >
              + Add Note
            </button>
          </label>
        </div>

        <div className="mb-3">
          <div className="mb-1 font-bold text-purple-500">
            On what days does this course recur?
          </div>
          <div>
            <label className="whitespace-nowrap mr-2">
              <input
                type="checkbox"
                name="frequency"
                className="mr-1"
                value={1}
              />
              Monday
            </label>
            <label className="whitespace-nowrap mr-2">
              <input
                type="checkbox"
                name="frequency"
                className="mr-1"
                value={2}
              />
              Tuesday
            </label>
            <label className="whitespace-nowrap mr-2">
              <input
                type="checkbox"
                name="frequency"
                className="mr-1"
                value={3}
              />
              Wednesday
            </label>
            <label className="whitespace-nowrap mr-2">
              <input
                type="checkbox"
                name="frequency"
                className="mr-1"
                value={4}
              />
              Thursday
            </label>
            <label className="whitespace-nowrap mr-2">
              <input
                type="checkbox"
                name="frequency"
                className="mr-1"
                value={5}
              />
              Friday
            </label>
          </div>
        </div>

        <div className="space-x-2 mt-4">
          <ButtonOutline label="Back" path="../course/add" />
          <Button label="Create" type="submit" />
        </div>
      </Form>
    </section>
  );
}
