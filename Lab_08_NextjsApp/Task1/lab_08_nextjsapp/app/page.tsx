import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-amber-900 mb-4">Welcome to WoodCraft</h1>
      <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
        Discover handcrafted furniture built to last. Quality wood, timeless design.
      </p>
      <Link
        href="/products"
        className="bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition font-semibold"
      >
        Browse Our Products
      </Link>
    </div>
  );
}