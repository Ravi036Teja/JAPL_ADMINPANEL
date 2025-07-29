// src/components/JobPostsTable.jsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Icons for actions

function JobPostsTable({ jobPosts, onEdit, onDelete }) {
  if (!jobPosts || jobPosts.length === 0) {
    return <p className="mt-4 text-gray-600">No job posts found. Click "Add New Job Post" to create one.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full leading-normal">
        <thead >
          <tr className='bg-black text-white' >
            <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
              Title
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold uppercase tracking-wider">
              Location
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
              Job Type
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
              Experience
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-semibold  uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  uppercase tracking-wider">
              Posted Date
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold  uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {jobPosts.map((job) => (
            <tr key={job._id} className="hover:bg-gray-50">
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap font-semibold">{job.title}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{job.location}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{job.jobType}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{job.experienceLevel}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                  className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                    job.isActive ? 'text-green-900' : 'text-red-900'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 opacity-50 rounded-full ${
                      job.isActive ? 'bg-green-200' : 'bg-red-200'
                    }`}
                  ></span>
                  <span className="relative">{job.isActive ? 'Active' : 'Inactive'}</span>
                </span>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{new Date(job.postedDate).toLocaleDateString()}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(job)}
                    className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2"
                    title="Edit"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(job._id)}
                    className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md p-2"
                    title="Delete"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobPostsTable;