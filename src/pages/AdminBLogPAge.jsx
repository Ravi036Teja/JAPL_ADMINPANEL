// admin-frontend/src/pages/AdminBlogPage.js
import React, { useState, useEffect } from 'react';
import BlogForm from '../components/BlogForm'; // Adjust path
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '../api/blogapi'; // Adjust path
import Navbar from '../components/Navbar';

export default function AdminBlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingBlog, setEditingBlog] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const data = await getAllBlogs();
            setBlogs(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch blogs for admin panel. Make sure backend is running and you are authorized.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBlog = async (blogData) => {
        try {
            await createBlog(blogData);
            alert('Blog added successfully!');
            fetchBlogs();
            setEditingBlog(null);
        } catch (err) {
            alert('Error adding blog.');
            console.error(err);
        }
    };

    const handleUpdateBlog = async (blogData) => {
        try {
            await updateBlog(editingBlog._id, blogData);
            alert('Blog updated successfully!');
            fetchBlogs();
            setEditingBlog(null);
        } catch (err) {
            alert('Error updating blog.');
            console.error(err);
        }
    };

    const handleDeleteBlog = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await deleteBlog(id);
                alert('Blog deleted successfully!');
                fetchBlogs();
            } catch (err) {
                alert('Error deleting blog.');
                console.error(err);
            }
        }
    };

    const handleEditClick = (blog) => {
        setEditingBlog(blog);
    };

    const handleCancelEdit = () => {
        setEditingBlog(null);
    };

    if (loading) {
        return <div className="text-center mt-20 text-xl">Loading blog admin panel...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-xl text-red-500">{error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                {/* <h1 className="text-4xl font-bold mb-6 text-center mt-12">Add New Blog Post</h1>
                <div className="border-b border-4 w-20 mx-auto border-blue-700 mb-8"></div> */}

                <BlogForm
                    blogToEdit={editingBlog}
                    onSubmit={editingBlog ? handleUpdateBlog : handleAddBlog}
                    onCancel={handleCancelEdit}
                />

                <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Existing Blog Posts</h2>
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No blog posts available.</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-2xl shadow p-4 border border-gray-100 flex flex-col justify-between">
                                <div>
                                    <img
                                        src={blog.coverImage}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover rounded-xl mb-4"
                                    />
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">{blog.title}</h3>
                                    <p className="text-sm text-gray-500 text-center mb-4">
                                        Published: {new Date(blog.publishedDate).toDateString()}
                                    </p>
                                </div>
                                <div className="flex justify-center gap-4 mt-4">
                                    <button
                                        onClick={() => handleEditClick(blog)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBlog(blog._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}