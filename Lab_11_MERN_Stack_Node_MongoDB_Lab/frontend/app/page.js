import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/api";

export default async function Home() {
  let products = [];
  let errorMessage = "";

  try {
    products = await getProducts();
  } catch (error) {
    errorMessage = "Start the backend server and MongoDB, then refresh this page to load products.";
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-mint">Product Catalog</p>
            <h2 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">Fresh products from MongoDB</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            This storefront fetches product records from the Express API and displays them in a responsive Next.js interface.
          </p>
        </div>

        {errorMessage ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800">
            <h3 className="text-lg font-bold">Products could not be loaded</h3>
            <p className="mt-2 text-sm leading-6">{errorMessage}</p>
          </div>
        ) : null}

        {!errorMessage && products.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700">
            No products found. Run <span className="font-semibold">npm run seed</span> inside the backend folder.
          </div>
        ) : null}

        {products.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
