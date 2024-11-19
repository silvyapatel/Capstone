import React, { useState } from 'react';
import accountService from '../../Services/AccountService';

const AccountForm = ({ onAccountCreate }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAccount = { accountNumber, accountType, balance: parseFloat(balance) };
    try {
      const response = await accountService.createAccount(newAccount);
      onAccountCreate(response.data);  // Pass new account data back to parent component
      setAccountNumber('');  // Clear the form after successful submission
      setAccountType('');
      setBalance('');
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div>
      <h3>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Account Type:</label>
          <input
            type="text"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Balance:</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default AccountForm;
