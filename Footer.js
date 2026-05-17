import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-10">
      {/* Orange stripe */}
      <div className="h-1" style={{ background: '#f47521' }} />

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-white font-bold text-xl mb-3">
            Rustik <span style={{ color: '#f47521' }}>Plank</span>
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Handcrafted and reclaimed wood furniture. Every piece tells a story built with care and tradition.
          </p>
          <div className="flex gap-3 mt-4">
            <FiFacebook className="hover:text-orange-400 cursor-pointer" size={18} />
            <FiTwitter className="hover:text-orange-400 cursor-pointer" size={18} />
            <FiInstagram className="hover:text-orange-400 cursor-pointer" size={18} />
            <FiYoutube className="hover:text-orange-400 cursor-pointer" size={18} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase text-sm tracking-wide">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link href="/products" className="hover:text-orange-400">All Products</Link></li>
            <li><Link href="/about" className="hover:text-orange-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400">Contact Us</Link></li>
            <li><Link href="/cart" className="hover:text-orange-400">My Cart</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase text-sm tracking-wide">Categories</h4>
          <ul className="space-y-2 text-sm">
            {['Tables', 'Chairs', 'Beds', 'Bookcases', 'Cabinets', 'Boxes'].map((cat) => (
              <li key={cat}>
                <Link href={`/products?category=${cat}`} className="hover:text-orange-400">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase text-sm tracking-wide">Contact Info</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>123 Wood Street, Craftsville</li>
            <li>Phone: +44 7534 021409</li>
            <li>Email: info@rustikplank.com</li>
            <li>Mon–Sat: 9:00 AM – 6:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-500">
        © 2024 Rustik Plank Furniture. All Rights Reserved.
      </div>
    </footer>
  );
}
