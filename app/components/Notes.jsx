export default function Notes({ notes }) {
  return (
    <section>
      <h2 className="min-w-max mb-1 font-bold text-sm tracking-wider text-purple-500 uppercase">
        Notes
      </h2>
      <ul className=" list-disc list-outside ml-4 text-sm text-slate-500">
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </section>
  );
}
