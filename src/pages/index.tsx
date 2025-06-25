
import { useState } from 'react';
import type { GetStaticProps } from 'next';
import { fetchCountries } from '../lib/api';
import CountryCard from '../components/CountryCard';

export default function Home({ countries }: { countries: any[] }) {
  // 1) track the text the user types
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  // 2) filter our static list by name.common
  const filtered = countries
    .filter((c) => (region ? c.region === region : true))
    .filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="p-4 max‐w-md mx-auto">
        <input
          type="text"
          placeholder="🔍 Search countries…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
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
