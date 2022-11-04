import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUsers } from "~/services/requests.server";

export const loader = async () => {
  const data = await getUsers();
  return json(data);
};

export default function HomeView() {
  const data = useLoaderData();

  return (
    <section>
      <h2 className="mt-2 text-md font-bold">Home - View</h2>
      <div className="mt-2">
        {data.map((user) => (
          <p key={user._id}>
            {user.name} {user.email}
          </p>
        ))}
      </div>
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
