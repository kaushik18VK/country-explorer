import { createContext, useState, ReactNode, useEffect, useContext } from 'react';

interface Auth {
  user: string | null;
  login: (u: string, p: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<Auth>({
  user: null,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(saved);
  }, []);

  const login = (u: string, p: string) => {
    if (u === 'testuser' && p === 'password123') {
      setUser(u);
      localStorage.setItem('user', u);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Add this custom hook and export it as a named export
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
