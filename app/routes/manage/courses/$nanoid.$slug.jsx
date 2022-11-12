import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData, useParams } from "@remix-run/react";
import { getCourse } from "~/services/requests.server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ params, request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const { nanoid } = params;

  const data = await getCourse(nanoid, owner);

  if (!data) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  if (params.slug !== data?.slug) {
    return redirect(`../${nanoid}/${data.slug}`);
  }

  return json(data);
};

export const meta = ({ data, params }) => {
  if (!data) {
    return {
      title: "Missing Course",
      description: `There is no course with the ID of ${params.nanoid}. 😢`,
    };
  }

  return {
    title: `Mary Flair • Manage Course • ${data.name}`,
    description: data?.objective || data.name,
  };
};

export function CatchBoundary() {
  const params = useParams();
  return (
    <section>
      <h2 className="min-w-max mb-1 font-bold text-sm tracking-wider text-purple-500 uppercase">
        404 Not Found
      </h2>
      <h1 className="mb-2 text-slate-700 font-bold text-3xl">
        We couldn't find that course...
      </h1>
    </section>
  );
}

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
