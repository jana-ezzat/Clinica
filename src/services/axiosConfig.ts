// src/services/axiosConfig.ts

import axios from "axios";
import tokenService from "./tokenService";

const axiosConfig = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosConfig.interceptors.request.use(
    (config) => {
        const token = tokenService.get();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

export default axiosConfig;