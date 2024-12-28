// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated } = useContext(AuthContext)
  // console.log("here user", user.name, user)
  return (
    <header className="fixed top-0 left-0 right-0 shadow-md flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img
          src="/path-to-your-logo.png" // Replace with your logo path
          alt="Site Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Center: Navigation Links */}
      <nav className="flex space-x-6">
        {/* <span>{isAuthenticated ? 'Yes' : 'No'}</span> */}
        {/* <span>{user.email}</span> */}
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/contacts" className="hover:text-blue-400">Contacts</Link>
        <Link to="/cart" className="hover:text-blue-400">Cart</Link>
        <Link to="/about" className="hover:text-blue-400">About</Link>
        {
          user?.is_seller ? (
            <Link to="/my-products" className="hover:text-blue-400">My products</Link>
          ) : null
        }
      </nav>

      {/* Right Side: Login and Register Links */}
      <div className="flex space-x-4">
        {
          isAuthenticated ? (
            <div className='flex gap-2 items-center'>
              <span>Welcome : {user.name}</span>
              <Link to="/logout" className="px-2 py-1 bg-green-400 rounded-lg hover:text-blue-400 transition duration-300">Logout</Link>
            </ div>
          ) : (
            <>
              <Link to="/login" className="px-2 py-1 bg-green-400 rounded-lg hover:text-blue-400 transition duration-300">Login</Link>
              <Link to="/register" className="px-2 py-1 bg-green-400 rounded-lg hover:text-blue-400 transition duration-300">Register</Link>
            </>
          )
        }

      </div>
    </header>
  );
};

export default Navbar;
