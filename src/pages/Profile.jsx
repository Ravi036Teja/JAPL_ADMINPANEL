import { useEffect, useState } from 'react';
import API from '../api/api';
import { logout } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await API.get('https://japl-backend.onrender.com/api/auth/profile');
      // const res = await API.get('http://localhost:5000/api/auth/profile');
      setUser(res.data);
    } catch {
      logout();
      navigate('/login');
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  return (
    <div className="flex justify-start items-center pl-12 pt-12">
      {user ? (
        <div className="pt-20">
          <p className='text-xl font-semibold'><strong>Name:</strong> {user.name}</p>
          <p className='text-xl font-semibold'><strong>Email:</strong> {user.email}</p>
          {/* <button onClick={() => { logout(); navigate('/login'); }} className=" bg-red-500 text-white px-4 py-2 rounded">Logout</button> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
