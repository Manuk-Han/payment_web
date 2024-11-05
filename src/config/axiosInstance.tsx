import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API 요청 중 오류 발생:", error);
        if (error.response && error.response.status === 401) {
            console.log("인증 오류 - 다시 로그인 필요");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
