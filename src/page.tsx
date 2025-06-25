"use client";
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCountries } from './lib/api';
import CountryCard from './components/CountryCard';
import { useState, useEffect as useClientEffect } from 'react';
import Login from './pages/login';

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [countries, setCountries] = useState<any[]>([]);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Fetch countries on client
  useClientEffect(() => {
    fetchCountries().then(data => setCountries(data));
  }, []);

  if (!user) {
    return <Login></Login>; // or a loading spinner
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map((c: any) => (
        <CountryCard key={c.cca2} country={c} />
      ))}
    </div>
  );
}
