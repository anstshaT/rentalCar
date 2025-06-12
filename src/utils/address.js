export const getAddress = (address) => {
  if (typeof address !== "string") {
    return { city: null, country: null };
  }
  /* get city  */
  const matchCity = address.match(/, ([^,]+),/);
  const city = matchCity ? matchCity[1].trim() : null;

  /* get country  */
  const matchCountry = address.match(/, ([^,]+)$/);
  const country = matchCountry ? matchCountry[1].trim() : null;

  return { city: city, country: country };
};
