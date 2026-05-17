import './globals.css';
import { CartProvider } from '../lib/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Rustik Plank - Furniture',
  description: 'Reclaimed and hand crafted furniture store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Toaster position="top-right" />
          <TopBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
