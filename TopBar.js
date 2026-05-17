'use client';
export default function TopBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-200 text-xs text-gray-600 hidden md:block">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-1">
        <div className="flex gap-4">
          <span className="hover:text-orange-500 cursor-pointer">Terms and Conditions</span>
          <span className="hover:text-orange-500 cursor-pointer">About us</span>
          <span className="hover:text-orange-500 cursor-pointer">Sitemap</span>
          <span className="hover:text-orange-500 cursor-pointer">Contact</span>
          <span className="hover:text-orange-500 cursor-pointer">Return Policy</span>
          <span className="hover:text-orange-500 cursor-pointer">Suppliers</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:text-orange-500 cursor-pointer">Your Account</span>
          <span className="hover:text-orange-500 cursor-pointer">Orders History</span>
          <span className="hover:text-orange-500 cursor-pointer">Addresses</span>
          <span className="hover:text-orange-500 cursor-pointer">Information</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:text-orange-500 cursor-pointer">Search Terms</span>
          <span className="hover:text-orange-500 cursor-pointer">Advanced Search</span>
          <span className="hover:text-orange-500 cursor-pointer">Specials</span>
          <span className="hover:text-orange-500 cursor-pointer">New products</span>
        </div>
      </div>
    </div>
  );
}
