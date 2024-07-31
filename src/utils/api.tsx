import axios from 'axios';
const api = axios.create({
    // baseURL: `https://mike-token-backend-1.onrender.com/api`,
    baseURL: 'https://erne-legacy-telegram-app-backend.onrender.com',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export default api;