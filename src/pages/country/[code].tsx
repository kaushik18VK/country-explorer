// File: src/pages/country/[code].tsx
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchCountry, fetchCountries } from '../../lib/api';
import CountryCard from '../../components/CountryCard';

export default function CountryPage({ country }: { country: any }) {
  const router = useRouter();
  const [showSkeleton, setShowSkeleton] = useState(true);

  // minimum skeleton display time
  useEffect(() => {
    // only run after fallback is resolved
    if (!router.isFallback) {
      const timer = setTimeout(() => setShowSkeleton(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [router.isFallback]);

  // skeleton loader
  if (router.isFallback || showSkeleton) {
    return (
      <div className="p-4 space-y-6 animate-pulse">
        <div className="h-8 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
        <div>
          <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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

      <div className="space-y-2">
        <div>
          <strong>Currencies:</strong>{' '}
          {country.currencies
            ? Object.entries(country.currencies)
                .map(([_, { name, symbol }]) => `${name} (${symbol})`)
                .join(', ')
            : 'N/A'}
        </div>
        <div>
          <strong>Languages:</strong>{' '}
          {country.languages
            ? Object.values(country.languages).join(', ')
            : 'N/A'}
        </div>
        <div>
          <strong>Top Level Domain:</strong>{' '}
          {country.tld?.join(', ') || 'N/A'}
        </div>
      </div>

      {country.borders && country.borders.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Border Countries:</h2>
          <div className="flex flex-wrap gap-2">
            {country.borders.map((code: string) => {
              const neighbor = country._allCountries.find((c: any) => c.cca3 === code);
              return (
                neighbor && <CountryCard
                  key={code}
                  country={neighbor}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await fetchCountries();
  const paths = countries.map((c: any) => ({ params: { code: c.cca2 } }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const code = params?.code as string;
  const data = await fetchCountry(code);
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
