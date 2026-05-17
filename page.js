import Link from 'next/link';
import Image from 'next/image';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const brandLogos = ['QANTAS', 'GE Money', 'Rockwell Collins', 'LexisNexis', 'MultiMedia', 'f4p'];

const latestUpdates = [
  {
    id: 1,
    title: 'Lorem Ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan ante id nibh dapibus, blandit auctor ipsum consequat.',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80',
  },
  {
    id: 2,
    title: 'Lorem Ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan ante id nibh dapibus, blandit auctor ipsum consequat.',
    img: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=300&q=80',
  },
  {
    id: 3,
    title: 'Lorem Ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan ante id nibh dapibus, blandit auctor ipsum consequat.',
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&q=80',
  },
];

const collections = [
  { label: 'CHAIRS COLLECTION', cat: 'Chairs', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80' },
  { label: 'BEDS COLLECTION', cat: 'Beds', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80' },
  { label: 'TABLES COLLECTION', cat: 'Tables', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=80' },
];

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const special = products.filter((p) => p.special).slice(0, 4);
  const popular = products.filter((p) => p.popular).slice(0, 4);
  const spotlightProduct = products[0];

  return (
    <div>
      {/* Hero Banner Slider */}
      <HeroBanner />

      {/* Brand Logos Strip */}
      <div className="border-b border-t border-gray-200 bg-gray-50 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-6 items-center">
          {brandLogos.map((logo) => (
            <span key={logo} className="text-gray-400 font-semibold text-sm tracking-widest uppercase px-4 py-1 border border-gray-200">
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* Buy Online Banner */}
      <div className="max-w-6xl mx-auto px-4 my-6">
        <div className="text-white flex flex-col md:flex-row items-center justify-between px-8 py-5 gap-3" style={{ background: '#f5f0e0', border: '2px solid #f47521' }}>
          <div>
            <p className="text-2xl font-bold uppercase" style={{ color: '#f47521' }}>Buy Online</p>
            <p className="text-gray-700 font-semibold uppercase text-sm">Pick Up in Store</p>
          </div>
          <div className="text-right">
            <p className="text-gray-800 text-sm font-medium">Now available in our store system</p>
            <Link href="/products" className="text-sm font-bold underline" style={{ color: '#f47521' }}>Learn More</Link>
          </div>
        </div>
      </div>

      {/* Hot Deal */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h2 className="section-title">Hot Deal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Deal Card 1 */}
          <div className="relative overflow-hidden" style={{ height: '240px' }}>
            <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" alt="Deal 1" fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-5">
              <span className="text-white font-bold text-3xl">Sale Off 50%</span>
              <span className="text-gray-200 text-sm">Reclaimed and hand crafted</span>
              <Link href="/products" className="mt-2 text-sm font-bold text-white underline">Shop Now →</Link>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#f47521' }}>
              50%<br />Off
            </div>
          </div>
          {/* Deal Card 2 */}
          <div className="relative overflow-hidden" style={{ height: '240px' }}>
            <Image src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80" alt="Deal 2" fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-5">
              <span className="text-white font-bold text-2xl">Elite Collection</span>
              <span className="text-gray-200 text-sm">Best Design Furniture</span>
              <Link href="/products" className="mt-2 text-sm font-bold text-white underline">Explore →</Link>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#e63946' }}>
              35%<br />Off
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid — Featured / Special / Popular */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="section-title text-base">Featured</h3>
              <Link href="/products?type=featured" className="text-xs" style={{ color: '#f47521' }}>See All Feature</Link>
            </div>
            <div className="flex flex-col gap-3">
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
          {/* Special */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="section-title text-base">Special</h3>
              <Link href="/products?type=special" className="text-xs" style={{ color: '#f47521' }}>See All Special</Link>
            </div>
            <div className="flex flex-col gap-3">
              {special.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
          {/* Popular */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="section-title text-base">Popular</h3>
              <Link href="/products?type=popular" className="text-xs" style={{ color: '#f47521' }}>See All Popular</Link>
            </div>
            <div className="flex flex-col gap-3">
              {popular.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Collections */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h2 className="section-title">Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections.map((col) => (
            <Link key={col.cat} href={`/products?category=${col.cat}`} className="relative overflow-hidden group block" style={{ height: '200px' }}>
              <Image src={col.img} alt={col.label} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white font-bold text-lg uppercase leading-tight block">{col.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Updates */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h2 className="section-title">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestUpdates.map((update) => (
            <div key={update.id} className="border border-gray-200">
              <div className="relative w-full" style={{ height: '160px' }}>
                <Image src={update.img} alt={update.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800 mb-2">{update.title}</h4>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">{update.body}</p>
                <button className="text-xs px-4 py-1 text-white" style={{ background: '#f47521' }}>Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spotlight Product */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-6 border border-gray-200 p-6 bg-gray-50">
          <div className="relative flex-shrink-0" style={{ width: 260, height: 220 }}>
            <Image src={spotlightProduct.image} alt={spotlightProduct.name} fill className="object-contain" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{spotlightProduct.name}</h3>
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">{spotlightProduct.description}</p>
            <div className="text-2xl font-bold mb-1" style={{ color: '#f47521' }}>£{spotlightProduct.price.toFixed(2)}</div>
            <p className="text-xs text-gray-400 mb-4">Our Price</p>
            <Link
              href={`/product/${spotlightProduct._id}`}
              className="inline-block text-white px-6 py-2 text-sm font-medium"
              style={{ background: '#f47521' }}
            >
              Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
