// import api from './api'; // Ensure this points to your configured Axios instance
import axios from 'axios';

const JOB_POSTS_BASE_PATH = 'http://localhost:5000/api/jobs'; // Matches your backend /api/jobs route

export const getAllJobPosts = async () => {
  try {
    const response = await axios.get(JOB_POSTS_BASE_PATH);
    return response.data;
  } catch (error) {
    console.error('Error fetching job posts:', error);
    throw error;
  }
};

export const getJobPostById = async (id) => {
  try {
    const response = await axios.get(`${JOB_POSTS_BASE_PATH}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job post with ID ${id}:`, error);
    throw error;
  }
};

export const createJobPost = async (jobData) => {
  try {
    const response = await axios.post(JOB_POSTS_BASE_PATH, jobData);
    return response.data;
  } catch (error) {
    console.error('Error creating job post:', error);
    throw error;
  }
};

export const updateJobPost = async (id, jobData) => {
  try {
    const response = await axios.patch(`${JOB_POSTS_BASE_PATH}/${id}`, jobData); // Using PATCH as per your backend route
    return response.data;
  } catch (error) {
    console.error(`Error updating job post with ID ${id}:`, error);
    throw error;
  }
};

export const deleteJobPost = async (id) => {
  try {
    const response = await axios.delete(`${JOB_POSTS_BASE_PATH}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting job post with ID ${id}:`, error);
    throw error;
  }
};