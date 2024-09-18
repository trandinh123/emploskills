import Axios, { InternalAxiosRequestConfig } from "axios";

import { API_URL, IS_PRODUCTION } from "@/config/env";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    if (config.headers) {
        config.headers.Accept = "application/json";
    }

    config.withCredentials = true;
    return config;
}

export const api = Axios.create({
    baseURL: IS_PRODUCTION ? API_URL : "/"
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
