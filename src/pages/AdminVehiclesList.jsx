import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { FaPlus, FaEdit, FaEye, FaSearch, FaFilter, FaTrash } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const AdminVehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null); // State for individual delete

  // Fetch vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.get('/vehicles');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        alert('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle vehicle selection for bulk actions
  const toggleVehicleSelection = (id) => {
    if (selectedVehicles.includes(id)) {
      setSelectedVehicles(selectedVehicles.filter(vehicleId => vehicleId !== id));
    } else {
      setSelectedVehicles([...selectedVehicles, id]);
    }
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedVehicles.length === filteredVehicles.length) {
      setSelectedVehicles([]);
    } else {
      setSelectedVehicles(filteredVehicles.map(v => v._id));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedVehicles.length > 0) {
      setVehicleToDelete(null); // Clear any individual vehicle pending deletion
      setShowDeleteModal(true);
    } else {
      alert('Please select vehicles to delete.');
    }
  };

  // Handle individual delete click
  const handleDeleteClick = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
  };

  // Confirm delete (for both individual and bulk)
  const confirmDelete = async () => {
    setLoading(true);
    try {
      let idsToDelete = [];
      if (vehicleToDelete) {
        idsToDelete = [vehicleToDelete._id]; // Deleting a single vehicle
      } else {
        idsToDelete = selectedVehicles; // Deleting multiple selected vehicles
      }

      // In a real application, you would make an API call to delete these vehicles:
      // await api.delete('/vehicles/bulk-delete', { data: { ids: idsToDelete } });
      // or for individual: await api.delete(`/vehicles/${idsToDelete[0]}`);

      // Simulate deletion in the frontend for demonstration
      const newVehicles = vehicles.filter(v => !idsToDelete.includes(v._id));
      setVehicles(newVehicles);
      setSelectedVehicles([]);
      setVehicleToDelete(null); // Clear vehicle to delete after successful deletion
      alert(`${idsToDelete.length} vehicle(s) deleted successfully`);
    } catch (error) {
      console.error('Error deleting vehicles:', error);
      alert('Failed to delete vehicles');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  // Filter and sort vehicles
  const filteredVehicles = vehicles
    .filter(vehicle => {
      const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.description?.toLowerCase().includes(searchTerm.toLowerCase()); // Added optional chaining for description
      const matchesCategory = selectedCategory === 'all' ||
        (vehicle.detailedSpecs?.['Vehicle Information']?.['Product Category'] === selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key] || ''; // Handle undefined values
      const bValue = b[sortConfig.key] || ''; // Handle undefined values

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  // Get unique categories
  const categories = ['all', ...new Set(
    vehicles.map(v => v.detailedSpecs?.['Vehicle Information']?.['Product Category'])
      .filter(Boolean)
  )];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="animate-pulse space-y-6 mt-6">
          <div className="h-12 bg-gray-200 rounded-lg w-1/3"></div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="h-10 bg-gray-200 rounded-lg w-full md:w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-full md:w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-full md:w-1/4"></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 pt-14">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Vehicle Management</h1>
            <p className="text-gray-600 mt-1">
              {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} in inventory
            </p>
          </div>

          <Link
            to="/admin/vehicles/new"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
          >
            <FaPlus className="text-sm" />
            <span>Add New Vehicle</span>
          </Link>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-4">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="flex gap-2 h-full">
                <button
                  onClick={() => handleSort('name')}
                  className={`flex-1 flex items-center justify-center gap-1 p-2.5 border rounded-lg transition-colors ${
                    sortConfig.key === 'name'
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span>Sort</span>
                  {sortConfig.key === 'name' && (
                    <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>

                {selectedVehicles.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="flex items-center gap-1 p-2.5 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 bg-black px-4 py-3 text-white font-medium border-b">
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedVehicles.length === filteredVehicles.length && filteredVehicles.length > 0}
                onChange={toggleSelectAll}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <div className="col-span-3">Vehicle</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Empty State */}
          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No vehicles found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm
                  ? `No vehicles match your search for "${searchTerm}"`
                  : "You haven't added any vehicles yet"}
              </p>
              <div className="mt-6">
                <Link
                  to="/admin/vehicles/new"
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FaPlus className="text-sm" />
                  Add New Vehicle
                </Link>
              </div>
            </div>
          )}

          {/* Vehicle Items */}
          {filteredVehicles.length > 0 && (
            <div className="divide-y">
              {filteredVehicles.map(vehicle => (
                <div
                  key={vehicle._id}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-5 hover:bg-gray-50 transition-colors ${selectedVehicles.includes(vehicle._id) ? 'bg-blue-50' : ''
                    }`}
                >
                  {/* Checkbox */}
                  <div className="md:col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedVehicles.includes(vehicle._id)}
                      onChange={() => toggleVehicleSelection(vehicle._id)}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* Vehicle Info */}
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {vehicle.images && vehicle.images.length > 0 ? (
                        <img
                          src={vehicle.images[0]}
                          alt={vehicle.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="text-xs bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl w-16 h-16 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{vehicle.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-4">
                    <p className="text-gray-700 line-clamp-2">
                      {vehicle.description || "No description available"}
                    </p>
                  </div>

                  {/* Category */}
                  <div className="md:col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {vehicle.detailedSpecs?.['Vehicle Information']?.['Product Category'] || 'Uncategorized'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-2 flex justify-end items-center gap-2">
                    <Link
                      to={`/admin/vehicles/edit/${vehicle._id}`}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(vehicle)} // Call handleDeleteClick for individual deletion
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-red-600"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination (Placeholder) */}
        {filteredVehicles.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredVehicles.length}</span> of{' '}
              <span className="font-medium">{filteredVehicles.length}</span> results
            </div>
            <div className="inline-flex gap-1">
              <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                Previous
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                Next
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <FaTrash className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Delete vehicle{vehicleToDelete || selectedVehicles.length > 1 ? 's' : ''}</h3>
                <div className="mt-2 text-gray-500">
                  <p>Are you sure you want to delete {vehicleToDelete ? 'this' : selectedVehicles.length} selected vehicle{vehicleToDelete || selectedVehicles.length > 1 ? 's' : ''}?</p>
                  <p className="mt-1 text-sm">This action cannot be undone.</p>
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setVehicleToDelete(null); // Clear pending individual delete on cancel
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVehicleList;