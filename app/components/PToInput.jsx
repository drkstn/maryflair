import { useState } from "react";

export default function PToInput({ label, name, type, input }) {
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
          onClick={() => setIsInput(false)}
          className="py-1 hover:p-1 text-purple-400 hover:bg-purple-500 hover:text-white"
        >
          {label} {input}
        </p>
      ) : (
        <p className="p-1 bg-purple-500 text-white">
          <label>
            {label}
            <input
              autoFocus
              name={name}
              type={type || "text"}
              onBlur={() => setIsInput(true)}
              onKeyUp={handleKeyUp}
              className="ml-1 px-1 h-full w-10 text-center border rounded-md border-purple-500 focus:outline-none text-purple-500"
              // placeholder={input}
            />
          </label>
        </p>
      )}
    </>
  );
}
