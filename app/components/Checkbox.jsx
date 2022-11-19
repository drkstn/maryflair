import { useState } from "react";

export default function Checkbox({ label, name, value, id }) {
  const [state, setState] = useState(false);

  const handleChange = () => {
    setState(!state);
  };

  return (
    <div
      className={
        state
          ? "p-1 rounded-lg border border-purple-500 mb-1 mx-[-8px]"
          : "p-1 rounded-lg border border-transparent mb-1 mx-[-8px]"
      }
    >
      <label className="ml-1 inline-block font-bold text-purple-500">
        <input
          className="mr-2 accent-purple-500"
          type="checkbox"
          name={name}
          value={value || name}
          id={id || name}
          onChange={handleChange}
        />
        {label}
      </label>
    </div>
  );
}
