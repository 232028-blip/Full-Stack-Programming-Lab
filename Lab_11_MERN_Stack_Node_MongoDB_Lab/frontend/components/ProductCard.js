import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-mint">{product.category}</p>
            <h2 className="mt-1 text-lg font-bold leading-snug text-ink">{product.name}</h2>
          </div>
          <p className="rounded-md bg-amber/15 px-3 py-1 text-sm font-bold text-ink">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
          <span className="font-medium text-slate-700">{product.brand}</span>
          <span className="text-slate-500">{product.countInStock} in stock</span>
        </div>
      </div>
    </article>
  );
}
