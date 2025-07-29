// src/components/JobPostForm.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Re-use your jobType and experienceLevel enums from backend schema for frontend dropdowns
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Remote', 'Hybrid'];
const EXPERIENCE_LEVELS = ['Entry-level', 'Associate', 'Mid-level', 'Senior', 'Director', 'Executive'];

function JobPostForm({ initialData = null, onSubmit, isLoading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: '',
      company: '',
      location: '',
      jobType: '',
      experienceLevel: '',
      department: '',
      salaryRange: '',
      description: '',
      responsibilities: '', // Will convert to array
      requirements: '',     // Will convert to array
      skills: '',           // Will convert to array
      applicationLink: '',
      howToApply: '',
      isActive: true,
      expiresAt: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        responsibilities: initialData.responsibilities ? initialData.responsibilities.join(', ') : '',
        requirements: initialData.requirements ? initialData.requirements.join(', ') : '',
        skills: initialData.skills ? initialData.skills.join(', ') : '',
        expiresAt: initialData.expiresAt ? new Date(initialData.expiresAt).toISOString().slice(0, 16) : ''
      });
    } else {
      reset({
        title: '', company: '', location: '', jobType: '', experienceLevel: '', department: '',
        salaryRange: '', description: '', responsibilities: '', requirements: '', skills: '',
        applicationLink: '', howToApply: '', isActive: true, expiresAt: ''
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      responsibilities: data.responsibilities ? data.responsibilities.split(',').map(s => s.trim()).filter(s => s) : [],
      requirements: data.requirements ? data.requirements.split(',').map(s => s.trim()).filter(s => s) : [],
      skills: data.skills ? data.skills.split(',').map(s => s.trim()).filter(s => s) : [],
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined
    };
    onSubmit(formattedData);
  };

  const inputBaseClass = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "mt-1 text-xs text-red-600";
  const textareaClass = `resize-y ${inputBaseClass}`;

  return (
    // Added 'w-full', 'h-full', and 'm-2' (which is 8px)
    <form onSubmit={handleSubmit(handleFormSubmit)} className="lg:mt-80 w-full h-full m-2 space-y-4 bg-white p-6 rounded-lg shadow-md overflow-y-auto">
      {/* Basic Job Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Job Title<span className="text-red-500">*</span></label>
          <input type="text" {...register('title', { required: 'Job Title is required' })} className={`${inputBaseClass} ${errors.title ? 'border-red-500' : ''}`} />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Company</label>
          <input type="text" {...register('company')} className={inputBaseClass} />
        </div>

        <div>
          <label className={labelClass}>Location<span className="text-red-500">*</span></label>
          <input type="text" {...register('location', { required: 'Location is required' })} className={`${inputBaseClass} ${errors.location ? 'border-red-500' : ''}`} />
          {errors.location && <p className={errorClass}>{errors.location.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Department</label>
          <input type="text" {...register('department')} className={inputBaseClass} />
        </div>
      </div>

      {/* Type & Experience Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Job Type<span className="text-red-500">*</span></label>
          <select {...register('jobType', { required: 'Job Type is required' })} className={`${inputBaseClass} ${errors.jobType ? 'border-red-500' : ''}`}>
            <option value="">Select Type</option>
            {JOB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          {errors.jobType && <p className={errorClass}>{errors.jobType.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Experience Level</label>
          <select {...register('experienceLevel')} className={inputBaseClass}>
            <option value="">Select Level</option>
            {EXPERIENCE_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>
      </div>

      {/* Salary & Description */}
      <div>
        <label className={labelClass}>Salary Range (e.g., ₹8 LPA - ₹12 LPA)</label>
        <input type="text" {...register('salaryRange')} className={inputBaseClass} />
      </div>

      <div>
        <label className={labelClass}>Job Description<span className="text-red-500">*</span></label>
        <textarea {...register('description', { required: 'Description is required' })} rows="4" className={`${textareaClass} ${errors.description ? 'border-red-500' : ''}`} />
        {errors.description && <p className={errorClass}>{errors.description.message}</p>}
      </div>

      {/* Responsibilities, Requirements, Skills - Grouped */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Responsibilities (comma-separated)</label>
          <textarea {...register('responsibilities')} placeholder="e.g., Lead team, Develop features, Test code" rows="3" className={textareaClass} />
        </div>

        <div>
          <label className={labelClass}>Requirements (comma-separated)</label>
          <textarea {...register('requirements')} placeholder="e.g., 5+ years experience, Node.js, React" rows="3" className={textareaClass} />
        </div>

        <div>
          <label className={labelClass}>Skills (comma-separated keywords)</label>
          <textarea {...register('skills')} placeholder="e.g., JavaScript, MongoDB, Express" rows="3" className={textareaClass} />
        </div>
      </div>

      {/* Application Details */}
      {/* <div>
        <label className={labelClass}>Application Link</label>
        <input
          type="url"
          {...register('applicationLink', {
            pattern: {
              value: /^https?:\/\/\S+$/,
              message: 'Must be a valid URL (starts with http:// or https://)',
            },
          })}
          className={`${inputBaseClass} ${errors.applicationLink ? 'border-red-500' : ''}`}
        />
        {errors.applicationLink && <p className={errorClass}>{errors.applicationLink.message}</p>}
      </div> */}

      <div>
        <label className={labelClass}>How to Apply (alternative instructions)</label>
        <textarea {...register('howToApply')} rows="3" className={textareaClass} />
      </div>

      {/* Active Status & Expiration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
            Job is Active?
          </label>
          <div className="relative inline-block w-10 h-6 select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              {...register('isActive')}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-blue-600 checked:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            />
            <label htmlFor="isActive" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>

        <div>
          <label className={labelClass}>Expires At (Optional)</label>
          <input type="datetime-local" {...register('expiresAt')} className={inputBaseClass} />
          {errors.expiresAt && <p className={errorClass}>{errors.expiresAt.message}</p>}
        </div>
      </div>

      {/* Custom CSS for the toggle switch (can be moved to index.css or a global CSS file) */}
      <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #2563eb; /* Tailwind blue-600 */
          background-color: #2563eb;
        }
        .toggle-label {
          background-color: #d1d5db; /* Tailwind gray-300 */
        }
        .toggle-checkbox:focus + .toggle-label {
          box-shadow: 0 0 0 2px #bfdbfe, 0 0 0 4px #3b82f6; /* Focus ring similar to Chakra UI */
        }
      `}</style>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-200 ease-in-out ${
          isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }`}
      >
        {isLoading ? 'Processing...' : (initialData ? 'Update Job Post' : 'Create Job Post')}
      </button>
    </form>
  );
}

export default JobPostForm;