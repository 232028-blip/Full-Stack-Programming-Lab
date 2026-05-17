'use client';
import Link from 'next/link';
import { useCart } from '../lib/CartContext';
import { useState } from 'react';
import { FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  const categories = ['Home', 'Beds', 'Cabinets', 'Bookcases', 'Boxes', 'Chairs', 'Tables'];

  return (
    <header>
      {/* Main header row */}
      <div className="bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="text-gray-800">Rustik</span>
              <span style={{ color: '#f47521' }}> Plank</span>
            </div>
            <div className="text-xs text-gray-400 tracking-widest uppercase">Furniture</div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:flex items-center border border-gray-300">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button className="px-3 py-2 text-white text-sm" style={{ background: '#f47521' }}>
              <FiSearch />
            </button>
          </div>

          {/* Right: Account & Cart */}
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-gray-600 hover:text-orange-500 hidden md:block">
              About Us
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-orange-500 hidden md:block">
              Contact Us
            </Link>
            <Link href="/cart" className="relative flex items-center gap-1 text-gray-700 hover:text-orange-500">
              <FiShoppingCart size={22} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  style={{ background: '#f47521' }}
                >
                  {totalItems}
                </span>
              )}
              <span className="text-sm hidden md:block">Cart</span>
            </Link>
            {/* Mobile hamburger */}
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className="hidden md:block" style={{ background: '#f47521' }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-0">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === 'Home' ? '/' : `/products?category=${cat}`}
              className="text-white text-sm font-medium px-5 py-2 hover:bg-orange-700 transition-colors"
            >
              {cat}
            </Link>
          ))}
          <Link href="/products" className="text-white text-sm font-medium px-5 py-2 hover:bg-orange-700 transition-colors ml-auto">
            All Products
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center border border-gray-300 mb-3">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button className="px-3 py-2 text-white" style={{ background: '#f47521' }}>
              <FiSearch />
            </button>
          </div>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === 'Home' ? '/' : `/products?category=${cat}`}
              className="block py-2 text-sm text-gray-700 border-b border-gray-100 hover:text-orange-500"
              onClick={() => setMobileOpen(false)}
            >
              {cat}
            </Link>
          ))}
          <Link href="/about" className="block py-2 text-sm text-gray-700" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link href="/contact" className="block py-2 text-sm text-gray-700" onClick={() => setMobileOpen(false)}>Contact Us</Link>
        </div>
      )}
    </header>
  );
}
