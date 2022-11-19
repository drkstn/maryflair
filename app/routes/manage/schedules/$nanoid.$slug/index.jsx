import { useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import CourseCards from "~/components/CourseCards";
import ScheduleList from "~/components/ScheduleList";
import ScheduleList2 from "~/components/ScheduleList2";
import ScheduleList3 from "~/components/ScheduleList3";
import ScheduleList4 from "~/components/ScheduleList4";
import Schedule from "~/services/models/Schedule";

export async function action({ request, params }) {
  const scheduleNanoid = params.nanoid;
  const formData = await request.formData();
  const courseId = formData.get("courseId");
  const action = formData.get("action");

  switch (action) {
    case "remove":
      return await Schedule.updateOne(
        { nanoid: scheduleNanoid },
        { $pull: { courses: { _id: courseId } } }
      );
    default:
      throw new Error("Unknown action");
  }
}

export default function ScheduleByIdIndex() {
  const data = useOutletContext();
  const { schedule, dateLookup } = data;
  console.log(dateLookup);
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
        {/* <ScheduleList data={schedule} /> */}
        {/* <ScheduleList3 schedule={schedule} /> */}
        <ScheduleList4 schedule={schedule} />
      </section>
    </>
  );
}
