// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminVehicleForm from './pages/AdminVehicleForm';
// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <Router>
//       <Navbar/>
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//         <Route path="/*" element={<AdminVehicleForm/>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminVehicleForm from './pages/AdminVehicleForm';
import AdminVehicleList from './pages/AdminVehiclesList'; // Create this new component
import AdminBlogPage from './pages/AdminBLogPAge';
import AdminJobPostsPage from './pages/AdminJobPostsPage';
import AdminJobApplicationsPage from './pages/AdminJobApplicationPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Updated Admin Routes */}
        <Route path="/admin/vehicles" element={<ProtectedRoute><AdminVehicleList /></ProtectedRoute>} />
        <Route path="/admin/vehicles/new" element={<ProtectedRoute><AdminVehicleForm /></ProtectedRoute>} />
        <Route path="/admin/vehicles/edit/:id" element={<ProtectedRoute><AdminVehicleForm /></ProtectedRoute>} />

        {/* --- New Blog Routes --- */}


        {/* Admin Blog Routes */}
        {/* These routes should also be protected */}
        <Route path="/admin/blogs" element={<ProtectedRoute><AdminBlogPage /></ProtectedRoute>} />
        {/* You might want a route for adding/editing specific blogs within the admin panel, 
            but AdminBlogPage itself handles that in the previous example. 
            If you separate them, you'd add:
            <Route path="/admin/blogs/new" element={<ProtectedRoute><AdminBlogForm /></ProtectedRoute>} />
            <Route path="/admin/blogs/edit/:id" element={<ProtectedRoute><AdminBlogForm /></ProtectedRoute>} />
        */}
        {/* --- End New Blog Routes --- */}

        {/* JobPost Routes */}
        <Route path="/admin/jobposts" element={<ProtectedRoute><AdminJobPostsPage /></ProtectedRoute>} />
        {/* NEW ADMIN ROUTE FOR JOB APPLICATIONS */}
        <Route path="/admin/applications" element={<ProtectedRoute><AdminJobApplicationsPage /></ProtectedRoute>} />
        {/* Redirect to admin dashboard */}
        <Route path="*" element={<Navigate to="/admin/vehicles" replace />} />
      </Routes>
    </Router>
  );
}

export default App;