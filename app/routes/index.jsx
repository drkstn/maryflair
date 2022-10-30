import { Form } from "@remix-run/react";
import { SocialsProvider } from "remix-auth-socials";

export default function Index() {
  return (
    <main>
      <nav className="flex justify-between h-16">
        <h1 className="flex items-center text-3xl font-bold">Mary Flair</h1>
        <div className="flex items-center">
          <Form method="post" action={`/auth/${SocialsProvider.GOOGLE}`}>
            <button className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700">
              Log In / Sign Up
            </button>
          </Form>
        </div>
      </nav>
      <hr />
      <h2 className="mt-2 text-md font-bold">Root - Index</h2>
      <p className="mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a
        fermentum odio. Praesent consectetur tortor massa, in feugiat sapien
        semper et. Etiam dapibus, est sed rhoncus ultrices, augue lacus bibendum
        odio, sed pulvinar magna elit a leo. Pellentesque sed fermentum justo.
        Duis pellentesque velit sagittis, venenatis urna et, maximus nunc. Nam
        ultricies, tellus eu convallis varius, ante nisl lobortis quam, nec
        imperdiet enim enim eu lectus. Sed placerat lorem eu risus commodo, non
        sagittis sapien pellentesque. Aliquam id consequat mauris. In sed quam
        facilisis, finibus dolor nec, posuere arcu.
      </p>
    </main>
  );
}
