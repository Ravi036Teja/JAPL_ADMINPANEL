// src/api/applicationApi.js
 // Assuming your axios instance is configured here
import axios from 'axios';

const APPLICATIONS_BASE_PATH = 'http://localhost:5000/api/applications'; // This will be your new backend route

export const submitJobApplication = (formData) => {
  // Use api.post directly with FormData. Axios automatically sets
  // 'Content-Type': 'multipart/form-data' with the correct boundary.
  return axios.post(APPLICATIONS_BASE_PATH, formData);
};

// Add other application-related API calls for the admin panel here
export const getAllApplications = () => axios.get(APPLICATIONS_BASE_PATH);
// export const getApplicationById = (id) => api.get(`${APPLICATIONS_BASE_PATH}/${id}`);
// export const updateApplicationStatus = (id, status) => api.patch(`${APPLICATIONS_BASE_PATH}/${id}/status`, { status });