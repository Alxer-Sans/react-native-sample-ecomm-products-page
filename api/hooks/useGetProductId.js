import {useQuery, useQueryClient } from "@tanstack/react-query";
import {BASE_URL} from "../api-config";

export default function useGetProductsId(data) {
    const queryClient = useQueryClient();

    return useQuery({
        queryFn: () => getProductsApiId(data),
        queryKey: ["product", data],
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 5,
        onSuccess: () => {
            queryClient.invalidateQueries(["products", data]);
        },
    });
}

async function getProductsApiId(data){
    console.log("Fetching product_id from API");

    try {
        const response = await fetch(`${BASE_URL}/api/products/${data}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok){
            throw new Error("Network response failed");
        }

        const res = await response.json();
        console.log("Fetch products successfully:", res);
        return res.data;
    }catch(error) {
        throw new Error("Error fetching product:" + error.message);
    }
}