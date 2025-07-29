// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem('token');
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default API;


// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// // Add request interceptor to include token
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

// Previos working code below code

import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://japl-backend.onrender.com/api',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or your token storage method
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;




// user-frontend/src/api/api.js (or axiosInstance.js)
// src/api/api.js (Recommended structure)
// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// // Log for debugging:
// console.log('Frontend Axios Base URL:', API_BASE_URL);

// const api = axios.create({
//   baseURL: API_BASE_URL, // This should be 'http://localhost:5000/api'
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Interceptor to attach JWT token for authenticated routes (crucial for admin operations)
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jwtToken'); // Or 'token', based on how you store it
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;