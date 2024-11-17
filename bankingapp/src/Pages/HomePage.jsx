import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const HomePage = () => {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData) {
      navigate('/login');
    }
  }, [authData, navigate]);

  if (!authData) {
    return null;
  }

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {/* Your home page content */}
    </div>
  );
};

export default HomePage;
