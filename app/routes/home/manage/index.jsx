import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { deletePlan, getPlans } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;

  const data = await getPlans(owner);

  return json(data);
};

export async function action({ request }) {
  const formData = await request.formData();
  const id = formData.get("id");

  await deletePlan(id);

  return redirect("/home/manage");
}

export default function ManageIndex() {
  const data = useLoaderData();

  return (
    <section>
      <h1 className="mb-2 font-bold text-3xl">Manage Lesson Plans</h1>
      {data?.length > 0 ? (
        <div className="my-4">
          {data.map((plan) => (
            <section key={plan._id}>
              <p className="text-purple-500 font-bold text-lg">
                <Link to={`${plan._id}/${plan.slug}`}>{plan.title}</Link>
              </p>
              <Form method="post">
                <input type="hidden" name="id" value={plan._id} />
                <button type="submit" className="hover:text-rose-500">
                  Delete
                </button>
              </Form>
              <hr className="my-4" />
            </section>
          ))}
        </div>
      ) : (
        <p>Create a new lesson plan to get started.</p>
      )}
      <div className="mt-4">
        <button className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700">
          <Link to="create">Create New Lesson Plan</Link>
        </button>
      </div>
    </section>
  );
}
