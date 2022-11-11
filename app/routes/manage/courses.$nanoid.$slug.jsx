import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getCourse } from "~/services/requests.server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ params, request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const { nanoid } = params;

  const data = await getCourse(nanoid, owner);

  return json(data);
};

export default function CourseById() {
  const data = useLoaderData();

  return (
    <section>
      <h2 className="min-w-max mb-1 font-bold text-sm tracking-wider text-purple-500 uppercase">
        Course
      </h2>
      <h1 className="mb-2 text-slate-700 font-bold text-3xl">{data.name}</h1>
      <Outlet context={data} />
    </section>
  );
}
