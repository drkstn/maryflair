import { Link } from "react-router-dom";

export default function HomeIndex() {
  return (
    <section>
      <h1 className="text-slate-700 font-bold text-3xl">Today's Lesson Plan</h1>
      <p className="mt-2 text-slate-700 mb-6">
        Yay! No lessons scheduled. <b>Enjoy.</b>
      </p>
      <Link to="event" className=" text-purple-500 underline">
        Create Test Event
      </Link>
    </section>
  );
}
