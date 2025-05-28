import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../api-config";

export default function useGetProducts() {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: getProductsApi,
    queryKey: ["products"],
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}

async function getProductsApi() {
  console.log("Fetching products from API...");

  try {
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();

    console.log("Fetched products successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
}
