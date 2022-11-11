import { useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import ScheduleList from "~/components/ScheduleList";

export default function ScheduleByIdIndex() {
  const data = useOutletContext();

  return (
    <>
      <Button label="Add Course" path="course/add" />
      <section className="my-4">
        <ScheduleList data={data} />
      </section>
    </>
  );
}
