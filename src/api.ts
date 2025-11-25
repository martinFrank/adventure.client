import axios from "axios";

export const api = axios.create({ 
  //for production
  // baseURL: "https://elitegames.v6.rocks/adventure-game-api"

  //for local development
  baseURL: "https://localhost:8080/adventure-game-api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
