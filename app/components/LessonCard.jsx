import { useFetcher } from "@remix-run/react";

export default function LessonCard({ lesson }) {
  const fetcher = useFetcher();

  return (
    <div className="group flex justify-between">
      <p>{lesson.name}</p>
      <fetcher.Form method="post">
        <div className={`space-x-4 hidden group-hover:block`}>
          <input type="hidden" name="lessonId" value={lesson._id} />
          <button
            type="submit"
            name="action"
            value="down"
            className="font-mono text-purple-500 hover:text-purple-300 text-sm"
          >
            down
          </button>
          <button
            type="submit"
            name="action"
            value="up"
            className="font-mono text-purple-500 hover:text-purple-300 text-sm"
          >
            up
          </button>
        </div>
      </fetcher.Form>
      {/* <input type="checkbox" name="checkboxLessonId" value={lesson._id} /> */}
    </div>
  );
}
