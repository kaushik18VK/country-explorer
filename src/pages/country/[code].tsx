import type { GetStaticPaths, GetStaticProps } from 'next';
import { fetchCountry, fetchCountries } from '../../lib/api';
import CountryCard from '../../components/CountryCard';

export default function CountryPage({ country }: { country: any }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{country.name.common}</h1>
      <img
        src={country.flags.svg}
        alt={country.name.common + ' flag'}
        className="my-4 h-48 rounded shadow"
      />
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Currency:</strong> {JSON.stringify(country?.currencies)}</p>
      <p><strong>Languages:</strong> {JSON.stringify(country?.languages)}</p>

      {country.borders && country.borders.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Border Countries:</h2>
          <div className="flex flex-wrap gap-2">
            {country.borders.map((code: string) => (
              <CountryCard
                key={code}
                country={country._allCountries.find((c: any) => c.cca2 === code) || { cca2: code, name: { common: code }, flags: { svg: '' } }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-render pages for all countries
  const countries = await fetchCountries();
  const paths = countries.map((c: any) => ({ params: { code: c.cca2 } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const code = params?.code as string;
  const data = await fetchCountry(code);
  // For border lookups, fetch all countries once
  const all = await fetchCountries();
  return {
    props: {
      country: {
        ...data[0],
        _allCountries: all,
      },
    },
  };
};
