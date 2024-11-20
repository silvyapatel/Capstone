import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccountForm from '../Components/AccountForm';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);
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

  const handleCreateAccount = (newAccount) => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setError('No token found');
      return;
    }

    axios
      .post(
        'http://localhost:8080/accounts',
        newAccount,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAccounts([...accounts, response.data]);
        setShowCreateForm(false);
        alert(`Account created successfully! Account Number: ${response.data.accountNumber}`);
      })
      .catch((err) => {
        setError('Failed to create account');
        console.error(err);
      });
  };

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
        setAccounts(accounts.filter((account) => account.id !== accountId));
        alert('Account deleted successfully!');
      })
      .catch((err) => {
        setError('Failed to delete account');
        console.error(err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {!isLoggedIn ? (
        <div style={styles.welcomeMessage}>
          <h2>Welcome!</h2>
          <p>Please log in to access your dashboard and manage your accounts.</p>
        </div>
      ) : (
        <>
          <h1 style={styles.title}>Dashboard</h1>
          <button onClick={() => setShowCreateForm(!showCreateForm)} style={styles.button}>
            {showCreateForm ? 'Cancel' : 'Create New Account'}
          </button>
          {showCreateForm && (
            <AccountForm
              onSubmit={handleCreateAccount}
              onCancel={() => setShowCreateForm(false)}
            />
          )}
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
};

export default Dashboard;
