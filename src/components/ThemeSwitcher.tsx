"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme;

  return (
    <button
      onClick={() => {
        console.log("Clicked!", currentTheme);
        setTheme(currentTheme === "dark" ? "light" : "dark");
      }}
      className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle theme"
      type="button"
    >
      {currentTheme === "dark" ? "🌞" : "🌜"}
    </button>
  );
}
