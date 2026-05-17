'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../lib/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="border border-gray-200 bg-white flex flex-col hover:shadow-lg transition-shadow duration-200">
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        <p className="text-xs text-gray-400 uppercase tracking-wide">{product.category}</p>
        <p className="text-sm font-medium text-gray-700 line-clamp-1">{product.name}</p>
        <p className="text-sm text-gray-500 line-clamp-2 text-xs">{product.description}</p>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="font-bold text-gray-800">£{product.price.toFixed(2)}</span>
          <div className="flex gap-1">
            <Link
              href={`/product/${product._id}`}
              className="text-xs px-2 py-1 bg-gray-600 text-white hover:bg-gray-800 transition-colors"
            >
              Detail
            </Link>
            <button
              onClick={handleAddToCart}
              className="text-xs px-2 py-1 text-white hover:opacity-90 transition-opacity"
              style={{ background: '#f47521' }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
