import { useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import LessonPlanList from "~/components/LessonPlanList";

export default function LessonPlanByIdIndex() {
  const data = useOutletContext();
  const { weeks, dates } = data.calendar;

  return (
    <>
      <Button label="Apply Subject" path="apply/subject" />
      <section className="my-4">
        <LessonPlanList data={data} />
      </section>
    </>
  );
}
