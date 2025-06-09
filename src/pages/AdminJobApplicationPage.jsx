// src/pages/AdminJobApplicationsPage.jsx
import React, { useEffect, useState } from 'react';
import { FaDownload, FaEnvelope, FaPhone } from 'react-icons/fa'; // Icons for download, email, phone
import * as applicationApi from '../api/\/applicationApi'; // Your new application API
import Notification from '../components/Notifications'; // Your notification component
import Navbar from '../components/Navbar';

export default function AdminJobApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const BACKEND_BASE_URL = 'http://localhost:5000';

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };
  const clearNotification = () => {
    setNotification(null);
  };

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await applicationApi.getAllApplications();
      // Assuming response.data contains the array of applications,
      // and each application object has 'jobPost' which is populated
      // with job details (e.g., jobPost.title, jobPost.company).
      // If your backend doesn't populate, you might need to fetch job details
      // separately or adjust the backend to populate.
      setApplications(response.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to fetch applications. Please try again.');
      showNotification('Failed to load applications.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
      <div className=''>
        <Navbar/>
        <div className="container mx-auto p-8 bg-gray-100 min-h-screen pt-20">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">
            Manage Job Applications
          </h1>

          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={clearNotification}
            />
          )}

          {loading && (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-4 text-gray-600">Loading applications...</p>
            </div>
          )}

          {error && <p className="text-red-600 text-center mt-4">{error}</p>}

          {!loading && !error && applications.length === 0 && (
            <p className="text-gray-600 text-center py-8">No job applications submitted yet.</p>
          )}

          {!loading && !error && applications.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-black text-white">
                    <tr className='bg-black text-white'>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Applicant Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Job Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                        Applied On
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                        Resume
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr key={app._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {app.applicantName || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {app.jobPost?.title || 'Job Not Found'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {app.jobPost?.company || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center space-x-2">
                            {app.applicantEmail && (
                              <a href={`mailto:${app.applicantEmail}`} className="text-blue-600 hover:text-blue-800" title="Email Applicant">
                                <FaEnvelope /> {app.applicantEmail}
                              </a>
                            )}
                            {app.applicantPhone && (
                              <a href={`tel:${app.applicantPhone}`} className="text-green-600 hover:text-green-800" title="Call Applicant">
                                <FaPhone /> {app.applicantPhone}
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          {app.resumePath ? (
                            <a
                              // IMPORTANT CHANGE HERE: Prepend the backend URL
                              href={`${BACKEND_BASE_URL}${app.resumePath}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Download Resume"
                            >
                              <FaDownload className="inline-block mr-1" /> Download
                            </a>
                          ) : (
                            <span className="text-gray-500">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}