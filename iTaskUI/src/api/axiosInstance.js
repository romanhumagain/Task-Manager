import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";

const createAxiosInstance = () => {
  const { authToken } = useAuth();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Adding a request interceptor to dynamically set the Authorization header
  axiosInstance.interceptors.request.use(
    (requestConfig) => {
      if (authToken && authToken.access) {
        requestConfig.headers.Authorization = `Bearer ${authToken.access}`;
      }
      return requestConfig;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
