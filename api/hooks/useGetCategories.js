import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../api-config";

export default function useGetCategories() {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: getCategoriesApi,
    queryKey: ["categories"],
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  })
}

async function getCategoriesApi() {
  console.log("Fetching categories from API...");

  try {
    const response = await fetch(`${BASE_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();

    console.log("Fetched categories successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
} 