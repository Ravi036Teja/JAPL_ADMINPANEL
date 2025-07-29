// admin-frontend/src/components/BlogForm.js
import React, { useState, useEffect } from 'react';

export default function BlogForm({ blogToEdit, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setCoverImage(blogToEdit.coverImage);
      setContent(blogToEdit.content);
    } else {
      setTitle('');
      setCoverImage('');
      setContent('');
    }
  }, [blogToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !coverImage || !content) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSubmit({ title, coverImage, content });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-8 border mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {blogToEdit ? 'Edit Blog Post' : 'Add New Blog Post'}
        <div className="border-b border-4 w-20 mx-auto border-blue-700 mb-8 mt-4"></div>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coverImage" className="block text-gray-700 text-sm font-bold mb-2">
            Cover Image URL:
          </label>
          <input
            type="text"
            id="coverImage"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
            Content (HTML allowed):
          </label>
          <textarea
            id="content"
            rows="10"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {blogToEdit ? 'Update Blog' : 'Add Blog'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}