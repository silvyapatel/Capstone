import React, { useState } from 'react';
import axios from 'axios';

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEmi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for inputs
    if (!loanAmount || !interestRate || !loanTenure) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    // Get the token from localStorage (or any other secure storage)
    const token = localStorage.getItem('jwtToken');

    // Check if the token exists
    if (!token) {
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    try {
      // POST request to the backend with loan data and token in headers
      const response = await axios.post(
        'http://localhost:8080/loan/calculate-emi',  // Endpoint for EMI calculation
        {
          loanAmount,
          interestRate,
          loanTenure,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Add the token to the Authorization header
          },
        }
      );

      // Handle the response and set EMI value
      setEmi(response.data.emi);
    } catch (err) {
      // Handle errors
      setError('Failed to calculate EMI');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>EMI Calculator</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Loan Amount</label>
          <input
            type="number"
            placeholder="Enter Loan Amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Interest Rate (%)</label>
          <input
            type="number"
            placeholder="Enter Interest Rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Loan Tenure (in months)</label>
          <input
            type="number"
            placeholder="Enter Loan Tenure"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.buttonContainer}>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Calculating...' : 'Calculate EMI'}
          </button>
        </div>
      </form>

      {emi !== null && !loading && !error && (
        <div style={styles.resultContainer}>
          <h3>Calculated EMI: ₹{emi.toFixed(2)}</h3>
        </div>
      )}

      {error && !loading && (
        <div style={styles.errorContainer}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

// Styles for EMI Calculator form and result
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
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
  resultContainer: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '18px',
    color: '#333',
  },
  errorContainer: {
    textAlign: 'center',
    marginTop: '20px',
    color: 'red',
  },
};

export default EmiCalculator;
