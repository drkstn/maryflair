import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import Lesson from "~/services/models/Lesson";
import Plan from "~/services/models/Plan";

export async function action({ request }) {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const lesson = await Lesson.findOne({ owner });

  // await Plan.updateOne({ owner }, { $push: { lessons: lesson } });

  const plan = await Plan.findOne({ owner }).populate("lessons");
  return json({ plan, lesson });
}

export default function TestPop() {
  const data = useActionData();

  if (data) {
    console.log(data);
  }

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">Test Mongoose Populating</h1>
      {data?.plan.lessons[0] ? (
        <p>{data?.plan.lessons[0].title}</p>
      ) : (
        <p>No Lessons</p>
      )}
      <Form method="post">
        <button
          type="submit"
          className="hover:bg-rose-500 bg-rose-700 py-2 px-4 rounded-full text-white"
        >
          Populate
        </button>
      </Form>
    </section>
  );
}
