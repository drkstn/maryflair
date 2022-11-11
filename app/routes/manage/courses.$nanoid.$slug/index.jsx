import { useOutletContext } from "@remix-run/react";
import Notes from "~/components/Notes";

export default function ScheduleByIdIndex() {
  const data = useOutletContext();
  const { objective, notes } = data;

  return (
    <>
      <p className="mt-2 text-sm text-slate-500">
        {objective
          ? objective
          : "A course is a sequential collection of lessons."}
      </p>
      {notes.length > 0 ? <Notes notes={notes} /> : null}
    </>
  );
}
