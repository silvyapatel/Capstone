import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ token, logout }) {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex' }}>
        <li style={{ marginRight: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/transactions" style={{ color: 'white', textDecoration: 'none' }}>Transactions</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/loans" style={{ color: 'white', textDecoration: 'none' }}>Loans</Link>
        </li>
        {!token ? (
          <>
            <li style={{ marginRight: '20px' }}>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            </li>
            <li>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={logout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
