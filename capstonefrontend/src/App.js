import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Pages/Dashboard';
import Transactions from './Pages/Transactions';
import Loans from './Pages/Loans';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Services/ProtectedRoute';
import AccountSetup from './Components/AccountSetup';
import Home from './Pages/Home';

function App() {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);

  // Update token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);  // Clear the token from state and localStorage
  };

  // Function to set token after successful login
  const setUserToken = (newToken) => {
    localStorage.setItem('jwtToken', newToken);  // Save token to localStorage
    setToken(newToken);  // Update state with the new token
  };

  return (
    <Router>
      <div>
        {/* Render the Navbar with the current token and logout function */}
        <Navbar token={token} logout={logout} />
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Dashboard/>}/>
          <Route
            path="/login"
            element={<Login setToken={setUserToken} />}
          />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/accountsetup"
             element={<AccountSetup logout={logout}/>}
          />
          
          <Route
            path="/transactions"
            element={<ProtectedRoute token={token} redirectTo="/login" component={<Transactions />} />}
          />
          <Route
            path="/loans"
            element={<ProtectedRoute token={token} redirectTo="/login" component={<Loans />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
