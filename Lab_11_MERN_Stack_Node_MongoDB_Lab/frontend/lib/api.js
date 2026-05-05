const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Product API request failed");
  }

  const data = await response.json();
  return data.products || [];
};
