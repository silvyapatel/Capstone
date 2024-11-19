import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import HomePage from './Pages/HomePage';
import { AuthProvider } from './Context/AuthContext';
import AccountPage from './Pages/AccountPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="accounts" element={<AccountPage/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
