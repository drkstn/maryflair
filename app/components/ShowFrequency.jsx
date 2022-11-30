export default function ShowFrequency({ frequency }) {
  const dayOfTheWeek = [
    ["S", false],
    ["M", false],
    ["T", false],
    ["W", false],
    ["T", false],
    ["F", false],
    ["S", false],
  ];

  const freqArray = dayOfTheWeek.map((day, index) => {
    return frequency.includes(index) ? [...day[0], true] : day;
  });

  const freqElem = freqArray.map((day, index) => {
    if (day[1]) {
      return (
        <div
          key={index}
          className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center"
        >
          {day[0]}
        </div>
      );
    }
    return (
      <div
        key={index}
        className="w-5 h-5 rounded-full border border-slate-300 text-slate-300 text-xs font-bold flex items-center justify-center"
      >
        {day[0]}
      </div>
    );
  });

  return <div className="flex items-center space-x-1">{freqElem}</div>;
}
