import { useAuth } from "@/hooks";
import { useAuthStore } from "@/stores/auth.store";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import * as secureStorage from "expo-secure-store";
const BASE_URL = Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:8080";
export const TOKEN_KEYS = {
  access: "access_token",
  refresh: "refresh-token",
};
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await secureStorage.getItemAsync(
          TOKEN_KEYS.refresh,
        );
        if (!refreshToken) throw new Error("No refresh token found");
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        await useAuthStore.getState().setSession(
            useAuthStore.getState().user!,
            data.accessToken,
            data.refreshToken ?? refreshToken
        )
       
        processQueue(null,data.accessToken)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError,null)
       await useAuthStore.getState().clearSession()
        return Promise.reject(refreshError)
      }finally{
        isRefreshing = false
      }
    }

    const status = error.response?.status

    const message = (error.response?.data as Record<string,string>)?.message ?? error.message

    if(status ===403) return Promise.reject(new Error('Forbidden' + message))
    if(status ===404) return Promise.reject(new Error('Not Found' + message))
    if(status ===422) return Promise.reject(new Error('Validation Error' + message))
    if(status  && status>=500) return Promise.reject(new Error('Server error' + message))

        return Promise.reject(error)
  },
);
