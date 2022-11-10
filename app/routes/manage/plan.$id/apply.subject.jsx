import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import { authenticator } from "~/services/auth.server";
import Plan from "~/services/models/Plan";
import { getSubjects } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  const owner = user._json.email;
  const subjects = await getSubjects(owner);

  return json({ owner, subjects });
};

export async function action({ params, request }) {
  const { id } = params;
  const formData = await request.formData();

  const owner = formData.get("owner");
  const name = formData.get("subject");
  const frequency = formData
    .getAll("frequency")
    .map((value) => parseInt(value));

  const data = { name, frequency };

  await Plan.updateOne({ _id: id }, { $push: { subjects: data } });

  return redirect(`/manage/plan/${id}`);
}

export default function ApplySubject() {
  const data = useLoaderData();

  return (
    <>
      <Form method="post">
        <input type="hidden" name="owner" value={data.owner} />
        <div className="mb-2">
          <label htmlFor="subject-select">
            <span className="font-bold text-purple-500">
              What subject would you like to apply?
            </span>
            <br />
            <select
              name="subject"
              id="subject-select"
              className="my-2 p-1 border rounded-lg border-purple-500"
            >
              {data?.subjects?.length > 0 ? (
                <>
                  <option value="">Please Select</option>
                  {data.subjects.map((subject) => (
                    <option key={subject._id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No subjects, please add</option>
              )}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <div className="font-bold text-purple-500">
            How frequently does it occur?
          </div>
          <div className=" space-x-2">
            <input type="checkbox" id="monday" name="frequency" value={1} />
            <label htmlFor="monday">Monday</label>
            <input type="checkbox" id="tuesday" name="frequency" value={2} />
            <label htmlFor="tuesday">Tuesday</label>
            <input type="checkbox" id="wednesday" name="frequency" value={3} />
            <label htmlFor="wednesday">Wednesday</label>
            <input type="checkbox" id="thursday" name="frequency" value={4} />
            <label htmlFor="thursday">Thursday</label>
            <input type="checkbox" id="friday" name="frequency" value={5} />
            <label htmlFor="friday">Friday</label>
          </div>
        </div>

        <div className="space-x-2">
          <Button label="Apply" type="submit" />
          <Button label="Cancel" path="../" />
        </div>
      </Form>
    </>
  );
}
