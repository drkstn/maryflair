import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticator } from "../services/auth.server.js";
import NavBar from "~/components/NavBar.jsx";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json(user._json);
};

export default function Home() {
  const data = useLoaderData();

  return (
    <main className="lg:mx-16">
      <NavBar data={data} path="home" />
      <Outlet />
    </main>
  );
}
