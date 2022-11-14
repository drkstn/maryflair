import { redirect } from "@remix-run/node";
import { Form, useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import Notes from "~/components/Notes";
import { authenticator } from "~/services/auth.server";
import Course from "~/services/models/Course";
import { moveByIndex, moveElement } from "~/services/helpers.server";

export const action = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const body = await request.formData();
  const lessonId = body.get("lessonId");
  const lessonIndex = body.get("lessonIndex");
  const intent = body.get("intent");
  const toIndex = body.get("toIndex");
  const { nanoid, slug } = params;
  const course = await Course.findOne({ nanoid, owner });
  const lessons = course.lessons.map((lesson) => lesson.toString());

  let newLessonList;

  switch (intent) {
    case "up":
      newLessonList = moveByIndex(course.lessons, parseInt(lessonIndex), -1);
      break;
    case "down":
      newLessonList = moveByIndex(course.lessons, parseInt(lessonIndex), 1);
      break;
    case "move":
      newLessonList = moveByIndex(
        course.lessons,
        parseInt(lessonIndex),
        0,
        parseInt(toIndex)
      );
      break;
    default:
      console.log(`Sorry, can't find ${intent}.`);
  }

  // const newLessonList = moveElement(lessons, lessonId, +intent);
  // const newLessonList = moveByIndex(
  //   course.lessons,
  //   parseInt(lessonIndex),
  //   parseInt(intent)
  // );
  await Course.updateOne({ nanoid }, { lessons: newLessonList });

  // return json(newLessonList);

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
                <p className=" text-purple-400">
                  Lesson
                  <input
                    type="text"
                    name="toIndex"
                    className="border rounded-full px-2 w-12"
                    placeholder={index}
                  />
                  <button
                    type="submit"
                    name="intent"
                    value="move"
                    className="font-mono text-purple-500 hover:text-purple-300 text-sm"
                  >
                    move
                  </button>
                </p>
                <div className="flex justify-between ">
                  <p className="font-bold text-purple-500">{lesson.name}</p>
                  <input type="hidden" name="lessonId" value={lesson._id} />
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
