import axios from "axios";
const api = axios.create({
  // baseURL: `http://139.59.234.168:5000/api`,
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
