import "./globals.css";

export const metadata = {
  title: "Lab 11 Ecommerce Store",
  description: "A basic ecommerce app built with Next.js, Express, and MongoDB."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
