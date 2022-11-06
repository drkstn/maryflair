import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export async function action({ request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  console.log(intent);

  return json({ message: `You pressed ${intent.toUpperCase()}` });
}

export default function Test() {
  const data = useActionData();

  return (
    <section>
      <p className="mb-4">{data ? data.message : "Press a button"}</p>
      <Form method="post" className="space-x-2">
        <button
          className="py-2 px-4 bg-purple-500 hover:bg-purple-700 text-white rounded-full"
          type="submit"
          name="intent"
          value="create"
        >
          Create
        </button>
        <button
          className="py-2 px-4 bg-purple-500 hover:bg-purple-700 text-white rounded-full"
          type="submit"
          name="intent"
          value="update"
        >
          Update
        </button>
        <button
          className="py-2 px-4 bg-purple-500 hover:bg-purple-700 text-white rounded-full"
          type="submit"
          name="intent"
          value="delete"
        >
          Delete
        </button>
      </Form>
    </section>
  );
}
