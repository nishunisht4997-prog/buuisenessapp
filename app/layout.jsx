import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata = {
  title: "ApnaBiz - India's #1 Local Search & Discovery Engine",
  description: "Find 4.9 Cr+ verified local businesses, restaurants, hotels, doctors, and services in Odisha & India with instant WhatsApp quotes.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="antialiased selection:bg-amber-500 selection:text-slate-950 touch-manipulation overscroll-none overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
