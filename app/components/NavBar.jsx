import { Form, Link } from "@remix-run/react";

export default function NavBar({ data, path }) {
  return (
    <>
      <nav className="flex justify-between mb-6 mt-2">
        <h1 className="flex items-center text-3xl font-bold">
          <Link className="text-purple-500 hover:text-purple-700" to="/">
            Mary Flair
          </Link>
        </h1>

        <ul className="flex justify-end items-center space-x-5">
          <li
            className={`hover:text-purple-500 ${
              path &&
              path === "home" &&
              "border-b-[3px] pt-[3px] border-purple-500"
            }`}
          >
            <Link to="/home">Home</Link>
          </li>
          <li
            className={`hover:text-purple-500 ${
              path &&
              path === "manage" &&
              "border-b-[3px] pt-[3px] border-purple-500"
            }`}
          >
            <Link to="/manage">Manage</Link>
          </li>
          <li>
            <Form action="/logout" method="post">
              <button className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700">
                <b>{data.given_name}</b>
              </button>
            </Form>
          </li>
        </ul>
      </nav>
      <hr className="mb-6" />
    </>
  );
}
