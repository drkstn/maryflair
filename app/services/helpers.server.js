export const clear = (arr) => {
  return arr.reduce(
    (start, value) => (value.length > 0 ? [...start, value] : start),
    []
  );
};

export const moveElement = (arr, value, pos) => {
  const newArr = [...arr];
  const fromIndex = newArr.indexOf(value);
  if (fromIndex === -1) return "not found";

  const toIndex = fromIndex + pos >= 0 ? fromIndex + pos : 0;

  const element = newArr.splice(fromIndex, 1)[0];

  newArr.splice(toIndex, 0, element);

  return newArr;
};

export const moveByIndex = (arr, fromIndex, pos, to) => {
  const newArr = [...arr];
  // const toIndex = fromIndex + pos >= 0 ? fromIndex + pos : 0;
  const toIndex = to ? to : fromIndex + pos >= 0 ? fromIndex + pos : 0;

  const element = newArr.splice(fromIndex, 1)[0];

  newArr.splice(toIndex, 0, element);

  return newArr;
};
