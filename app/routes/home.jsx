import { Link, Outlet, Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticator } from "../services/auth.server.js";

export const loader = async ({ request }) => {
  // authenticator.isAuthenticated function returns the user object if found
  // if user is not authenticated then user would be redirected back to homepage ("/" route)
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  console.log("Authenticated!");

  return json(user._json);
};

export default function Home() {
  const data = useLoaderData();
  const context = data;

  return (
    <main>
      <nav className="flex justify-between h-16">
        <h1 className="flex items-center text-3xl font-bold">
          <Link to="/">Mary Flair</Link>
        </h1>
        <ul className="flex items-center space-x-5">
          <li className="hover:text-purple-500">
            <Link to="/home">Home</Link>
          </li>
          <li className="hover:text-purple-500">
            <Link to="view">View</Link>
          </li>
          <li className="hover:text-purple-500">
            <Link to="create">Create</Link>
          </li>
          <li>
            <Form action="/logout" method="post">
              <button className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700">
                Log Out
              </button>
            </Form>
          </li>
        </ul>
      </nav>
      <hr />
      <h2 className="mt-2 text-xl font-bold text-purple-500">
        Hello, {data.given_name || "friend"}!
      </h2>
      <Outlet context={context} />
    </main>
  );
}
