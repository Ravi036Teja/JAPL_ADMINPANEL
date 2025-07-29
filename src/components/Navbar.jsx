import { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const navLinks = [
    // { name: "Dashboard", path: "/dashboard" },
     { name: "Products", path: "/admin/vehicles" },
    { name: "Blogs", path: "/admin/blogs" },
    { name: "JobPosts", path: "/admin/jobposts" },
    { name: "Applications", path: "/admin/applications" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">AdminPanel</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Dropdown (Desktop) */}
          <div className="hidden md:block ml-4 relative">
            <button
              onClick={() => setUserDropdown(!userDropdown)}
              className="flex items-center text-sm focus:outline-none"
            >
              <span className="mr-2">Admin User</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {userDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 text-gray-800">
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 pb-3 px-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 block"
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-700 pt-2">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Profile
              </Link>
              <Link
                to="/logout"
                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;