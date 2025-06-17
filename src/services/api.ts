import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5050",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Dispatch logout action to clear auth state
      store.dispatch(logout());

      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
