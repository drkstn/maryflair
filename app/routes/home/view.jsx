import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { getLessons } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  const owner = user._json.email;
  const data = await getLessons(owner);

  return json(data);
};

export default function HomeView() {
  const data = useLoaderData();

  return (
    <section>
      <h2 className="mt-2 text-md font-bold">Home - View</h2>
      {data.map((lesson) => (
        <div key={lesson._id}>
          <h1 className="text-xl font-bold">{lesson.title}</h1>
          <p>{lesson.description}</p>
          <hr />
        </div>
      ))}
      <Outlet />
    </section>
  );
}
