import { useOutletContext } from "@remix-run/react";
import Button from "~/components/Button";
import ScheduleList from "~/components/ScheduleList";

export default function ScheduleByIdIndex() {
  const data = useOutletContext();

  return (
    <>
      <div className="mt-4">
        <Button label="Import Course" path="courses/import" />
      </div>
      <section className="my-4">
        <ScheduleList data={data} />
      </section>
    </>
  );
}