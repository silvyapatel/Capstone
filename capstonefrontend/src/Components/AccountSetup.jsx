import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios';

function AccountSetup() {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Account Types (dropdown options)
  const accountTypes = [
    'SAVINGS',
    'CHECKING',
    'BUSINESS',
  ];

  // Get the JWT token from localStorage
  const token = localStorage.getItem('jwtToken');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields (if needed)
    if (!accountNumber || !accountType || !balance) {
      alert('Please fill out all fields and ensure you are logged in.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8080/accounts',  // Simplified URL without email in the path
        {
          accountNumber,
          balance,
          accountType                    
        },
        {
          headers: {
            Authorization: `Bearer ${token}`  // Send JWT token in Authorization header
          }
        }
      );

      // Handle successful account setup
      console.log('Account setup successful:', response.data);

      // Redirect to the dashboard after setup using navigate()
      navigate('/');
    } catch (err) {
      console.error('Account setup failed', err);
      alert('Account setup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Account Setup</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Account Number</label>
          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Account Type</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">Select Account Type</option>
            {accountTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label>Balance</label>
          <input
            type="number"
            placeholder="Balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.buttonsContainer}>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Saving...' : 'Complete Setup'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Inline styles for Account Setup form
const styles = {
  formContainer: {
    marginTop: '20px',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    maxWidth: '400px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
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
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AccountSetup;
