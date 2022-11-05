import { json, redirect } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { deleteLesson, getLessons } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  const owner = user._json.email;
  const data = await getLessons(owner);

  return json(data);
};

export async function action({ request }) {
  const formData = await request.formData();

  const id = formData.get("id");
  // console.log(id);
  await deleteLesson(id);

  return redirect("/home/view");
}

export default function HomeView() {
  const data = useLoaderData();

  return (
    <section>
      <h2 className="mt-2 text-md font-bold">Home - View</h2>
      {data.map((lesson) => (
        <div key={lesson._id}>
          <h1 className="text-xl font-bold">{lesson.title}</h1>
          <p>{lesson.description}</p>
          <Form method="post">
            <input type="hidden" name="id" value={lesson._id} />
            <button type="submit" className="text-purple-500">
              Delete
            </button>
          </Form>
          <hr />
        </div>
      ))}
      <Outlet />
    </section>
  );
}
