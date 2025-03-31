import axios from "axios"
import { createUserDto, loginUserDto, Product, Tags, ProductStatus } from "./types";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_URL,
    withCredentials: true,
})

export const createUser = async (data: createUserDto) => {
    const res = await api.post("/user", data);
    return res
}

export const loginUser = async (data: loginUserDto) => {
    const res = await axios.post("/api/auth/login", data, {
        withCredentials: true,
    });
    return res
}

export const logout = async () => {
    const res = await axios.get("/api/auth/logout",
        {
            withCredentials: true,
        }
    );
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

export const getTags = async (): Promise<Tags[]> => {
    const res = await api.get("/tags");
    return res.data; 
}

export const getUserPreferredTags = async () : Promise<Tags[]> => {
    const res = await api.get(`/user/tags`); 
    return res.data;
};

export const updateUserPreferredTags = async (data: {tags: Tags[] }) => {
    const res = await api.post(`/user/tags`, { tags: data.tags });
    return res.data;
};

export const getProductsByUserTags = async (): Promise<Product[]> => {
    const response = await api.get(`/products/tags`);
    return response.data;
}
