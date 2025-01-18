import axios from "axios"
import { createUserDto, loginUserDto, Product, ProductStatus } from "./types";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_URL,
    withCredentials: true,
})

export const internalAPI = axios.create({
    baseURL: "/",
    withCredentials: true,
})

export const createUser = async (data: createUserDto) => {
    const res = await api.post("/user", data);
    return res
}

export const loginUser = async (data: loginUserDto) => {
    const res = await axios.post("/api/auth/login", data);
    return res
}

export const logout = async () => {
    const res = await internalAPI.get("/api/auth/logout");
    return res
}

export const createProduct = async (data: FormData) => {
    const res = await api.post("/products", data, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
);
    return res;
}

export const getProductsWhereUserBid = async (): Promise<Product[]> => {
    const res = await api.get("/products/where-user-bid");
    return res.data;
}

export const getHiglightProduct = async (): Promise<Product> => {
    const res = await api.get("/products/highlight");
    return res.data;
}


export const getAllProducts = async (): Promise<Product[]> => {
    const res = await api.get("/products");
    return res.data;
}

export const getHiglightProducts = async (): Promise<Product[]> => {
    const res = await api.get("/products/all-highlight");
    return res.data;
}


export const getMyProducts = async (): Promise<Product[]> => {
    const res = await api.get("/products/my-products");
    console.log(res);
    return res.data;
}

export const getProductById = async (id: string): Promise<Product> => {
    const res = await api.get(`/products/${id}`);
    return res.data;
}

export const updateProductStatus = async (id: string, status: ProductStatus): Promise<Product> => {
    const res = await api.patch(`/products/status/${id}`, { status });
    return res.data;
}

export const deleteProduct = async (id: string) => {
    const res = await api.delete(`/products/${id}`);
    return res;
}