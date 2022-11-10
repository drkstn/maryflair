import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { isSameWeek, parseISO } from "date-fns";
import { format } from "date-fns/fp";
import { getPlan } from "~/services/requests.server";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ params, request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const { id } = params;

  const data = await getPlan(id, owner);

  return json(data);
};

export default function LessonPlan() {
  const data = useLoaderData();
  const formatDate = format("EEEE, MMMM d, y");

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">{data.name}</h1>
      {data.calendar.weeks.map((week, index) => (
        <div key={index} className="mb-4">
          <h1 className="font-bold text-lg">
            Week {index + 1} - {formatDate(parseISO(week))}
          </h1>
          {data.calendar.dates
            .filter((date) => isSameWeek(parseISO(week), parseISO(date)))
            .map((date) => (
              <p key={date}>{formatDate(parseISO(date))}</p>
            ))}
          <p></p>
        </div>
      ))}
    </section>
  );
}
