import Link from "next/link";
import { products } from "../data/products";

export default function ProductList() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-amber-900 mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-5 border border-amber-100">
            <h2 className="text-xl font-semibold text-amber-800 mb-2">{p.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{p.description}</p>
            <p className="text-amber-700 font-bold mb-4">PKR {p.price.toLocaleString()}</p>
            <Link
              href={`/products/${p.id}`}
              className="bg-amber-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}