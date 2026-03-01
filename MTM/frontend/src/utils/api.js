import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true, // For refresh token cookie
});

// Request interceptor to attach access token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle 401s and refresh tokens
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Avoid infinite loops
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });

                // Save new access token
                localStorage.setItem('token', data.accessToken);

                // Retry the original request
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh token failed -> log the user out
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
