// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import api from '../api';

// const AdminVehicleForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(!!id);
//   const [vehicle, setVehicle] = useState({
//     name: '',
//     description: '',
//     images: [''],
//     quickSpecs: {
//       'Max Power': '',
//       'Max Torque': '',
//       'GVW': '',
//       'Fuel Capacity': ''
//     },
//     detailedSpecs: {
//       'Vehicle Information': {
//         'Vehicle Description': '',
//         'Vehicle Application': '',
//         'Product Category': '',
//         'Steering Type': ''
//       },
//       'Performance': {
//         'Max Power': '',
//         'Max Torque': '',
//         'Emission Norms': '',
//         'Engine Type': '',
//         'Engine Cylinders': '',
//         'Gradeability %': '',
//         'Fuel Tank Capacity (Litres)': '',
//         'Fuel Type': '',
//         'Clutch Type': '',
//         'Gearbox': ''
//       },
//       'Design & Build': {
//         'GVW / GCW (Kgs)': '',
//         'Wheelbase (mm)': '',
//         'Overall Width (mm)': '',
//         'Overall Height (mm)': '',
//         'Overall Length (mm)': '',
//         'CABIN TYPE': '',
//         'Load Body Length': '',
//         'No. of Wheels': '',
//         'Front Tyre': '',
//         'Rear Tyre': '',
//         'Rear Suspension': '',
//         'Front Suspension': ''
//       },
//       'Comfort': {
//         'A/C': '',
//         'Telematics': '',
//         'Seat Type': ''
//       },
//       'Safety': {
//         'Brake Type': '',
//         'Hill Hold': ''
//       }
//     },
//     keyFeatures: ['']
//   });

//   const resetForm = () => {
//     setVehicle({
//       name: '',
//       description: '',
//       images: [''],
//       quickSpecs: {
//         'Max Power': '',
//         'Max Torque': '',
//         'GVW': '',
//         'Fuel Capacity': ''
//       },
//       detailedSpecs: {
//         'Vehicle Information': {
//           'Vehicle Description': '',
//           'Vehicle Application': '',
//           'Product Category': '',
//           'Steering Type': ''
//         },
//         'Performance': {
//           'Max Power': '',
//           'Max Torque': '',
//           'Emission Norms': '',
//           'Engine Type': '',
//           'Engine Cylinders': '',
//           'Gradeability %': '',
//           'Fuel Tank Capacity (Litres)': '',
//           'Fuel Type': '',
//           'Clutch Type': '',
//           'Gearbox': ''
//         },
//         'Design & Build': {
//           'GVW / GCW (Kgs)': '',
//           'Wheelbase (mm)': '',
//           'Overall Width (mm)': '',
//           'Overall Height (mm)': '',
//           'Overall Length (mm)': '',
//           'CABIN TYPE': '',
//           'Load Body Length': '',
//           'No. of Wheels': '',
//           'Front Tyre': '',
//           'Rear Tyre': '',
//           'Rear Suspension': '',
//           'Front Suspension': ''
//         },
//         'Comfort': {
//           'A/C': '',
//           'Telematics': '',
//           'Seat Type': ''
//         },
//         'Safety': {
//           'Brake Type': '',
//           'Hill Hold': ''
//         }
//       },
//       keyFeatures: ['']
//     });
//   };

//   // Fetch vehicle data when id changes
//   useEffect(() => {
//     const fetchVehicle = async () => {
//       if (!id) {
//         resetForm();
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await api.get(`/vehicles/${id}`);
//         // Ensure images and keyFeatures are properly initialized
//         const vehicleData = response.data;
//         setVehicle({
//           ...vehicleData,
//           images: vehicleData.images && vehicleData.images.length > 0 
//             ? vehicleData.images 
//             : [''],
//           keyFeatures: vehicleData.keyFeatures && vehicleData.keyFeatures.length > 0 
//             ? vehicleData.keyFeatures 
//             : ['']
//         });
//       } catch (error) {
//         console.error('Error fetching vehicle:', error);
//         alert('Vehicle not found');
//         navigate('/admin/vehicles');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicle();
//   }, [id, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVehicle(prev => ({ ...prev, [name]: value }));
//   };

//   const handleQuickSpecChange = (key, value) => {
//     setVehicle(prev => ({
//       ...prev,
//       quickSpecs: {
//         ...prev.quickSpecs,
//         [key]: value
//       }
//     }));
//   };

//   const handleDetailedSpecChange = (section, key, value) => {
//     setVehicle(prev => ({
//       ...prev,
//       detailedSpecs: {
//         ...prev.detailedSpecs,
//         [section]: {
//           ...prev.detailedSpecs[section],
//           [key]: value
//         }
//       }
//     }));
//   };

//   const handleImageChange = (index, value) => {
//     const newImages = [...vehicle.images];
//     newImages[index] = value;
//     setVehicle(prev => ({ ...prev, images: newImages }));
//   };

//   const addImageField = () => {
//     setVehicle(prev => ({ ...prev, images: [...prev.images, ''] }));
//   };

//   const removeImageField = (index) => {
//     if (vehicle.images.length <= 1) return;
//     const newImages = vehicle.images.filter((_, i) => i !== index);
//     setVehicle(prev => ({ ...prev, images: newImages }));
//   };

//   const handleFeatureChange = (index, value) => {
//     const newFeatures = [...vehicle.keyFeatures];
//     newFeatures[index] = value;
//     setVehicle(prev => ({ ...prev, keyFeatures: newFeatures }));
//   };

//   const addFeatureField = () => {
//     setVehicle(prev => ({ ...prev, keyFeatures: [...prev.keyFeatures, ''] }));
//   };

//   const removeFeatureField = (index) => {
//     if (vehicle.keyFeatures.length <= 1) return;
//     const newFeatures = vehicle.keyFeatures.filter((_, i) => i !== index);
//     setVehicle(prev => ({ ...prev, keyFeatures: newFeatures }));
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this vehicle?')) {
//       setLoading(true);
//       try {
//         await api.delete(`/vehicles/${id}`);
//         alert('Vehicle deleted successfully');
//         navigate('/admin/vehicles');
//       } catch (error) {
//         console.error('Error deleting vehicle:', error);
//         alert('Failed to delete vehicle');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Filter out empty images and keyFeatures
//     const cleanedVehicle = {
//       ...vehicle,
//       images: vehicle.images.filter(img => img.trim() !== ''),
//       keyFeatures: vehicle.keyFeatures.filter(feature => feature.trim() !== '')
//     };

//     try {
//       if (id) {
//         await api.patch(`/vehicles/${id}`, cleanedVehicle);
//         alert('Vehicle updated successfully');
//       } else {
//         await api.post('/vehicles', cleanedVehicle);
//         alert('Vehicle added successfully');
//       }
//       navigate('/admin/vehicles');
//     } catch (error) {
//       console.error('Error saving vehicle:', error);
//       alert(`Failed to save vehicle: ${error.response?.data?.message || error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center py-12">Loading vehicle data...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg ">
//       <div className="flex justify-between items-center mb-6 mt-20">
//         <h2 className="text-2xl font-bold">
//           {id ? `Edit Vehicle: ${vehicle.name || ''}` : 'Add New Vehicle'}
//         </h2>

//         {id && (
//           <button
//             type="button"
//             onClick={handleDelete}
//             disabled={loading}
//             className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50"
//           >
//             {loading ? 'Deleting...' : 'Delete Vehicle'}
//           </button>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Basic Info Section */}
//         <div className="border-b pb-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Vehicle Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={vehicle.name}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={vehicle.description}
//                 onChange={handleChange}
//                 rows={3}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Images Section */}
//         <div className="border-b pb-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Images</h3>
//           {vehicle.images.map((url, index) => (
//             <div key={index} className="flex items-center mb-2">
//               <input
//                 type="text"
//                 value={url}
//                 onChange={(e) => handleImageChange(index, e.target.value)}
//                 placeholder="Image URL"
//                 className="flex-1 block border border-gray-300 rounded-md shadow-sm p-2 mr-2"
//                 required={index === 0}
//               />
//               {vehicle.images.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeImageField(index)}
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addImageField}
//             className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           >
//             Add Image
//           </button>
//         </div>

//         {/* Quick Specs Section */}
//         <div className="border-b pb-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Specifications</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Max Power
//               </label>
//               <input
//                 type="text"
//                 value={vehicle.quickSpecs['Max Power']}
//                 onChange={(e) => handleQuickSpecChange('Max Power', e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Max Torque
//               </label>
//               <input
//                 type="text"
//                 value={vehicle.quickSpecs['Max Torque']}
//                 onChange={(e) => handleQuickSpecChange('Max Torque', e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 GVW
//               </label>
//               <input
//                 type="text"
//                 value={vehicle.quickSpecs['GVW']}
//                 onChange={(e) => handleQuickSpecChange('GVW', e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Fuel Capacity
//               </label>
//               <input
//                 type="text"
//                 value={vehicle.quickSpecs['Fuel Capacity']}
//                 onChange={(e) => handleQuickSpecChange('Fuel Capacity', e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Detailed Specifications */}
//         <div>
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Specifications</h3>

//           {/* Vehicle Information */}
//           <div className="mb-6 border p-4 rounded-lg">
//             <h4 className="font-medium text-gray-900 mb-3">Vehicle Information</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {Object.entries(vehicle.detailedSpecs['Vehicle Information']).map(([key, value]) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {key}
//                   </label>
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) => handleDetailedSpecChange('Vehicle Information', key, e.target.value)}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Performance */}
//           <div className="mb-6 border p-4 rounded-lg">
//             <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {Object.entries(vehicle.detailedSpecs['Performance']).map(([key, value]) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {key}
//                   </label>
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) => handleDetailedSpecChange('Performance', key, e.target.value)}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Design & Build */}
//           <div className="mb-6 border p-4 rounded-lg">
//             <h4 className="font-medium text-gray-900 mb-3">Design & Build</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {Object.entries(vehicle.detailedSpecs['Design & Build']).map(([key, value]) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {key}
//                   </label>
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) => handleDetailedSpecChange('Design & Build', key, e.target.value)}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Comfort */}
//           <div className="mb-6 border p-4 rounded-lg">
//             <h4 className="font-medium text-gray-900 mb-3">Comfort</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {Object.entries(vehicle.detailedSpecs['Comfort']).map(([key, value]) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {key}
//                   </label>
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) => handleDetailedSpecChange('Comfort', key, e.target.value)}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Safety */}
//           <div className="mb-6 border p-4 rounded-lg">
//             <h4 className="font-medium text-gray-900 mb-3">Safety</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {Object.entries(vehicle.detailedSpecs['Safety']).map(([key, value]) => (
//                 <div key={key}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {key}
//                   </label>
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) => handleDetailedSpecChange('Safety', key, e.target.value)}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Key Features */}
//         <div className="border-b pb-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
//           {vehicle.keyFeatures.map((feature, index) => (
//             <div key={index} className="flex items-center mb-2">
//               <input
//                 type="text"
//                 value={feature}
//                 onChange={(e) => handleFeatureChange(index, e.target.value)}
//                 placeholder="Feature"
//                 className="flex-1 block border border-gray-300 rounded-md shadow-sm p-2 mr-2"
//                 required={index === 0}
//               />
//               {vehicle.keyFeatures.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeFeatureField(index)}
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addFeatureField}
//             className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           >
//             Add Feature
//           </button>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-4">
//           <button
//             type="button"
//             onClick={() => navigate('/admin/vehicles')}
//             className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 disabled:opacity-50"
//           >
//             {loading ? 'Saving...' : id ? 'Update Vehicle' : 'Add Vehicle'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminVehicleForm;



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import Navbar from '../components/Navbar';

const AdminVehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [vehicle, setVehicle] = useState({
    name: '',
    description: '',
    images: [''],
    brochure: '',
    quickSpecs: {
      'Max Power': '',
      'Max Torque': '',
      'GVW': '',
      'Fuel Capacity': ''
    },
    detailedSpecs: {
      'Vehicle Information': {
        'Vehicle Description': '',
        'Vehicle Application': '',
        'Product Category': '',
        'Steering Type': ''
      },
      'Performance': {
        'Max Power': '',
        'Max Torque': '',
        'Emission Norms': '',
        'Engine Type': '',
        'Engine Cylinders': '',
        'Gradeability %': '',
        'Fuel Tank Capacity (Litres)': '',
        'Fuel Type': '',
        'Clutch Type': '',
        'Gearbox': ''
      },
      'Design & Build': {
        'GVW / GCW (Kgs)': '',
        'Wheelbase (mm)': '',
        'Overall Width (mm)': '',
        'Overall Height (mm)': '',
        'Overall Length (mm)': '',
        'CABIN TYPE': '',
        'Load Body Length': '',
        'No of Wheels': '',
        'Front Tyre': '',
        'Rear Tyre': '',
        'Rear Suspension': '',
        'Front Suspension': ''
      },
      'Comfort': {
        'A/C': '',
        'Telematics': '',
        'Seat Type': ''
      },
      'Safety': {
        'Brake Type': '',
        'Hill Hold': ''
      }
    },
    keyFeatures: ['']
  });

  // Section order for detailed specs
  const sectionOrder = [
    'Vehicle Information',
    'Performance',
    'Design & Build',
    'Comfort',
    'Safety'
  ];

  const resetForm = () => {
    setVehicle({
      name: '',
      description: '',
      images: [''],
      brochure: '',
      quickSpecs: {
        'Max Power': '',
        'Max Torque': '',
        'GVW': '',
        'Fuel Capacity': ''
      },
      detailedSpecs: {
        'Vehicle Information': {
          'Vehicle Description': '',
          'Vehicle Application': '',
          'Product Category': '',
          'Steering Type': ''
        },
        'Performance': {
          'Max Power': '',
          'Max Torque': '',
          'Emission Norms': '',
          'Engine Type': '',
          'Engine Cylinders': '',
          'Gradeability %': '',
          'Fuel Tank Capacity (Litres)': '',
          'Fuel Type': '',
          'Clutch Type': '',
          'Gearbox': ''
        },
        'Design & Build': {
          'GVW / GCW (Kgs)': '',
          'Wheelbase (mm)': '',
          'Overall Width (mm)': '',
          'Overall Height (mm)': '',
          'Overall Length (mm)': '',
          'CABIN TYPE': '',
          'Load Body Length': '',
          'No of Wheels': '',
          'Front Tyre': '',
          'Rear Tyre': '',
          'Rear Suspension': '',
          'Front Suspension': ''
        },
        'Comfort': {
          'A/C': '',
          'Telematics': '',
          'Seat Type': ''
        },
        'Safety': {
          'Brake Type': '',
          'Hill Hold': ''
        }
      },
      keyFeatures: ['']
    });
  };

  // Fetch vehicle data when id changes
  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) {
        resetForm();
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/vehicles/${id}`);
        const vehicleData = response.data;
        setVehicle({
          ...vehicleData,
          images: vehicleData.images && vehicleData.images.length > 0
            ? vehicleData.images
            : [''],
          keyFeatures: vehicleData.keyFeatures && vehicleData.keyFeatures.length > 0
            ? vehicleData.keyFeatures
            : ['']
        });
      } catch (error) {
        console.error('Error fetching vehicle:', error);
        alert('Vehicle not found');
        navigate('/admin/vehicles');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickSpecChange = (key, value) => {
    setVehicle(prev => ({
      ...prev,
      quickSpecs: {
        ...prev.quickSpecs,
        [key]: value
      }
    }));
  };

  const handleDetailedSpecChange = (section, key, value) => {
    setVehicle(prev => ({
      ...prev,
      detailedSpecs: {
        ...prev.detailedSpecs,
        [section]: {
          ...prev.detailedSpecs[section],
          [key]: value
        }
      }
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...vehicle.images];
    newImages[index] = value;
    setVehicle(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setVehicle(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index) => {
    if (vehicle.images.length <= 1) return;
    const newImages = vehicle.images.filter((_, i) => i !== index);
    setVehicle(prev => ({ ...prev, images: newImages }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...vehicle.keyFeatures];
    newFeatures[index] = value;
    setVehicle(prev => ({ ...prev, keyFeatures: newFeatures }));
  };

  const addFeatureField = () => {
    setVehicle(prev => ({ ...prev, keyFeatures: [...prev.keyFeatures, ''] }));
  };

  const removeFeatureField = (index) => {
    if (vehicle.keyFeatures.length <= 1) return;
    const newFeatures = vehicle.keyFeatures.filter((_, i) => i !== index);
    setVehicle(prev => ({ ...prev, keyFeatures: newFeatures }));
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setLoading(true);
      try {
        await api.delete(`/vehicles/${id}`);
        alert('Vehicle deleted successfully');
        navigate('/admin/vehicles');
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        alert('Failed to delete vehicle');
      } finally {
        setLoading(false);
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const cleanedVehicle = {
  //     ...vehicle,
  //     images: vehicle.images.filter(img => img.trim() !== ''),
  //     keyFeatures: vehicle.keyFeatures.filter(feature => feature.trim() !== '')
  //   };

  //   try {
  //     console.log('Making request with token:', localStorage.getItem('token'));
  //     if (id) {
  //       await api.patch(`/vehicles/${id}`, cleanedVehicle);
  //       alert('Vehicle updated successfully');
  //     } else {
  //       await api.post('/vehicles', cleanedVehicle);
  //       alert('Vehicle added successfully');
  //     }
  //     navigate('/admin/vehicles');
  //   } catch (error) {
  //     console.error('Error saving vehicle:', error);
  //     alert(`Failed to save vehicle: ${error.response?.data?.message || error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Clean the vehicle data
  const cleanedVehicle = {
    ...vehicle,
    images: vehicle.images.filter(img => img.trim() !== ''),
    keyFeatures: vehicle.keyFeatures.filter(feature => feature.trim() !== '')
  };

  try {
    // Verify token exists before making the request
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found. Please log in again.');
    }

    console.log('Making request with token:', token);

    // Add more detailed request logging
    console.log('Request payload:', cleanedVehicle);
    console.log(`${id ? 'Updating' : 'Creating'} vehicle with ID:`, id || 'new');

    let response;
    if (id) {
      response = await api.patch(`/vehicles/${id}`, cleanedVehicle, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } else {
      response = await api.post('/vehicles', cleanedVehicle, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('Request successful:', response.data);

    // Show success notification with more details
    alert(`${id ? 'Updated' : 'Added'} vehicle successfully!\n\nVehicle: ${response.data.name}\nID: ${response.data._id}`);

    // Navigate back to vehicles list
    navigate('/admin/vehicles');

  } catch (error) {
    console.error('Full error details:', {
      message: error.message,
      response: error.response?.data,
      config: error.config,
      stack: error.stack
    });

    // Handle specific error cases
    let errorMessage = 'Failed to save vehicle';
    
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
        // Optionally redirect to login
        navigate('/login');
      } else if (error.response.status === 403) {
        errorMessage = 'Permission denied. You may not have rights to perform this action.';
      } else if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server. Please check your connection.';
    } else {
      // Something happened in setting up the request
      errorMessage = error.message || 'Unknown error occurred';
    }

    alert(errorMessage);
    
  } finally {
    setLoading(false);
  }
};

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-gray-600">Loading vehicle data...</p>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {id ? `Edit Vehicle: ${vehicle.name || ''}` : 'Add New Vehicle'}
          </h2>

          {id && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Delete Vehicle
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-xl shadow-lg p-6">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <div className="pb-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Basic Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">Essential details about the vehicle</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={vehicle.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  placeholder="Enter vehicle name"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={vehicle.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  placeholder="Enter vehicle description"
                />
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-6">
            <div className="pb-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Images
              </h3>
              <p className="mt-1 text-sm text-gray-500">URLs for vehicle images (first image will be featured)</p>
            </div>

            <div className="space-y-4">
              {vehicle.images.map((url, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required={index === 0}
                    />
                  </div>
                  {vehicle.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="mt-2 p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addImageField}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add another image
              </button>
            </div>

            {/* brochure */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brochure
              </label>
              <textarea
                name="brochure"
                value={vehicle.brochure}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
                placeholder="Paste Brochure URL"
              />
            </div>
          </div>

          {/* Quick Specs Section */}
          <div className="space-y-6">
            <div className="pb-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Quick Specifications
              </h3>
              <p className="mt-1 text-sm text-gray-500">Key specs displayed in vehicle overview</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Power
                </label>
                <input
                  type="text"
                  value={vehicle.quickSpecs['Max Power']}
                  onChange={(e) => handleQuickSpecChange('Max Power', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  placeholder="e.g., 120 kW @ 1800 rpm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Torque
                </label>
                <input
                  type="text"
                  value={vehicle.quickSpecs['Max Torque']}
                  onChange={(e) => handleQuickSpecChange('Max Torque', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  placeholder="e.g., 700 Nm @ 1200-1600 rpm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GVW
                </label>
                <input
                  type="text"
                  value={vehicle.quickSpecs['GVW']}
                  onChange={(e) => handleQuickSpecChange('GVW', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  placeholder="e.g., 16,200 kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Capacity
                </label>
                <input
                  type="text"
                  value={vehicle.quickSpecs['Fuel Capacity']}
                  onChange={(e) => handleQuickSpecChange('Fuel Capacity', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                  placeholder="e.g., 200 liters"
                />
              </div>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="space-y-6">
            <div className="pb-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Detailed Specifications
              </h3>
              <p className="mt-1 text-sm text-gray-500">Comprehensive technical specifications</p>
            </div>

            <div className="space-y-6">
              {sectionOrder.map(sectionName => (
                <div key={sectionName} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4 text-lg border-b pb-2">
                    {sectionName}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(vehicle.detailedSpecs[sectionName]).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          {key}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleDetailedSpecChange(sectionName, key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          placeholder={`Enter ${key.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-6">
            <div className="pb-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Key Features
              </h3>
              <p className="mt-1 text-sm text-gray-500">Highlighted features for marketing</p>
            </div>

            <div className="space-y-4">
              {vehicle.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="e.g., Advanced telematics system"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required={index === 0}
                    />
                  </div>
                  {vehicle.keyFeatures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatureField(index)}
                      className="mt-2 p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove feature"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addFeatureField}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add another feature
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/vehicles')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {id ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {id ? 'Update Vehicle' : 'Add Vehicle'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminVehicleForm;