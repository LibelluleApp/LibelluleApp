import axios from "axios";

// Create an instance of axios
const ApiManager = axios.create({
  baseURL: "https://dev.libellule.app/",
});

// Function to set up the interceptor with the auth state
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
