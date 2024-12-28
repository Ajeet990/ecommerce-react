import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  // const [hasLoggedOut, setHasLoggedOut] = useState(false)

  useEffect(() => {
    logout(); // Perform logout
    navigate('/'); // Redirect after logout
    toast.success('Logged out successfully.')
    // setHasLoggedOut(true)

  }, []); // Dependencies ensure this runs only once

  return (
    <div>
      <p>Logging out...</p> {/* Optional: Show a message while logging out */}
    </div>
  );
};

export default Logout;
