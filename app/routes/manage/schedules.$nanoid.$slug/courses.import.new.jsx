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

  const [noteCounter, setNoteCounter] = useState(1);
  const numOfNotes = Array(noteCounter).fill();

  const handleClick = (event) => {
    setNoteCounter(noteCounter + 1);
  };

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

      <Form method="post" className="mt-6">
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
          <ButtonOutline label="Back" path="../courses/import" />
          <Button label="Create" type="submit" />
        </div>
      </Form>
    </section>
  );
}
