export const clear = (arr) => {
  return arr.reduce(
    (start, value) => (value.length > 0 ? [...start, value] : start),
    []
  );
};

export const move = (arr, obj, pos) => {
  const newArr = [...arr];

  const entry = Object.entries(obj).flat();
  const key = entry[0];
  const value = entry[1];

  const fromIndex = newArr.findIndex((item) => item[key] === value);

  if (fromIndex === -1) return "not found";

  const toIndex = fromIndex + pos >= 0 ? fromIndex + pos : 0;

  const element = newArr.splice(fromIndex, 1)[0];

  newArr.splice(toIndex, 0, element);

  return newArr;
};
