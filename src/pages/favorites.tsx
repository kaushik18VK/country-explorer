import { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import CountryCard from '../components/CountryCard';
import { fetchCountries } from '../lib/api';

export default function Favorites({ countries }: { countries: any[] }) {
  const { favorites } = useFavorites();
  const [search, setSearch] = useState('');

  // only keep the ones you’ve favorited, then apply the search filter
  const favList = countries
    .filter((c) => favorites.includes(c.cca2))
    .filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <div className="p-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="🔍 Search favorites…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favList.map((c) => (
          <CountryCard key={c.cca2} country={c} />
        ))}
      </div>
    </>
  );
}

 export async function getStaticProps() {
   const data = await fetchCountries();
   return { props: { countries: data } };
 }
