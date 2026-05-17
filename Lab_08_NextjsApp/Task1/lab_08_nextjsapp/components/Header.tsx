import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-amber-900 text-amber-50 px-8 py-4 flex items-center justify-between shadow-md">
      <Link href="/" className="text-2xl font-bold tracking-tight hover:text-amber-200 transition">
        🪑 WoodCraft Furniture
      </Link>
      <nav className="flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-amber-300 transition">Home</Link>
        <Link href="/products" className="hover:text-amber-300 transition">Products</Link>
        <Link href="/about" className="hover:text-amber-300 transition">About</Link>
        <Link href="/contact" className="hover:text-amber-300 transition">Contact</Link>
      </nav>
    </header>
  );
}