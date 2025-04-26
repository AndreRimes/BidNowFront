import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getHiglightProduct, getHiglightProducts, getMyProducts, getProductById, getProductsWhereUserBid, getProductsRecommended } from "./api";




export const useGetAllProducts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: () => getAllProducts(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 60,
    });
    return { data, isLoading, error };
}

export const useRecommendedProducts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["tagged-products", "products"],
        queryFn: () => getProductsRecommended(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 60,
    });
    return { data, isLoading, error };
}

export const useGetHighlightProducts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["highlight-products", "products"],
        queryFn: () => getHiglightProducts(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 60,
    });

    return { data, isLoading, error };
}

export const useGetProductsWhereUserBid = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["products-where-user-bid", "products"],
        queryFn: () => getProductsWhereUserBid(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 60,
    });
    return { data, isLoading, error };
}

export const useGetHighlightProduct = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["highlight-product", "products"],
        queryFn: () => getHiglightProduct(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 60,
    });
    return { data, isLoading, error };
}

export const useGetMyProducts = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["my-products", "products"],
        queryFn: () => getMyProducts(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 60,
    });
    return { data, isLoading, error };
}

export const useGetProductById = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: [id, "products"],
        queryFn: () => getProductById(id),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 60,
    });
    return { data, isLoading, error };
}
