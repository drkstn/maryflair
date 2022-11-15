import { getCourse } from "~/services/requests.server";
import { authenticator } from "~/services/auth.server";
import { redirect } from "@remix-run/node";

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

  return redirect(`/manage/courses/${nanoid}/${data.slug}`);
};

export const meta = ({ params }) => {
  return {
    title: "Missing Course",
    description: `There is no course with the ID of ${params.nanoid}. 😢`,
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
  return <></>;
}
