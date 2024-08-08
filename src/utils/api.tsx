import axios from "axios";
const api = axios.create({
  // baseURL: `https://erne-legacy-telegram-app-backend.onrender.com`,
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
