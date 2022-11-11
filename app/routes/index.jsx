import { Form, Link } from "@remix-run/react";
import { SocialsProvider } from "remix-auth-socials";

export default function Index() {
  return (
    <main>
      <nav className="flex justify-between mb-6 mt-2">
        <h1 className="flex items-center text-3xl font-bold">
          <Link className="text-purple-500 hover:text-purple-700" to="/">
            Mary Flair
          </Link>
        </h1>

        <div className="flex justify-end items-center">
          <Form method="post" action={`/auth/${SocialsProvider.GOOGLE}`}>
            <button className="py-2 px-4 rounded-full text-white bg-purple-500 hover:bg-purple-700">
              Log In / Sign Up
            </button>
          </Form>
        </div>
      </nav>
      <hr className="mb-6" />
      <h1 className="text-slate-700 font-bold text-3xl">Welcome</h1>
      <div className=" space-y-4 max-w-md mt-2 text-slate-700">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a
          fermentum odio. Praesent consectetur tortor massa, in feugiat sapien
          semper et. Etiam dapibus, est sed rhoncus ultrices, augue lacus
          bibendum odio, sed pulvinar magna elit a leo. Pellentesque sed
          fermentum justo. Duis pellentesque velit sagittis, venenatis urna et,
          maximus nunc. Nam ultricies, tellus eu convallis varius, ante nisl
          lobortis quam, nec imperdiet enim enim eu lectus. Sed placerat lorem
          eu risus commodo, non sagittis sapien pellentesque. Aliquam id
          consequat mauris. In sed quam facilisis, finibus dolor nec, posuere
          arcu.
        </p>
        <p>
          Curabitur malesuada eget nulla ac efficitur. Mauris dictum volutpat
          risus, eget lobortis mi ultrices vel. Phasellus lectus justo, tempus
          et tortor eu, bibendum viverra nunc. Duis eget odio sed sapien ornare
          sodales. Praesent velit tortor, sollicitudin et venenatis nec,
          fermentum at leo. Aliquam a malesuada lorem. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Nullam dolor ex, pulvinar sed risus at, porttitor imperdiet
          ante. Donec pharetra elit vitae accumsan pellentesque. Vivamus nec
          tellus nisi. Integer efficitur blandit volutpat. Aenean iaculis massa
          non porttitor auctor. Nullam enim risus, consequat a sollicitudin
          quis, sollicitudin in ligula. Sed sit amet est sed lacus efficitur
          vestibulum.
        </p>
      </div>
    </main>
  );
}
