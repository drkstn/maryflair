import { useFetcher } from "@remix-run/react";
import { parseISO } from "date-fns";
import { format } from "date-fns/fp";

export default function DayHeader({ date }) {
  const fetcher = useFetcher();

  let isAdding = fetcher.submission?.formData.get("action");

  const formatDate2 = format("EEEE, MMMM d");

  return (
    <div tabIndex={0} className="group flex justify-between md:justify-start">
      <p className="mb-2 font-bold">{formatDate2(parseISO(date))}</p>
      <fetcher.Form method="post">
        <div
          className={`ml-4 group-hover:block group-focus:block group-focus-within:block ${
            !isAdding && "sm:hidden"
          }`}
        >
          <input type="hidden" name="selectedDate" value={date} />
          <button
            tabIndex={0}
            onClick={(e) => e.target.blur()}
            type="submit"
            name="action"
            value="addToCalendar"
            className={
              isAdding
                ? "font-mono text-white bg-purple-500 text-xs py-1 px-2 rounded-full"
                : "font-mono text-purple-500 hover:text-purple-300 text-xs"
            }
          >
            {isAdding ? "Adding..." : "Add to Google Calendar"}
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
