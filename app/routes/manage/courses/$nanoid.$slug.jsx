import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import { authenticator } from "~/services/auth.server";
import Course from "~/services/models/Course";

export const loader = async ({ params, request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const { nanoid } = params;

  const data = await Course.findOne({ nanoid, owner }).populate("lessons");

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
    title: `${data.name} - Manage Courses - Mary Flair`,
    description: data?.objective || data.name,
  };
};

export function CatchBoundary() {
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
    <section className="">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="min-w-max mb-1 font-bold text-sm tracking-wider text-purple-500 uppercase">
            Course
          </h2>
          <h1 className="text-slate-700 font-bold text-3xl">{data.name}</h1>
        </div>
      </div>
      <Outlet context={data} />
    </section>
  );
}
