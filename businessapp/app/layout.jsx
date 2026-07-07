import "./globals.css";

export const metadata = {
  title: "BusinessApp",
  description: "Find Businesses Near You",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
