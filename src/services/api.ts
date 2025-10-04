
const BASE_URL = "http://localhost:3000/api";

export const getDesserts = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${BASE_URL}/dessert/${encodeURIComponent(query)}`
    : `${BASE_URL}/desserts`;

    // console.log("endpoint", endpoint)
    
  const response = await fetch(endpoint);

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch dessert", response.statusText);
  }

  const data = await response.json();
  // console.log("🍰 API response:", data);
return data;

  // return data;
};