import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export async function action({ request }) {
  const body = await request.formData();

  const data = Object.fromEntries(body);
  console.log(data);

  switch (data.intent) {
    case "create":
      return "CREATE!!!";
    case "update":
      return "UPDATE!!!";
    case "delete":
      return "DELETE!!!";
    default:
      return "Press a button 2";
  }

  // return json({ message: `You pressed ${intent.toUpperCase()}` });
}

export default function Test() {
  const data = useActionData();

  return (
    <section>
      <p className="mb-4">{data ? data : "Press a button"}</p>
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
