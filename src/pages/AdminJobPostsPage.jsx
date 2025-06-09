// src/pages/AdminJobPostsPage.jsx
import React, { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa'; // For the Add button icon
import {
  getAllJobPosts,
  createJobPost,
  updateJobPost,
  deleteJobPost,
} from '../api/jobapi'; // Your API service
import JobPostsTable from '../components/JobPostsTable';
import JobPostForm from '../components/JobPostForm';
import Modal from '../components/Modal'; // Custom Modal component
import Notification from '../components/Notifications'; // Custom Notification component
import Navbar from '../components/Navbar';

function AdminJobPostsPage() {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // Job being edited
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [notification, setNotification] = useState(null); // { message, type }

  // --- Notification Helper ---
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  // --- Fetch Job Posts ---
  const fetchJobPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllJobPosts();
      setJobPosts(data);
    } catch (err) {
      setError('Failed to fetch job posts. Please try again.');
      showNotification('Failed to load job posts.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPosts();
  }, []); // Run once on component mount

  // --- CRUD Handlers ---

  const handleAddJob = () => {
    setSelectedJob(null); // Clear any previously selected job
    setModalType('add');
    setIsModalOpen(true); // Open the modal for adding
  };

  const handleEditJob = (job) => {
    setSelectedJob(job); // Set the job to be edited
    setModalType('edit');
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleSubmitForm = async (formData) => {
    setLoading(true); // Indicate submission is in progress
    try {
      if (modalType === 'add') {
        await createJobPost(formData);
        showNotification('Job Post Created successfully!', 'success');
      } else { // modalType === 'edit'
        await updateJobPost(selectedJob._id, formData);
        showNotification('Job Post Updated successfully!', 'success');
      }
      setIsModalOpen(false); // Close modal on success
      fetchJobPosts(); // Refresh the list of jobs
    } catch (err) {
      const errMsg = err.response?.data?.message || 'An error occurred during submission.';
      showNotification(errMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      setLoading(true); // Indicate deletion is in progress
      try {
        await deleteJobPost(jobId);
        showNotification('Job Post Deleted successfully!', 'success');
        fetchJobPosts(); // Refresh the list
      } catch (err) {
        const errMsg = err.response?.data?.message || 'An error occurred during deletion.';
        showNotification(errMsg, 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
   <div>
    <Navbar/>
     <div className="container mx-auto p-8 bg-gray-100 min-h-screen pt-20">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">
        Manage Job Posts
      </h1>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}

      <button
        onClick={handleAddJob}
        className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-8"
      >
        <FaPlusCircle className="mr-2" /> Add New Job Post
      </button>

      {loading && (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-gray-600">Loading job posts...</p>
        </div>
      )}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      {!loading && !error && (
        <JobPostsTable
          jobPosts={jobPosts}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
        />
      )}

      {/* Add/Edit Job Post Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'add' ? 'Add New Job Post' : 'Edit Job Post'}
      >
        <JobPostForm
          initialData={selectedJob}
          onSubmit={handleSubmitForm}
          isLoading={loading} // Pass loading state to disable form during submission
        />
      </Modal>
    </div>
   </div>
  );
}

export default AdminJobPostsPage;