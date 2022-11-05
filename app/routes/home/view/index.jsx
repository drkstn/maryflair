import { Link } from "react-router-dom";

export default function ViewIndex() {
  return (
    <div className="mt-4">
      <Link
        to="create"
        className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700"
      >
        Add Lesson
      </Link>
    </div>
  );
}
