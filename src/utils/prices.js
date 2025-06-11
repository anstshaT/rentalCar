export function prices() {
  const arrayOfObjects = [];

  for (let i = 30; i <= 200; i++) {
    if (i % 10 === 0) {
      arrayOfObjects.push({ id: i, name: i });
    }
  }

  return arrayOfObjects;
}
