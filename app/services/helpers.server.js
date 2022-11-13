export const clearEmptyStringsArray = (arr) => {
  return arr.reduce(
    (start, value) => (value.length > 0 ? [...start, value] : start),
    []
  );
};
