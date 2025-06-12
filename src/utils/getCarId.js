export const getCarId = (url) => {
  if (!url) {
    return "...";
  }
  const match = url.match(/\/(\d+)-/);
  return match[1];
};
