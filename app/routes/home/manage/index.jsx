import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { deleteCalendar, getCalendars } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  const owner = user._json.email;
  const data = await getCalendars(owner);

  return json(data);
};

export async function action({ request }) {
  const formData = await request.formData();

  const id = formData.get("id");
  // console.log(id);
  await deleteCalendar(id);

  return redirect("/home/manage");
}

export default function ManageIndex() {
  const data = useLoaderData();

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">Manage Lesson Plans</h1>
      {data?.length > 0 ? (
        <div className="my-4">
          {data.map((calendar) => (
            <section key={calendar._id}>
              <p className="text-purple-500 font-bold text-lg">
                <Link to={`${calendar._id}/${calendar.slug}`}>
                  {calendar.title}
                </Link>
              </p>
              <Form method="post">
                <input type="hidden" name="id" value={calendar._id} />
                <button type="submit" className="hover:text-rose-500">
                  Delete
                </button>
              </Form>
              <hr className="my-4" />
            </section>
          ))}
        </div>
      ) : (
        <p>Create a new calendar to get started.</p>
      )}
      <div className="mt-4">
        <button className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700">
          <Link to="create/calendar">Create New Calendar</Link>
        </button>
      </div>
    </section>
  );
}
