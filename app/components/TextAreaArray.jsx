import { useState } from "react";

export default function TextAreaArray({ label }) {
  const [counter, setCounter] = useState(1);
  const counterArray = Array(counter).fill();

  const handleClick = (event) => {
    switch (event.target.value) {
      case "add":
        setCounter(counter + 1);
        break;
      case "remove":
        setCounter(counter - 1);
        break;
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between">
        <label htmlFor={label.toLowerCase()}>
          <div className="font-bold text-purple-500">{label}: </div>
        </label>
        <div className=" space-x-2">
          <button
            type="button"
            hidden={counter < 2 ? true : false}
            onClick={handleClick}
            value="remove"
            className="px-3 rounded-full bg-purple-500 text-white text-sm h-full"
          >
            Remove
          </button>
          <button
            type="button"
            onClick={handleClick}
            value="add"
            className="px-3 rounded-full bg-purple-500 text-white text-sm h-full"
          >
            Add
          </button>
        </div>
      </div>
      <div className="mb-2 p-2 border rounded-lg border-purple-500 space-y-2">
        {counterArray.map((value, index) => (
          <textarea
            key={index}
            name={label.toLowerCase()}
            id={label.toLowerCase()}
            rows={3}
            className="flex p-1 border rounded-md border-purple-200 w-full align-top"
          />
        ))}
      </div>
    </div>
  );
}
