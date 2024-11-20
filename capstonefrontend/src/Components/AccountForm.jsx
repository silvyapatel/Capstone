import React, { useState } from 'react';

const AccountForm = ({ onSubmit, onCancel, initialAccount = { accountType: 'SAVINGS', balance: 0 } }) => {
  const [accountData, setAccountData] = useState(initialAccount);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(accountData); // Pass form data back to parent component
  };

  return (
    <div style={styles.formContainer}>
      <h2>Create a New Account</h2>
      <form onSubmit={handleFormSubmit}>
        <div style={styles.inputGroup}>
          <label>Account Type:</label>
          <select
            name="accountType"
            value={accountData.accountType}
            onChange={handleInputChange}
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
            name="balance"
            value={accountData.balance}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>Create Account</button>
          <button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  formContainer: {
    marginTop: '20px',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
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
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AccountForm;
