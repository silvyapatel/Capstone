import React from 'react';

const AccountDetails = ({ account }) => {
  return (
    <div>
      <h3>Account Details</h3>
      <p>Account Number: {account.accountNumber}</p>
      <p>Account Type: {account.accountType}</p>
      <p>Balance: {account.balance}</p>
    </div>
  );
};

export default AccountDetails;
