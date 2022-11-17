export default function ValidationError({ error }) {
  return (
    <>{error && <p className="text-pink-500 font-bold my-2">{error}</p>}</>
  );
}
