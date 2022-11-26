import { Link } from "@remix-run/react";

export default function Button({ type, genre, label, to, name, value }) {
  const styles = {
    outline:
      "py-2 px-4 inline-block rounded-full text-purple-500 border border-purple-500 hover:bg-purple-500 min-w-max hover:text-white",
    "sm-outline-warning":
      "px-2 inline-block rounded-full text-sm font-normal border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white",
    "sm-warning":
      "px-2 inline-block rounded-full text-sm text-white font-normal bg-pink-500 hover:bg-pink-700",
    sm: "py-1 px-3 inline-block rounded-full text-sm text-white font-normal bg-purple-500 hover:bg-purple-700",
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
        <button
          type={type}
          className={styles[genre] || styles.default}
          name={name || null}
          value={value || null}
        >
          {label}
        </button>
      )}
    </>
  );
}
