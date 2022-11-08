import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { authenticator } from "~/services/auth.server";
import { createUnit, getSubjects } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  const owner = user._json.email;
  const subjects = await getSubjects(owner);

  return json({ owner, subjects });
};

export async function action({ request }) {
  const formData = await request.formData();

  const owner = formData.get("owner");
  const name = formData.get("name");
  const subject = formData.get("subject");
  const notes = formData.get("notes");

  const data = { owner, name, subject, notes: [notes] };

  await createUnit(data);

  return redirect("/manage");
}

export default function ManageCreate() {
  const data = useLoaderData();

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">Add a New Unit</h1>
      <p className="mt-2">Cras eleifend vitae metus eget egestas.</p>
      <Form method="post" className="mt-4">
        <input type="hidden" name="owner" value={data.owner} />
        <div className="mb-2">
          <label>
            <span className="font-bold text-purple-500">Name: </span>
            <br />
            <input
              name="name"
              type="text"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="subject-select">
            <span className="font-bold text-purple-500">Subject:</span>
            <br />
            <select
              name="subject"
              id="subject-select"
              className="my-2 p-1 border rounded-lg border-purple-500"
            >
              {data?.subjects?.length > 0 ? (
                <>
                  <option value="">Please Select</option>
                  {data.subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No subjects, please add</option>
              )}
            </select>
          </label>
        </div>
        <div className="mb-2">
          <label>
            <span className="font-bold text-purple-500">Notes: </span>
            <br />
            <textarea
              name="notes"
              type="text"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </div>
        <div className="space-x-2 mt-4">
          <button
            type="submit"
            className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700"
          >
            Add
          </button>
          <button
            type="button"
            className="rounded-full text-white bg-purple-500 hover:bg-purple-700"
          >
            <Link className="flex py-2 px-4" to="/home/manage">
              Cancel
            </Link>
          </button>
        </div>
      </Form>
    </section>
  );
}
