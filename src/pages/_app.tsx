import '../styles/globals.css';

import { AuthProvider } from '../contexts/AuthContext';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import Navbar from '../components/Navbar';
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Navbar />
        <Component {...pageProps} />
      </FavoritesProvider>
    </AuthProvider>
  );
}