import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    accountType: 'SAVINGS',
    balance: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Fetch the list of accounts
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setIsLoggedIn(false); // Set to false if no token
      setLoading(false);
      return;
    }

    setIsLoggedIn(true); // Set to true if token exists
    axios
      .get('http://localhost:8080/accounts/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAccounts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load accounts');
        setLoading(false);
        console.error(err);
      });
  }, []);

  // Handle form submission for creating a new account
  const handleCreateAccount = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setError('No token found');
      return;
    }

    axios
      .post('http://localhost:8080/accounts', newAccount, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAccounts([...accounts, response.data]); // Add the newly created account to the list
        setShowCreateForm(false); // Hide the form after submission
        setNewAccount({ accountNumber: '', accountType: 'SAVINGS', balance: 0 }); // Reset the form fields
        alert('Account created successfully!');
      })
      .catch((err) => {
        setError('Failed to create account');
        console.error(err);
      });
  };

  // Handle deleting an account
  const handleDeleteAccount = (accountId) => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setError('No token found');
      return;
    }

    axios
      .delete(`http://localhost:8080/accounts/${accountId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAccounts(accounts.filter((account) => account.id !== accountId)); // Remove the deleted account from the list
        alert('Account deleted successfully!');
      })
      .catch((err) => {
        setError('Failed to delete account');
        console.error(err);
      });
  };

  // Show loading or error state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {!isLoggedIn ? (
        // Display welcome message if not logged in
        <div style={styles.welcomeMessage}>
          <h2>Welcome!</h2>
          <p>
            It seems you're not logged in. Please log in to access your dashboard and manage your accounts.
          </p>
        </div>
      ) : (
        <>
          <h1 style={styles.title}>Dashboard</h1>

          {/* Button to toggle account creation form */}
          <button onClick={() => setShowCreateForm(!showCreateForm)} style={styles.button}>
            {showCreateForm ? 'Cancel' : 'Create New Account'}
          </button>

          {/* Conditionally render Create Account form */}
          {showCreateForm && (
            <div style={styles.formContainer}>
              <h2>Create a New Account</h2>
              <form onSubmit={handleCreateAccount}>
                <div style={styles.inputGroup}>
                  <label>Account Number:</label>
                  <input
                    type="text"
                    value={newAccount.accountNumber}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, accountNumber: e.target.value })
                    }
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label>Account Type:</label>
                  <select
                    value={newAccount.accountType}
                    onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
                    style={styles.input}
                  >
                    <option value="SAVINGS">Savings</option>
                    <option value="CHECKING">Checking</option>
                    <option value="BUSINESS">Business</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label>Balance:</label>
                  <input
                    type="number"
                    value={newAccount.balance}
                    onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                    required
                    style={styles.input}
                  />
                </div>
                <button type="submit" style={styles.button}>
                  Create Account
                </button>
              </form>
            </div>
          )}

          {/* List the accounts */}
          {!showCreateForm && (
            <div>
              <h2>Your Accounts</h2>
              {accounts.length === 0 ? (
                <p>No accounts found.</p>
              ) : (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Account Number</th>
                      <th>Account Type</th>
                      <th>Balance</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((account) => (
                      <tr key={account.id}>
                        <td>{account.accountNumber}</td>
                        <td>{account.accountType}</td>
                        <td>{account.balance}</td>
                        <td>
                          {/* Delete button for each account */}
                          <button
                            onClick={() => handleDeleteAccount(account.id)}
                            style={styles.deleteButton}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Inline styles for Dashboard
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  welcomeMessage: {
    textAlign: 'center',
    color: '#333',
    fontSize: '18px',
    padding: '20px',
    backgroundColor: '#f0f8ff',
    borderRadius: '8px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
    marginBottom: '20px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  table: {
    width: '100%',
    border: 'solid 1px #ddd',
    marginTop: '20px',
    borderCollapse: 'collapse',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  formContainer: {
    marginTop: '20px',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
};

export default Dashboard;
