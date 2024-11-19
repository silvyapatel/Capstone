import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import accountService from '../Services/AccountService';
import AccountList from '../Components/Account/AccountList'; 
import AccountForm from '../Components/Account/AccountForm';
import AccountDetails from '../Components/Account/AccountDetails';

const AccountPage = () => {
  const { authData } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);  // State for form visibility

  useEffect(() => {
    if (authData && authData.id) {  // Check if user is logged in
      accountService.getAccountsByUserId(authData.id)
        .then((response) => {
          setAccounts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching accounts:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);  // Stop loading if no user data
    }
  }, [authData]);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);  // Select account for details view
  };

  const handleCreateAccountClick = () => {
    setShowCreateForm(true); // Show form when "Create Account" button is clicked
  };

  const handleAccountCreate = (newAccount) => {
    setAccounts([...accounts, newAccount]); // Add new account to list
    setShowCreateForm(false); // Hide form after creation
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authData) {
    return <div>Please log in to view your accounts.</div>;
  }

  return (
    <div>
      <h2>Accounts</h2>
      {accounts.length === 0 && (
        <div>
          <h2>No Accounts Found</h2>
          <button onClick={handleCreateAccountClick}>Create Account</button>
        </div>
      )}
      {showCreateForm && <AccountForm onAccountCreate={handleAccountCreate} />}
      <AccountList accounts={accounts} onAccountSelect={handleAccountSelect} />
      {selectedAccount && <AccountDetails account={selectedAccount} />}
    </div>
  );
};

export default AccountPage;
