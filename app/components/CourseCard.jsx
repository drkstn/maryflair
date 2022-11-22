import { Link, useFetcher } from "@remix-run/react";
import { useState } from "react";
import Button from "./Button";

export default function CourseCard({ data, course }) {
  const fetcher = useFetcher();
  const [state, setState] = useState(false);

  const handleClick = (e) => {
    setState(!state);
  };

  return (
    <section className="mb-2 border border-slate-300 rounded-xl p-3">
      <fetcher.Form
        method="post"
        onSubmit={(e) => {
          if (!confirm("Are you sure?")) {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="courseId" value={course._id} />
        <input type="hidden" name="owner" value={data.owner} />
        <div className="text-purple-500 hover:text-purple-700 font-bold text-lg flex justify-between">
          <Link to={`/manage/schedules/${data.nanoid}/${data.slug}`}>
            {course.name}
          </Link>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClick}
              className="text-purple-500 font-normal hover:bg-blue-300 hover:text-white w-7 rounded-md"
            >
              {state ? "-" : "+"}
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-500 max-w-xl">
          {state ? course.objective : course.objective?.slice(0, 96) + "..."}
        </p>
        <div hidden={!state}>
          <div className="flex justify-end">
            <Button
              type="submit"
              genre="sm-warning"
              label="Remove"
              name="action"
              value="remove"
            />
          </div>
        </div>
      </fetcher.Form>
    </section>
  );
}
