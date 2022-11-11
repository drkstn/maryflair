import { Link } from "@remix-run/react";

export default function ButtonOutline({ type, label, path }) {
  return (
    <>
      {type === "submit" ? (
        <button
          type="submit"
          className="rounded-full text-purple-500 border border-purple-500 hover:bg-purple-500 min-w-max hover:text-white"
        >
          {label}
        </button>
      ) : (
        <button
          type="button"
          className="rounded-full text-purple-500 border border-purple-500 hover:bg-purple-500 min-w-max hover:text-white"
        >
          <Link className="flex py-2 px-4" to={path}>
            {label}
          </Link>
        </button>
      )}
    </>
  );
}
