import axios from "axios";

const ApiManager = axios.create({
    baseURL: "https://api.libellule.app/",
});


export const setupInterceptor = (getToken) => {
    ApiManager.interceptors.request.use(
        async (config) => {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

export default ApiManager;
