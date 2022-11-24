import { json } from "@remix-run/node";
import { useActionData, useFetcher, useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import CourseCards from "~/components/CourseCards";
import ScheduleList from "~/components/ScheduleList";
import { sortByKey, updateLessonDate } from "~/services/helpers.server";
import Schedule from "~/services/models/Schedule";

export async function action({ request, params }) {
  const scheduleNanoid = params.nanoid;
  const formData = await request.formData();
  const courseId = formData.get("courseId");
  const selectedLessonIds = formData.getAll("checkboxLessonId");
  const moveLessonDown = formData.get("moveLessonDown");
  const moveLessonUp = formData.get("moveLessonUp");
  const action = formData.get("action");

  const getSelectsAndUpdate = (course, ids, options) => {
    const selected = course.lessons.filter((lesson) => {
      return ids.includes(lesson._id.toString());
    });

    const updatedLessons = selected.map((lesson) =>
      updateLessonDate(lesson, options)
    );

    const unselected = course.lessons.filter((lesson) => {
      return !ids.includes(lesson._id.toString());
    });
    return [...updatedLessons, ...unselected];
  };

  const schedule = await Schedule.findOne({ nanoid: scheduleNanoid });

  const selectUpdateAndSort = (ids, options) =>
    schedule.courses.toObject().map((course) => {
      const limiter = course.dates;
      const updated = getSelectsAndUpdate(course, ids, {
        ...options,
        limiter,
      });
      return {
        ...course,
        lessons: updated.sort(sortByKey("name")).sort(sortByKey("date")),
      };
    });

  if (moveLessonDown) {
    const update = selectUpdateAndSort([moveLessonDown], { difference: 1 });
    return Schedule.updateOne({ nanoid: scheduleNanoid }, { courses: update });
  }
  if (moveLessonUp) {
    const update = selectUpdateAndSort([moveLessonUp], { difference: -1 });
    return Schedule.updateOne({ nanoid: scheduleNanoid }, { courses: update });
  }

  // console.log(singleAction);
  switch (action) {
    case "remove":
      return await Schedule.updateOne(
        { nanoid: scheduleNanoid },
        { $pull: { courses: { _id: courseId } } }
      );
    case "select":
      const newData = selectUpdateAndSort(selectedLessonIds, {
        difference: -1,
      });

      // return selectUpdateAndSort;
      return newData;
    default:
      throw new Error("Unknown action");
  }
}

export default function ScheduleByIdIndex() {
  const data = useOutletContext();
  const fetcher = useFetcher();
  const { schedule, dateLookup } = data;
  const actionData = fetcher.data;
  // console.log(actionData);

  return (
    <>
      <div className="mt-4">
        <Button type="link" label="Import Course" to="courses/import" />
      </div>
      <hr className="my-6" />
      <section>
        <h2 className="font-bold text-2xl text-slate-700 mb-2">Course List</h2>
        <CourseCards data={schedule} />
        <hr className="my-6" />
      </section>
      <section>
        <h2 className="font-bold text-2xl text-slate-700 mb-2">Schedule</h2>
        <fetcher.Form method="post">
          <ScheduleList schedule={schedule} dateLookup={dateLookup} />
        </fetcher.Form>
      </section>
    </>
  );
}
