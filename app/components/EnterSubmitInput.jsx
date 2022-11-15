import { useState } from "react";

export default function EnterSubmitInput({ label, name, initial }) {
  const [value, setValue] = useState(initial);
  const handleChange = (e) => {
    setValue(e.target.value);
    setValue(initial);
  };

  return (
    <p className="p-1 bg-purple-500 text-white">
      <label>
        {label} {initial}
        <input
          type="text"
          name={name}
          value={value}
          // onBlur={() => setIsInput(true)}
          // onKeyUp={handleKeyUp}
          onChange={handleChange}
          className="ml-1 px-1 h-full border rounded-md border-purple-500 focus:outline-none text-purple-500"
          // placeholder={initial}
        />
      </label>
    </p>
  );
}
