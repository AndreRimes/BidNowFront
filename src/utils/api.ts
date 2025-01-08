import axios from "axios"
import { createUserDto, loginUserDto } from "./types";

export const api = axios.create({
    baseURL: "http://localhost:3333",
    withCredentials: true,
})

export const internalAPI = axios.create({
    baseURL: "http://localhost:3000",
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
