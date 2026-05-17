'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import { products, categories } from '../../data/products';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const typeParam = searchParams.get('type') || '';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  let filtered = [...products];

  if (activeCategory !== 'All') {
    filtered = filtered.filter((p) => p.category === activeCategory);
  }

  if (typeParam === 'featured') filtered = filtered.filter((p) => p.featured);
  if (typeParam === 'special') filtered = filtered.filter((p) => p.special);
  if (typeParam === 'popular') filtered = filtered.filter((p) => p.popular);

  if (searchTerm) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
          {typeParam ? `${typeParam.charAt(0).toUpperCase() + typeParam.slice(1)} Products` : activeCategory === 'All' ? 'All Products' : activeCategory}
        </h1>
        <p className="text-sm text-gray-400 mt-1">{filtered.length} products found</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-56 flex-shrink-0">
          <div className="border border-gray-200 p-4 mb-4">
            <h3 className="font-bold text-sm text-gray-700 uppercase mb-3 tracking-wide">Categories</h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left text-sm py-1 px-2 hover:text-orange-500 transition-colors ${activeCategory === cat ? 'font-bold text-orange-500 border-l-2 border-orange-500' : 'text-gray-600'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-200 p-4">
            <h3 className="font-bold text-sm text-gray-700 uppercase mb-3 tracking-wide">Price Range</h3>
            <div className="text-xs text-gray-500 space-y-1">
              <div>£50 – £100</div>
              <div>£100 – £200</div>
              <div>£200 – £500</div>
              <div>£500+</div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5 items-start sm:items-center justify-between">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 px-3 py-2 text-sm w-full sm:w-60 outline-none"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 px-3 py-2 text-sm outline-none"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No products found.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
                className="mt-4 text-sm text-white px-5 py-2"
                style={{ background: '#f47521' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
