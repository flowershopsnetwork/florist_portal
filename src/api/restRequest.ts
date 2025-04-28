import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "./apiConfig";

let token: string | null = null;

export const setToken = (newToken: string) => {
    token = newToken;
};

const getApiClient = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: API_CONFIG.BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    instance.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    return instance;
};

const api = getApiClient();

export const GET = <T = any>(
    path: string,
    config?: any
) => api.get<T>(path, config);

export const POST = <T = any>(
    path: string, 
    data: any, 
    config?: any
) => api.post<T>(path, data, config);

export const PUT = <T = any>(
    path: string, 
    data: any, 
    config?: any
) => api.put<T>(path, data, config);

export const DELETE = <T = any>(
    path: string, 
    config?: any
) => api.delete<T>(path, config);
