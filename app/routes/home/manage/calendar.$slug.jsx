import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { getCalendar } from "~/services/requests.server";

export const loader = async ({ params }) => {
  const { slug } = params;
  const data = await getCalendar(slug);
  return json(data);
};

export default function CalendarItem() {
  const data = useLoaderData();

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">{data.title}</h1>
    </section>
  );
}
