import { Link } from "@remix-run/react";

export default function ButtonX({ type, genre, label, to }) {
  const styles = {
    outline:
      "py-2 px-4 inline-block rounded-full text-purple-500 border border-purple-500 hover:bg-purple-500 min-w-max hover:text-white",
    default:
      "py-2 px-4 inline-block rounded-full text-white bg-purple-500 hover:bg-purple-700 min-w-max",
  };

  return (
    <>
      {type === "link" ? (
        <Link to={to} className={styles[genre] || styles.default}>
          {label}
        </Link>
      ) : (
        <button type={type} className={styles[genre] || styles.default}>
          {label}
        </button>
      )}
    </>
  );
}
