import { Link, Outlet } from "@remix-run/react";

export default function Home() {
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
            <button className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700">
              Log Out
            </button>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </>
  );
}
