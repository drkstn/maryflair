import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CourseLinkList from "~/components/CourseLinkList";
import ScheduleLinkList from "~/components/ScheduleLinkList";
import { authenticator } from "~/services/auth.server";
import Course from "~/services/models/Course";
import Schedule from "~/services/models/Schedule";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const schedules = await Schedule.find({ owner });
  const courses = await Course.find({ owner });

  return json({ schedules, courses });
};

export async function action({ request }) {
  const formData = await request.formData();
  const _id = formData.get("id");
  const action = formData.get("action");

  switch (action) {
    case "deleteSchedule":
      return await Schedule.deleteOne({ _id });
    case "deleteCourse":
      return await Course.deleteOne({ _id });
    default:
      throw new Error("Unknown action");
  }
}

export default function ManageIndex() {
  const data = useLoaderData();
  const { schedules, courses } = data;

  return (
    <section>
      <ScheduleLinkList schedules={schedules} />
      <CourseLinkList courses={courses} />
    </section>
  );
}
