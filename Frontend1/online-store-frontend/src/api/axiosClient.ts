import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de erro 
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // mapeamento de erros
    return Promise.reject(err);
  }
);

export default api;
