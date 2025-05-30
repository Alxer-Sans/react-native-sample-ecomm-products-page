import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../api-config";

export default function useGetCategoryId(data) {
    const queryClient = useQueryClient();

    return useQuery({
        queryFn: getCategoryApiId,
        queryKey: ["category", data],
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,
        onSuccess: () => {
            queryClient.invalidateQueries(["category", data]);
        },
    });
}

async function getCategoryApiId() {
    console.log("Fetching the Category from the API");

    try {
        const response = await fetch(`${BASE_URL}/api/categories/${data}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(!response.ok){
            throw new Error("Network response failked");
        }

        const res = await response.json();
        console.log("Fetched category successfully:", res);
        return res.data;
    }catch(error){
    throw new Error("Error fetching category: " + error.message);
    }
}