import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import ThreeWelcomeSplash from "./components/ThreeWelcomeSplash";

export const metadata = {
  title: "ApnaBiz - India's #1 Local Search & Discovery Engine",
  description: "Find 4.9 Cr+ verified local businesses, restaurants, hotels, doctors, and services in Odisha & India with instant WhatsApp quotes.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ApnaBiz",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#090d16",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="theme-color" content="#090d16" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased selection:bg-amber-500 selection:text-slate-950 touch-manipulation overscroll-none overflow-x-hidden">
        <ThemeProvider>
          <ThreeWelcomeSplash />
          <PWAInstallPrompt />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
