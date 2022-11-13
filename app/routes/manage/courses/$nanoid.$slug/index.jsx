import { useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import Notes from "~/components/Notes";

export const action = async ({ request }) => {
  console.log("click");
};

export default function ScheduleByIdIndex() {
  const context = useOutletContext();
  const { objective, notes, lessons } = context;
  console.log(context);

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
      {lessons.length > 0 ? (
        <div className="mb-6">
          {lessons.map((lesson) => (
            <section key={lesson._id} className="mb-2">
              <p className="font-bold text-purple-500">{lesson.name}</p>
              {lesson.materials.length > 0 ? (
                <p>Materials: {lesson.materials}</p>
              ) : null}
              {lesson.assignments.length > 0 ? (
                <p>Assignments: {lesson.assignments}</p>
              ) : null}
              {lesson.notes.length > 0 ? <p>Notes: {lesson.notes}</p> : null}
            </section>
          ))}
        </div>
      ) : (
        <p className="mb-6 font-bold">*** Lessons NOT FOUND ***</p>
      )}

      {notes.length > 0 ? <Notes notes={notes} /> : null}
    </section>
  );
}
