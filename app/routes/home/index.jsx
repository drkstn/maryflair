import { useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { addYears, addDays, addWeeks, format } from "date-fns/fp";
import parseISO from "date-fns/parseISO";

export default function HomeIndex() {
  const userData = useOutletContext();

  const formatDate = format("EEEE, MMMM d, y");

  const [selectDate, setSelectDate] = useState("Please select a date");
  const handleChange = (event) => {
    const date = event.target.value;
    setSelectDate(formatDate(parseISO(date)));

    console.log("value is:", event.target.value);
  };

  const date = new Date();
  const addWeek = addWeeks(1);
  const futureDate = addWeek(date);

  const arrDates = [new Date(1983, 9, 5), new Date(1984, 9, 12), new Date()];
  const arr1 = arrDates.map(formatDate);
  const arr2 = arrDates
    .map(addYears(4))
    .map(addWeeks(1))
    .map(addDays(1))
    .map(formatDate);
  // console.log(arr1);
  // console.log(arr2);
  // console.log(arrDates);

  return (
    <section>
      <h2 className="mt-2 text-md font-bold">Home - Index</h2>
      <p className="mt-2">
        Your email is <b>{userData.email}</b>
      </p>
      <p>Today is {formatDate(date)}</p>
      <p>Next week is {formatDate(futureDate)}</p>
      <hr />
      <div>
        <input
          className="my-2 p-1 border rounded-lg border-purple-500"
          type="date"
          onChange={handleChange}
        ></input>
      </div>
      <p>
        <b>{selectDate}</b>
      </p>
      <hr />
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
