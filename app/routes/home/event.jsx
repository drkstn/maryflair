import { Form, useActionData, useLoaderData } from "@remix-run/react";
import {
  getCalendarList,
  getEventList,
  quickAddEvent,
} from "~/services/googleapi.server.js";
import Button from "~/components/Button.jsx";

// export const loader = async ({ request }) => {
//   const events = await getEventList(request);
//   const calendars = await getCalendarList(request);

//   return { events, calendars };
// };

export const action = async ({ request }) => {
  const formData = await request.formData();
  const date = formData.get("date");

  const testEvent = await quickAddEvent(request, date);

  return testEvent;
};

export default function HomeIndex() {
  const data = useLoaderData();
  const actionData = useActionData();

  console.log(data);
  actionData && console.log(actionData);

  return (
    <section>
      <h1 className="text-slate-700 font-bold text-3xl">Create Event Test</h1>
      <p className="mt-2 text-slate-700 mb-6">Create an event!</p>
      <Form method="post">
        <div className="mb-6">
          <label>
            <div className="mb-2 font-bold text-purple-500">Event Date: </div>
            <input
              name="date"
              type="date"
              className="p-1 border rounded-lg border-purple-500"
            />
          </label>
        </div>
        <Button type="submit" label="Create" />
      </Form>
    </section>
  );
}
