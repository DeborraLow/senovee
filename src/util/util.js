export const flat = (array) => array.reduce((acc, v) => acc.concat(v), []);
export const flatMap = (array, f) =>
  array.reduce((acc, v) => [...acc, ...f(v)], []);
