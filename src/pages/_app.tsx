// src/pages/_app.tsx
import '../styles/globals.css';

import { AuthProvider } from '../contexts/AuthContext';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import Navbar from '../components/Navbar';
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
    <AuthProvider>
      <FavoritesProvider>
        <Navbar />
        <Component {...pageProps} />
      </FavoritesProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}