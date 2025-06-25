import { createContext, useState, ReactNode, useEffect } from 'react';
export const FavoritesContext = createContext<{favorites:string[]; toggle:(c:string)=>void}>({favorites:[],toggle:()=>{}});
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem('fav')||'[]');
    setFavorites(saved);
  },[]);
  const toggle = (code:string) => {
    setFavorites(prev => {
      const next = prev.includes(code) ? prev.filter(x=>x!==code) : [...prev,code];
      localStorage.setItem('fav', JSON.stringify(next));
      return next;
    });
  };
  return <FavoritesContext.Provider value={{favorites,toggle}}>{children}</FavoritesContext.Provider>;
}
