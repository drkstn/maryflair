import { useFetcher } from "@remix-run/react";

export default function LessonCard({ lesson }) {
  const fetcher = useFetcher();
  const data = fetcher.data;
  data && console.log(data);

  return (
    <div tabIndex={0} className="group flex justify-between">
      <p>{lesson.name}</p>
      <fetcher.Form method="post">
        <div
          className={`space-x-4 hidden group-hover:block group-focus:block group-focus-within:block`}
        >
          <input type="hidden" name="lessonId" value={lesson._id} />
          <button
            tabIndex={0}
            type="submit"
            name="action"
            value="down"
            className="font-mono text-purple-500 hover:text-purple-300 text-xs"
          >
            down
          </button>
          <button
            tabIndex={0}
            type="submit"
            name="action"
            value="up"
            className="font-mono text-purple-500 hover:text-purple-300 text-xs"
          >
            up
          </button>
        </div>
      </fetcher.Form>
      {/* <input type="checkbox" name="checkboxLessonId" value={lesson._id} /> */}
    </div>
  );
}
