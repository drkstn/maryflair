import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { authenticator } from "~/services/auth.server";
import { createSubject } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json(user._json.email);
};

export async function action({ request }) {
  const formData = await request.formData();

  const owner = formData.get("owner");
  const name = formData.get("name");
  const notes = formData.get("notes") ? [formData.get("notes")] : [];

  const data = { owner, name, notes };

  await createSubject(data);

  return redirect("/manage");
}

export default function ManageCreate() {
  const data = useLoaderData();

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">Add a New Subject</h1>
      <p className="mt-2">Cras eleifend vitae metus eget egestas.</p>
      <Form method="post" className="mt-4">
        <input type="hidden" name="owner" value={data} />
        <div className="mb-2">
          <label>
            <span className="font-bold text-purple-500">Subject Name: </span>
            <br />
            <input
              name="name"
              type="text"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
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
