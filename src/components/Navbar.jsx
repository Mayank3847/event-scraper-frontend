import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
           <Link to="/" className="flex items-center gap-3">
  <img 
    src="/logo192.png" 
    alt="Sydney Events Logo" 
    className="h-10 w-auto"
  />
  <span className="text-2xl font-bold text-primary">Sydney Events</span>
</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary">
              Events
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-primary"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;