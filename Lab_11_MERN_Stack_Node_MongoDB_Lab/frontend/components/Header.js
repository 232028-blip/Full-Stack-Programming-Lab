export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div>
          <p className="text-sm font-semibold uppercase text-mint">MERN Ecommerce</p>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">Lab 11 Storefront</h1>
        </div>
        <div className="hidden rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 sm:block">
          Next.js + Express + MongoDB
        </div>
      </div>
    </header>
  );
}
