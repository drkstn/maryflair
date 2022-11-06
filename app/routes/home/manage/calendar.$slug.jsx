import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { isSameWeek, parseISO } from "date-fns";
import { format } from "date-fns/fp";
import { authenticator } from "~/services/auth.server";
import { getCalendar } from "~/services/requests.server";

export const loader = async ({ params }) => {
  const { slug } = params;
  const data = await getCalendar(slug);
  return json(data);
};

export default function CalendarItem() {
  const data = useLoaderData();
  const formatDate = format("EEEE, MMMM d, y");

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">{data.title}</h1>
      {data.weeks.map((week, index) => (
        <div key={index} className="mb-4">
          <h1 className="font-bold text-lg">
            Week {index + 1} - {formatDate(parseISO(week))}
          </h1>
          {data.days
            .filter((day) => isSameWeek(parseISO(week), parseISO(day)))
            .map((day) => (
              <p key={day}>{formatDate(parseISO(day))}</p>
            ))}
          <p></p>
        </div>
      ))}
    </section>
  );
}
