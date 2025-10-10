import axios from "axios";

export const api = axios.create({
  //baseURL: "http://backend:8080/api",
  baseURL: "http://192.168.0.24:8080/api",
  //baseURL: "http://localhost:8080/api",
  //baseURL: "https://localhost:8443/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
