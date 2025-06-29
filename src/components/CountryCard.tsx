import Link from 'next/link';
import { useFavorites } from '../hooks/useFavorites';
export default function CountryCard({country}:{country:any}){
  const {favorites,toggle} = useFavorites();
  const fav = favorites.includes(country.cca2);
  return (
    <div className="border p-4 rounded shadow">
      <img src={country.flags.svg} alt={country.name.common} className="h-24 w-full object-cover"/>
      <h2 className="mt-2 font-bold">{country.name.common}</h2>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital?.[0]}</p>
      <div className="space-y-2">
    <div>
      <strong>Currencies:</strong>{' '}
      {country.currencies
        ? Object.entries(country.currencies)
            .map(([code, { name, symbol }]) => `${name} (${symbol})`)
            .join(', ')
        : 'N/A'}
    </div>
    <div>
      <strong>Languages:</strong>{' '}
      {country.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A'}
    </div>
  </div>
      <button onClick={()=>toggle(country.cca2)} className="mt-2">
        {fav ? '★' : '☆'}
      </button>
      <Link href={`/country/${country.cca2}`} className="text-blue-600">Details</Link>
    </div>
  );
}