// // admin-frontend/src/api/blogApi.js
import axios from 'axios';

const API_BASE_URL = 'https://japl-backend.onrender.com/api/blogs'; // Your backend API base URL

// NOTE: In a real app, you'd send an Authorization header with a token
// const config = (token) => ({
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }
// });

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs for admin:', error);
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    // const token = localStorage.getItem('token'); // Get token from local storage
    const response = await axios.post(API_BASE_URL, blogData); // , config(token)
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    // The issue is likely here:
    // Ensure API_BASE_URL is a plain string and id is interpolated correctly
    const response = await axios.put(`${API_BASE_URL}/${id}`, blogData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog with ID ${id}:`, error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    // const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_BASE_URL}/${id}`); // , config(token)
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog with ID ${id}:`, error);
    throw error;
  }
};

// admin-frontend/src/api/blogApi.js
// src/api/blogApi.js
// import api from './api'; // Import the configured axios instance

// // Correct: BLOGS_BASE_PATH should be only the *relative* path from the API_BASE_URL
// // The API_BASE_URL in api.js is 'http://localhost:5000/api'
// // So, the path for blogs starts *after* that.
// const BLOGS_BASE_PATH = '/blogs'; // <--- THIS IS THE CORRECT RELATIVE PATH

// export const getAllBlogs = async () => {
//   try {
//     const response = await api.get(BLOGS_BASE_PATH); // Correctly forms http://localhost:5000/api/blogs
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching blogs for admin:', error);
//     throw error;
//   }
// };

// export const createBlog = async (blogData) => {
//   try {
//     const response = await api.post(BLOGS_BASE_PATH, blogData); // Correctly forms http://localhost:5000/api/blogs
//     return response.data;
//   } catch (error) {
//     console.error('Error creating blog:', error);
//     throw error;
//   }
// };

// export const updateBlog = async (id, blogData) => {
//   try {
//     const response = await api.patch(`${BLOGS_BASE_PATH}/${id}`, blogData); // Correctly forms http://localhost:5000/api/blogs/{id}
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating blog with ID ${id}:`, error);
//     throw error;
//   }
// };

// export const deleteBlog = async (id) => {
//   try {
//     const response = await api.delete(`${BLOGS_BASE_PATH}/${id}`); // Correctly forms http://localhost:5000/api/blogs/{id}
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting blog with ID ${id}:`, error);
//     throw error;
//   }
// };