import { useFetcher } from "@remix-run/react";
import { parseISO } from "date-fns";
import { format } from "date-fns/fp";

export default function DayHeader({ date }) {
  const fetcher = useFetcher();
  const data = fetcher.data;
  data && console.log(data);

  const formatDate2 = format("EEEE, MMMM d");

  return (
    <div tabIndex={0} className="group flex justify-between md:justify-start">
      <p className="mb-2 font-bold">{formatDate2(parseISO(date))}</p>
      <fetcher.Form method="post">
        <div
          className={`ml-4 sm:hidden group-hover:block group-focus:block group-focus-within:block`}
        >
          <input type="hidden" name="selectedDate" value={date} />
          <button
            tabIndex={0}
            onClick={(e) => e.target.blur()}
            type="submit"
            name="action"
            value="addToCalendar"
            className="font-mono text-purple-500 hover:text-purple-300 text-xs"
          >
            + Google Calendar
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}
