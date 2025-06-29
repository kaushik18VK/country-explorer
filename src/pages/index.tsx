// File: src/pages/index.tsx
import { useState, useEffect } from 'react';
import type { GetStaticProps } from 'next';
import { fetchCountries } from '../lib/api';
import CountryCard from '../components/CountryCard';

export default function Home({ countries }: { countries: any[] }) {
  // track search and region filters
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  // skeleton loader state
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // while loading, show skeleton cards
  if (showSkeleton) {
    return (
      <div className="p-4 animate-pulse">
        {/* Input skeletons */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mb-4 max-w-md mx-auto"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mb-6 max-w-md mx-auto"></div>
        {/* Grid skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-300 dark:bg-gray-700 rounded shadow"
            />
          ))}
        </div>
      </div>
    );
  }

  // filter countries by region and search term
  const filtered = countries
    .filter((c) => (region ? c.region === region : true))
    .filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="p-4 max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="🔍 Search countries…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((c) => (
          <CountryCard key={c.cca2} country={c} />
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchCountries();
  return { props: { countries: data } };
};
