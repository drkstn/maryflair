import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { isSameWeek, parseISO } from "date-fns";
import { format } from "date-fns/fp";
import { authenticator } from "~/services/auth.server";
import { getCalendars } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  const owner = user._json.email;
  const data = await getCalendars(owner);

  return json(data);
};

export default function ManageIndex() {
  const data = useLoaderData();
  const formatDate = format("EEEE, MMMM d, y");

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">Manage Lesson Plans</h1>
      {data?.length > 0 ? (
        <div>
          {data.map((calendar) => (
            <section key={calendar._id}>
              <p className="text-purple-500 font-bold mt-4 mb-2">
                <Link to={`calendar/${calendar.slug}`}>{calendar.title}</Link>
              </p>
              {calendar.weeks.map((week, index) => (
                <div key={index} className="mb-4">
                  <h1 className="font-bold text-lg">
                    Week {index + 1} - {formatDate(parseISO(week))}
                  </h1>
                  {calendar.days
                    .filter((day) => isSameWeek(parseISO(week), parseISO(day)))
                    .map((day) => (
                      <p key={day}>{formatDate(parseISO(day))}</p>
                    ))}
                  <p></p>
                </div>
              ))}
              <hr className="my-4" />
            </section>
          ))}
        </div>
      ) : (
        <p>Create a new calendar to get started.</p>
      )}
      <div className="mt-4">
        <Link
          to="create/calendar"
          className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700"
        >
          Create New Calendar
        </Link>
      </div>
    </section>
  );
}
