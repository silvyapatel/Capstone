import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Pages/Dashboard';
import Transactions from './Pages/Transactions';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Services/ProtectedRoute';
import AccountForm from './Components/AccountForm';
import EmiCalculator from './Components/EMICalculator';

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
             element={<AccountForm logout={logout}/>}
          />
          
          <Route
            path="/transactions"
            element={<ProtectedRoute token={token} redirectTo="/login" component={<Transactions />} />}
          />
          <Route
            path="/loans"
            element={<ProtectedRoute token={token} redirectTo="/login" component={<EmiCalculator />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
