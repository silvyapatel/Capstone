import React from 'react';

const AccountList = ({ accounts, onAccountSelect }) => {
  return (
    <div>
      <h3>Accounts List</h3>
      <ul>
        {accounts.map((account) => (
          <li key={account.id} onClick={() => onAccountSelect(account)}>
            {account.accountNumber} - {account.accountType} - {account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
