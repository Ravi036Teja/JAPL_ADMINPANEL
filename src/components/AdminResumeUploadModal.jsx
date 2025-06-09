// src/components/AdminResumeUploadModal.jsx
import React, { useState } from 'react';
import { FaTimes, FaUpload, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// Assuming you have an API service for application-related calls
// This function needs to be implemented in your backend to handle resume uploads
// For example:
// import * as applicationApi from '../api/applicationApi';
// Then call: applicationApi.uploadResumeForJob(jobId, resumeFile);

export default function AdminResumeUploadModal({ isOpen, onClose, jobId, onUploadSuccess }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Reset state when modal opens/closes or job changes
  React.useEffect(() => {
    if (isOpen) {
      setResumeFile(null);
      setIsUploading(false);
      setUploadSuccess(false);
      setUploadError('');
    }
  }, [isOpen, jobId]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setUploadSuccess(false);
    setUploadError('');

    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // PDF, DOCX
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setResumeFile(null);
        setUploadError('Please upload a PDF or DOCX file.');
        return;
      }
      if (file.size > maxSize) {
        setResumeFile(null);
        setUploadError('File size exceeds 5MB limit.');
        return;
      }
      setResumeFile(file);
    } else {
      setResumeFile(null);
    }
  };

  const handleSubmitUpload = async () => {
    if (!resumeFile) {
      setUploadError('Please select a resume file to upload.');
      return;
    }
    if (!jobId) {
      setUploadError('Job ID is missing. Cannot upload resume.');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    setUploadError('');

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobId', jobId); // Pass the job ID to associate the resume

    try {
      // IMPORTANT: Replace this with your actual API call for admin-side resume upload
      // This endpoint needs to handle file uploads and associate them with the job.
      const response = await fetch('/api/admin/applications/upload-resume', { // Example Admin API endpoint
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload resume.');
      }

      setUploadSuccess(true);
      setResumeFile(null); // Clear file input
      onUploadSuccess(jobId); // Notify parent component (AdminJobPostsPage) about success
      // Optionally close modal after a delay
      // setTimeout(onClose, 1500);
    } catch (err) {
      console.error('Admin Resume Upload Error:', err);
      setUploadError(err.message || 'An error occurred during resume upload.');
      setUploadSuccess(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload Resume for Job ID: {jobId}</h2>

        <div className="flex items-center justify-center w-full mb-4">
          <label
            htmlFor="admin-resume-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FaUpload className="w-8 h-8 mb-3 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF or DOCX (Max 5MB)</p>
            </div>
            <input
              id="admin-resume-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.docx"
            />
          </label>
        </div>

        {resumeFile && (
          <p className="text-sm text-gray-600 text-center mt-2">Selected: <span className="font-medium">{resumeFile.name}</span></p>
        )}

        {uploadError && (
          <div className="flex items-center text-red-600 text-sm mt-3 justify-center">
            <FaExclamationCircle className="mr-2" /> {uploadError}
          </div>
        )}

        {uploadSuccess && (
          <div className="flex items-center text-green-600 text-sm mt-3 justify-center">
            <FaCheckCircle className="mr-2" /> Resume uploaded successfully!
          </div>
        )}

        <button
          onClick={handleSubmitUpload}
          disabled={isUploading || !resumeFile}
          className={`mt-6 w-full inline-flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isUploading || !resumeFile ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {isUploading ? 'Uploading...' : 'Submit Resume'}
        </button>
      </div>
    </div>
  );
}