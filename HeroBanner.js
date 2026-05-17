'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'Reclaimed and Hand Crafted',
    subtitle: 'Sale Off 50%',
    bg: 'from-stone-800 to-stone-600',
    badge: '50% OFF',
    badgeColor: '#f47521',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    cta: 'Shop Now',
    link: '/products',
  },
  {
    id: 2,
    title: 'Elite Design Furniture',
    subtitle: 'Sale Off 35%',
    bg: 'from-amber-900 to-amber-700',
    badge: '35% OFF',
    badgeColor: '#e63946',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    cta: 'Explore Collection',
    link: '/products',
  },
  {
    id: 3,
    title: 'Buy Online, Pick Up in Store',
    subtitle: 'Now Available on All Products',
    bg: 'from-stone-700 to-stone-500',
    badge: 'NEW',
    badgeColor: '#2a9d8f',
    image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=800&q=80',
    cta: 'Learn More',
    link: '/products',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '420px' }}>
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-70`} />

      <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-8">
        <span
          className="inline-block text-white text-sm font-bold px-4 py-1 mb-4 w-fit"
          style={{ background: slide.badgeColor }}
        >
          {slide.badge}
        </span>
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 leading-tight">
          {slide.title}
        </h1>
        <p className="text-gray-200 text-lg mb-6">{slide.subtitle}</p>
        <Link
          href={slide.link}
          className="text-white font-semibold px-6 py-3 w-fit transition-opacity hover:opacity-90"
          style={{ background: '#f47521' }}
        >
          {slide.cta}
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-orange-500 scale-125' : 'bg-white opacity-60'}`}
          />
        ))}
      </div>
    </div>
  );
}
