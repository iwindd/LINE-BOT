import instance from 'axios';

export const url = import.meta.env.VITE_BACKEND_URL

const axios = instance.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

// Export the configured Axios instance as the default export
export default axios;