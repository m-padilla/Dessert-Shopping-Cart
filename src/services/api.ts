const BASE_URL = "https://desserts-shopping-cart-api.onrender.com/api";

export const getDesserts = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${BASE_URL}/dessert/${encodeURIComponent(query)}`
    : `${BASE_URL}/desserts`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch dessert", response.statusText);
  }

  const data = await response.json();

  return data;
};
