import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import {
  deletePlan,
  getPlans,
  getUnits,
  getSubjects,
} from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const plans = await getPlans(owner);
  const subjects = await getSubjects(owner);
  const units = await getUnits(owner);

  return json({ plans, subjects, units });
};

export async function action({ request }) {
  const formData = await request.formData();
  const id = formData.get("id");

  await deletePlan(id);

  return redirect("/manage");
}

export default function ManageIndex() {
  const data = useLoaderData();

  return (
    <section>
      <div>
        <h1 className="mb-2 font-bold text-2xl flex justify-between items-end">
          <p>Lesson Plans</p>
          <button
            type="button"
            className="mt-2 rounded-full font-normal text-base text-white bg-purple-500 hover:bg-purple-700"
          >
            <Link className="flex py-1 px-4" to="new/lesson-plan">
              Add Plan
            </Link>
          </button>
        </h1>
        {data?.plans?.length > 0 ? (
          <div className="my-2">
            {data.plans.map((plan) => (
              <section className="mb-2" key={plan._id}>
                <p className="text-purple-500 font-bold text-lg">
                  <Link to={`plan/${plan._id}`}>{plan.name}</Link>
                </p>
                <Form method="post">
                  <input type="hidden" name="id" value={plan._id} />
                  <button type="submit" className="hover:text-rose-500">
                    Delete
                  </button>
                </Form>
              </section>
            ))}
          </div>
        ) : (
          <p>Create a new lesson plan to get started.</p>
        )}
        <hr className="my-6" />
      </div>
      <div>
        <h1 className="mb-2 font-bold text-2xl flex justify-between items-end">
          <p>Subjects</p>
          <button
            type="button"
            className="mt-2 rounded-full font-normal text-base text-white bg-purple-500 hover:bg-purple-700"
          >
            <Link className="flex py-1 px-4" to="new/subject">
              Add Subject
            </Link>
          </button>
        </h1>
        {data?.subjects?.length > 0 ? (
          <ul className="my-2">
            {data.subjects.map((subject) => (
              <li key={subject._id}>
                <span className=" text-purple-500 font-bold">
                  {subject.name}
                </span>
                <ul>
                  {data.units.map((unit) =>
                    subject._id === unit.subject ? (
                      <li key={unit._id} className="ml-4">
                        <span className=" text-purple-300 font-bold">- </span>
                        {unit.name}
                      </li>
                    ) : null
                  )}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>You currently have no subjects.</p>
        )}
        <hr className="my-6" />
      </div>
      <div>
        <h1 className="mb-2 font-bold text-2xl flex justify-between items-end">
          <p>Units</p>
          <button
            type="button"
            className="mt-2 rounded-full font-normal text-base text-white bg-purple-500 hover:bg-purple-700"
          >
            <Link className="flex py-1 px-4" to="new/unit">
              Add Unit
            </Link>
          </button>
        </h1>
        {data?.units?.length > 0 ? (
          <ul className="my-2">
            {data.units.map((unit) => (
              <li key={unit._id}>
                <span className=" text-purple-300 font-bold">- </span>
                {unit.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>You currently have no units.</p>
        )}
        <hr className="my-6" />
      </div>
    </section>
  );
}
