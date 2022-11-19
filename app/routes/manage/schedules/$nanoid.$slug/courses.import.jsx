import { Form } from "@remix-run/react";
import Button from "~/components/Button";

export default function ImportCourse() {
  return (
    <section>
      <div className="mb-4">
        <h1 className="text-purple-500 font-bold text-3xl">Import Course</h1>
        <p className="mt-2 text-sm text-slate-500">
          Import a new or existing course to this schedule.
        </p>
      </div>

      <Form method="post" className="mt-6">
        <div className="space-x-2 mt-4">
          <Button type="link" label="Existing" to="existing" />
          <Button type="link" label="New" to="new" />
          <Button type="link" genre="outline" label="Cancel" to=".." />
        </div>
      </Form>
    </section>
  );
}
