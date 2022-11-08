import { Outlet, useLoaderData } from "@remix-run/react";
import NavBar from "~/components/NavBar";
import { json } from "@remix-run/node";
import { authenticator } from "../services/auth.server.js";

export const loader = async ({ request }) => {
  // authenticator.isAuthenticated function returns the user object if found
  // if user is not authenticated then user would be redirected back to homepage ("/" route)
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json(user._json);
};

export default function Manage() {
  const data = useLoaderData();

  return (
    <main>
      <NavBar data={data} />
      <Outlet context={data} />
    </main>
  );
}
