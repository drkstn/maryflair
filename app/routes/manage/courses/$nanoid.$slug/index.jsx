import { useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import Notes from "~/components/Notes";

export default function ScheduleByIdIndex() {
  const data = useOutletContext();
  const { objective, notes } = data;

  return (
    <section className="max-w-lg">
      <p className="mb-6 mt-2 text-sm text-slate-500">
        {objective
          ? objective
          : "A course is a sequential collection of lessons."}
      </p>
      <div className="mb-6">
        <Button label="Add New Lesson" path="lessons/new" />
      </div>
      <p className="mb-6 font-bold">*** Lessons Go Here ***</p>
      {notes.length > 0 ? <Notes notes={notes} /> : null}
    </section>
  );
}
