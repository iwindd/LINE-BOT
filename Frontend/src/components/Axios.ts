import axios from 'axios';

export const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
});

// Export the configured Axios instance as the default export
export default axiosInstance;