import { Outlet } from "@remix-run/react";

export default function Home() {
  return (
    <>
      <h1 className=" text-3xl font-bold">
        Mary Flair - Home Navbar goes here
      </h1>
      <Outlet />
    </>
  );
}
