import { useOutletContext } from "@remix-run/react";

export default function HomeIndex() {
  const userData = useOutletContext();

  return (
    <section>
      <h2 className="mt-2 text-md font-bold">Home - Index</h2>
      <p className="mt-2">
        Your email is <b>{userData.email}</b>
      </p>
      <p className="mt-2">
        Quisque quis scelerisque odio, vitae rhoncus tellus. Nullam facilisis
        accumsan tortor, eu pretium enim dictum non. Sed imperdiet pellentesque
        tristique. Proin sit amet metus fermentum, eleifend sem eget, egestas
        nunc. Mauris a ex urna. Ut suscipit iaculis elit nec pharetra. Fusce sit
        amet mauris in eros euismod blandit at sed enim. Maecenas et risus mi.
        Suspendisse congue tellus a leo suscipit, nec placerat urna laoreet. Nam
        vel ante id purus convallis scelerisque.
      </p>
    </section>
  );
}
