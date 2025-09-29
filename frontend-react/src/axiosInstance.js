import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    // handle failed response
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axiosInstance.post('/auth/token/refresh/', { refresh: refreshToken });
                localStorage.setItem('accessToken', response.data.access);
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

                // localStorage.setItem('refreshToken', response.data.refresh);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(refreshError);
    }
)

export default axiosInstance;