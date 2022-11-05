import { Form, Link, useLoaderData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { createLesson } from "~/services/requests.server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json(user._json.email);
};

export async function action({ request }) {
  const formData = await request.formData();

  const title = formData.get("title");
  const description = formData.get("description");
  const owner = formData.get("owner");
  const tags = formData.get("tags").split(", ");

  const data = { title, description, tags, owner };

  await createLesson(data);

  return redirect("/home/view");
}

export default function HomeCreate() {
  const data = useLoaderData();

  return (
    <section>
      <h1 className="mt-2 text-xl font-bold">Create a New Lesson</h1>
      <p className="mt-2">Cras eleifend vitae metus eget egestas.</p>
      <Form method="post" className="mt-4">
        <p>
          <label>
            Title:
            <br />
            <input
              name="title"
              type="text"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </p>
        <p>
          <label>
            Description:
            <br />
            <textarea
              name="description"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </p>
        <p>
          <label>
            Tags:
            <br />
            <input
              name="tags"
              type="text"
              className="my-2 p-1 border rounded-lg border-purple-500"
            />
          </label>
        </p>
        <p>
          <button
            type="submit"
            className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700"
          >
            Create
          </button>
          <Link
            to="/home/view"
            className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700"
          >
            Cancel
          </Link>
        </p>
        <input type="hidden" name="owner" value={data} />
      </Form>
    </section>
  );
}
