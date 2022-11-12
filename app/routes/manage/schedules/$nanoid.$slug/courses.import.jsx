import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import ButtonOutline from "~/components/ButtonOutline";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json(user._json.email);
};

export default function ManageCreate() {
  const data = useLoaderData();

  return (
    <section>
      <div className="mb-4">
        <h1 className="text-purple-500 font-bold text-3xl">Import Course</h1>
        <p className="mt-2 text-sm text-slate-500">
          Import a new or existing course to this schedule.
        </p>
      </div>

      <Form method="post" className="mt-6">
        <input type="hidden" name="owner" value={data} />

        <div className="space-x-2 mt-4">
          <ButtonOutline label="Back" path=".." />
          <Button label="New" path="new" />
          <Button label="Existing" path="existing" />
        </div>
      </Form>
    </section>
  );
}
