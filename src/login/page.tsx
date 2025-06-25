import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
export default function Login(){
  const {login} = useAuth();
  const router = useRouter();
  const [u,p] = useState(['','']);
  return (
    <form onSubmit={e=>{
      e.preventDefault();
      if(login(u,p)) router.push('/');
    }} className="max-w-md mx-auto p-4">
      <input type="text" placeholder="Username" onChange={e=>u(e.target.value)} className="block mb-2 w-full" />
      <input type="password" placeholder="Password" onChange={e=>p(e.target.value)} className="block mb-4 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
