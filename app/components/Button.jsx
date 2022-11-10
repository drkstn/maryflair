import { Link } from "@remix-run/react";

export default function Button({ type, label, path }) {
  return (
    <>
      {type === "submit" ? (
        <button
          type="submit"
          className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700"
        >
          {label}
        </button>
      ) : (
        <button
          type="button"
          className="rounded-full text-white bg-purple-500 hover:bg-purple-700"
        >
          <Link className="flex py-2 px-4" to={path}>
            {label}
          </Link>
        </button>
      )}
    </>
  );
}
