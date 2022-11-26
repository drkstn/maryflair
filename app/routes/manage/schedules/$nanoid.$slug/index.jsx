import { useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import CourseCards from "~/components/CourseCards";
import ScheduleList from "~/components/ScheduleList";
import { quickAddEvent } from "~/services/googleapi.server";
import {
  createDateLookup,
  sortByKey,
  updateLessonDate,
} from "~/services/helpers.server";
import Schedule from "~/services/models/Schedule";

export async function action({ request, params }) {
  const scheduleNanoid = params.nanoid;
  const formData = await request.formData();
  const courseId = formData.get("courseId");
  const selectedDate = formData.get("selectedDate");
  const lessonId = formData.get("lessonId");
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

  switch (action) {
    case "remove":
      return await Schedule.updateOne(
        { nanoid: scheduleNanoid },
        { $pull: { courses: { _id: courseId } } }
      );
    case "up":
      return Schedule.updateOne(
        { nanoid: scheduleNanoid },
        { courses: selectUpdateAndSort([lessonId], { difference: -1 }) }
      );
    case "down":
      return Schedule.updateOne(
        { nanoid: scheduleNanoid },
        { courses: selectUpdateAndSort([lessonId], { difference: 1 }) }
      );
    case "addToCalendar":
      const dateLookup = createDateLookup(
        schedule.calendar.dates,
        schedule.courses
      );

      const calendarName = schedule.name;

      const selectedDateData = dateLookup[selectedDate];

      const eventLabel =
        selectedDateData.courses
          .map((course) => {
            const courseString = course.name + ": ";
            const lessonString = course.lessons
              .map((lesson) => {
                return lesson.name;
              })
              .join(", ");
            return course.lessons.length > 0
              ? courseString + lessonString
              : courseString + "No Lessons";
          })
          .join(", ") + ` on ${selectedDate}`;

      const addedEvent = await quickAddEvent(request, eventLabel, calendarName);

      return addedEvent;
    default:
      throw new Error("Unknown action");
  }
}

export default function ScheduleByIdIndex() {
  const data = useOutletContext();
  const { schedule, dateLookup } = data;

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
        <ScheduleList schedule={schedule} dateLookup={dateLookup} />
      </section>
    </>
  );
}
