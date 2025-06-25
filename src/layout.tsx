import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <html lang="en" suppressHydrationWarning>
        <body>
          <button onClick={() => document.documentElement.classList.toggle('dark')}>
            Toggle Dark (manual)
          </button>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
