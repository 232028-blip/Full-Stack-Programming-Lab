import { products } from "../../data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) return notFound();

  return (
    <div className="max-w-lg mx-auto py-10">
      <Link href="/products" className="text-amber-700 hover:underline text-sm mb-6 block">
        ← Back to Products
      </Link>
      <h1 className="text-4xl font-bold text-amber-900 mb-3">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-2xl font-bold text-amber-700">PKR {product.price.toLocaleString()}</p>
    </div>
  );
}