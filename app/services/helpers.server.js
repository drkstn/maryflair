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

// export const moveByIndex = (arr, fromIndex, pos, to) => {
//   const newArr = [...arr];
//   // const toIndex = fromIndex + pos >= 0 ? fromIndex + pos : 0;
//   const toIndex =
//     to === 0 || to ? to : fromIndex + pos >= 0 ? fromIndex + pos : 0;

//   const element = newArr.splice(fromIndex, 1)[0];

//   newArr.splice(toIndex, 0, element);

//   return newArr;
// };

export const moveByIndex = (arr, fromIndex, toIndex) => {
  const arrLength = arr.length - 1;

  if (fromIndex < 0) fromIndex = 0;
  else if (fromIndex > arrLength) fromIndex = arrLength;

  if (toIndex < 0) toIndex = 0;
  else if (toIndex > arrLength) toIndex = arrLength;

  const item = arr.at(fromIndex);

  const leftOfFromIndex = arr.slice(0, fromIndex);
  const rightOfFromIndex = arr.slice(fromIndex + 1);

  const filteredArr = [...leftOfFromIndex, ...rightOfFromIndex];

  const leftOfToIndex = filteredArr.slice(0, toIndex);
  const rightOfToIndex = filteredArr.slice(toIndex);

  const newArr = [...leftOfToIndex, item, ...rightOfToIndex];

  return newArr;
};
