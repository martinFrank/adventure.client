import axios from "axios"; 

const basePath = process.env.VITE_FRONTEND_SUBPATH;

export const api = axios.create({    
  baseURL: basePath 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
