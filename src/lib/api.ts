export async function fetchCountries() {
  const res = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca2,cca3,borders,currencies,languages'
  );
  return res.json();
}
export async function fetchCountry(code: string) {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${code}`
  );
  return res.json();
}