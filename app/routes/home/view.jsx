import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { getLessons } from "~/services/requests.server";

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const owner = user._json.email;
  const data = await getLessons(owner);
  return json(data);
};

export default function HomeView() {
  const data = useLoaderData();

  return (
    <section>
      <h2 className="mt-2 text-md font-bold">Home - View</h2>
      {data.map((lesson) => (
        <div key={lesson._id}>
          <h1 className="text-xl font-bold">{lesson.title}</h1>
          <p>{lesson.description}</p>
          <hr />
        </div>
      ))}
      <p className="mt-2">
        Vivamus a nisi eu erat imperdiet tempus nec eu urna. Morbi tempus elit
        lectus, a rhoncus urna vehicula at. Aenean facilisis nunc non massa
        feugiat tincidunt. Fusce sit amet convallis quam. Nulla ligula augue,
        porttitor ut sapien a, pellentesque dignissim mauris. Praesent ornare
        ante a eros iaculis, a mollis metus consectetur. Nulla placerat sed enim
        sit amet elementum. Sed eu tellus quis orci mattis iaculis. Suspendisse
        non ante ligula. Proin mi est, rhoncus nec laoreet et, mollis at dolor.
      </p>
    </section>
  );
}
