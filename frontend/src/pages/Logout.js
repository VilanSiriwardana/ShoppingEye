import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all user data from localStorage
    localStorage.removeItem('shopName');
    localStorage.removeItem('ownerName');
    localStorage.removeItem('shopCategory');
    localStorage.removeItem('location');
    localStorage.removeItem('phone');
    localStorage.removeItem('shopLogo');
    localStorage.removeItem('email');
    localStorage.removeItem('token');

    // Optionally, clear other app-specific data from localStorage if necessary

    // Redirect to the login page
    navigate('/');
  }, [navigate]);

  return null; // Optionally, return some UI like a loading spinner if desired
};

export default Logout;
