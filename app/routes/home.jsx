import { Link, Outlet, Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticator } from "../services/auth.server.js";

export const loader = async ({ request }) => {
  // authenticator.isAuthenticated function returns the user object if found
  // if user is not authenticated then user would be redirected back to homepage ("/" route)
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json(user);
};

export default function Home() {
  const user = useLoaderData();

  return (
    <>
      <nav className="flex justify-between h-16">
        <h1 className="flex items-center text-3xl font-bold">
          Mary Flair - Home Navbar goes here
        </h1>
        <ul className="flex items-center space-x-5">
          <li className="hover:text-purple-500">
            <Link to="/home">Home</Link>
          </li>
          <li className="hover:text-purple-500">
            <Link to="/home">Lesson Plans</Link>
          </li>
          <li className="hover:text-purple-500">
            <Link to="/home">Create New Plan</Link>
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
      <h2 className="text-xl font-bold text-purple-500">
        Hello, {user.displayName || "friend"}!
      </h2>
      <hr />
      <Outlet />
    </>
  );
}
