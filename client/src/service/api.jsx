import axios from "axios";

const api = axios.create({
    baseURL: "/api", // Vite proxy handles this in dev; server handles it in prod
    withCredentials: true, // Enable cookies for session
});

// Remove JWT request interceptor

// Add a response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Session expired or invalid
            // Ideally notify AuthContext, but for now we can just let the error propagate
            // allowing the component (e.g. AuthContext) to handle it.
            // window.location.href = '/login'; // Let the app handle navigation state
        }
        return Promise.reject(error);
    }
);

export default api;
