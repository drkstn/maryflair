import { redirect } from "@remix-run/node";
import { Form, useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import Notes from "~/components/Notes";
import { authenticator } from "~/services/auth.server";
import Course from "~/services/models/Course";
import { moveByIndex } from "~/services/helpers.server";
import PToInput from "~/components/PToInput";

export const action = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const body = await request.formData();
  const lessonIndex = body.get("lessonIndex");
  const intent = body.get("intent");
  const { nanoid, slug } = params;
  const course = await Course.findOne({ nanoid, owner });

  let newLessonList;
  console.log({ intent });
  switch (intent) {
    case "up":
      newLessonList = moveByIndex(
        course.lessons,
        parseInt(lessonIndex),
        parseInt(lessonIndex) - 1
      );
      break;
    case "down":
      newLessonList = moveByIndex(
        course.lessons,
        parseInt(lessonIndex),
        parseInt(lessonIndex) + 1
      );
      break;
    default:
      newLessonList = moveByIndex(
        course.lessons,
        parseInt(lessonIndex),
        parseInt(intent)
      );
  }

  await Course.updateOne({ nanoid }, { lessons: newLessonList });

  return redirect(`/manage/courses/${nanoid}/${slug}`);
};

export default function ScheduleByIdIndex() {
  const context = useOutletContext();
  const { objective, notes, lessons } = context;

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
      <hr className="my-6" />
      {lessons.length > 0 ? (
        <div className="mb-6">
          {lessons.map((lesson, index) => (
            <section key={lesson._id} className="mb-2">
              <Form method="post">
                <PToInput label="Lesson" name="intent" initialValue={index} />
                <div className="flex justify-between ">
                  <p className="font-bold text-purple-500">{lesson.name}</p>
                  <input type="hidden" name="lessonIndex" value={index} />
                  <div className="space-x-4">
                    <button
                      type="submit"
                      name="intent"
                      value="down"
                      className="font-mono text-purple-500 hover:text-purple-300 text-sm"
                    >
                      down
                    </button>
                    <button
                      type="submit"
                      name="intent"
                      value="up"
                      className="font-mono text-purple-500 hover:text-purple-300 text-sm"
                    >
                      up
                    </button>
                  </div>
                </div>
              </Form>

              {lesson.materials.length > 0 ? (
                <p>Materials: {lesson.materials}</p>
              ) : null}
              {lesson.assignments.length > 0 ? (
                <p>Assignments: {lesson.assignments}</p>
              ) : null}
              {lesson.notes.length > 0 ? <p>Notes: {lesson.notes}</p> : null}
              <hr className="my-6" />
            </section>
          ))}
        </div>
      ) : (
        <div className="mb-6">
          <p className="mb-6">Add a lesson to get started.</p>
          <hr className="my-6" />
        </div>
      )}

      {notes.length > 0 ? <Notes notes={notes} /> : null}
    </section>
  );
}
