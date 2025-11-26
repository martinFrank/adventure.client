import axios from "axios"; 


const basePath = import.meta.env.VITE_BACKEND_API_URL; 

export const api = axios.create({    
  baseURL: basePath 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
