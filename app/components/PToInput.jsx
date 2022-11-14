import { useState } from "react";

export default function PToInput({ label, name, type, initialValue }) {
  const [isInput, setIsInput] = useState(true);

  const handleKeyUp = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      setIsInput(true);
    }
  };

  return (
    <>
      {isInput ? (
        <p
          tabIndex={0}
          onClick={() => setIsInput(false)}
          onFocus={() => setIsInput(false)}
          className="py-1 hover:p-1 text-purple-400 w-fit
           hover:bg-purple-500 hover:text-white hover:rounded-full hover:px-3"
        >
          {label} {initialValue}
        </p>
      ) : (
        <p className="px-3 py-1 rounded-full bg-purple-500 text-white w-fit">
          <label>
            {label}
            <input
              autoFocus
              name={name}
              type={type || "text"}
              onBlur={() => setIsInput(true)}
              onKeyUp={handleKeyUp}
              className="ml-1 px-1 h-full w-10 text-center border rounded-full border-purple-500 focus:outline-none text-purple-500"
            />
          </label>
        </p>
      )}
    </>
  );
}
