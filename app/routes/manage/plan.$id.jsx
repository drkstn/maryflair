import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPlan } from "~/services/requests.server";
import { authenticator } from "~/services/auth.server";
import LessonPlanList from "~/components/LessonPlanList";

export const loader = async ({ params, request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const { id } = params;

  const data = await getPlan(id, owner);

  return json(data);
};

export default function LessonPlan() {
  const data = useLoaderData();
  const { weeks, dates } = data.calendar;

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">{data.name}</h1>
      <LessonPlanList weeks={weeks} dates={dates} />
    </section>
  );
}
