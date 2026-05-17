'use client';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../../lib/CartContext';
import { products } from '../../../data/products';
import ProductCard from '../../../components/ProductCard';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiArrowLeft, FiStar } from 'react-icons/fi';

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const product = products.find((p) => p._id === id);
  const related = products.filter((p) => p.category === product?.category && p._id !== id).slice(0, 4);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-gray-500">Product not found.</p>
        <Link href="/products" className="mt-4 inline-block text-white px-5 py-2" style={{ background: '#f47521' }}>Back to Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-orange-500">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-orange-500">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-600">{product.name}</span>
      </div>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* Image */}
        <div className="relative w-full border border-gray-200 bg-gray-50" style={{ height: '400px' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="50vw"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-gray-400 border border-gray-200 px-2 py-1 w-fit">{product.category}</span>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                size={16}
                className={star <= Math.round(product.rating) ? 'fill-current' : ''}
                style={{ color: star <= Math.round(product.rating) ? '#f47521' : '#ccc' }}
              />
            ))}
            <span className="text-sm text-gray-400 ml-1">({product.rating})</span>
          </div>

          <div className="text-3xl font-bold" style={{ color: '#f47521' }}>£{product.price.toFixed(2)}</div>
          <p className="text-xs text-gray-400">Our Price</p>

          <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{product.description}</p>

          {/* Stock */}
          <div className="flex items-center gap-2 text-sm">
            <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-gray-600">{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center gap-2 text-white px-6 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ background: '#f47521' }}
            >
              <FiShoppingCart />
              Add to Cart
            </button>
            <Link href="/cart" className="border border-gray-300 px-6 py-3 text-sm text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors">
              View Cart
            </Link>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
            {product.featured && <span className="text-xs px-2 py-1 border border-orange-300 text-orange-500">Featured</span>}
            {product.special && <span className="text-xs px-2 py-1 border border-blue-300 text-blue-500">Special</span>}
            {product.popular && <span className="text-xs px-2 py-1 border border-green-300 text-green-500">Popular</span>}
          </div>
        </div>
      </div>

      {/* Description Tab */}
      <div className="mb-12 border border-gray-200 p-6">
        <h2 className="font-bold text-gray-800 text-lg mb-3 pb-2 border-b border-gray-100">Product Description</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        <p className="text-sm text-gray-600 leading-relaxed mt-3">
          Each piece is carefully crafted using sustainably sourced and reclaimed wood. Our artisans apply traditional woodworking techniques passed down through generations, ensuring that every product is unique and of exceptional quality.
        </p>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="section-title mb-5">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link href="/products" className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500">
          <FiArrowLeft /> Back to All Products
        </Link>
      </div>
    </div>
  );
}
