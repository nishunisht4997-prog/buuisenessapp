import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata = {
  title: "ApnaBiz - India's #1 Local Search & Discovery Engine",
  description: "Find 4.9 Cr+ verified local businesses, restaurants, hotels, doctors, and services in Odisha & India with instant WhatsApp quotes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="antialiased selection:bg-amber-500 selection:text-slate-950">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
