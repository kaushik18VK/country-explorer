"use client";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <Link href="/" className="font-bold text-lg">
          Home
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        {user ? (
          <>
            <Link href="/favorites">Favorites</Link>
            <button
              onClick={logout}
              className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
