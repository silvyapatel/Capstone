// import React, { useState } from 'react';
// import axios from 'axios';

// const TransactionForm = ({ onSuccess, onCancel }) => {
//     const [transactionType, setTransactionType] = useState('');
//     const [formData, setFormData] = useState({
//         accountNumber: '',
//         amount: '',
//         email: '',
//         targetAccountNumber: '',
//     });

//     // Handle form data change
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('jwtToken');

//         try {
//             let response;

//             if (transactionType === 'Deposit') {
//                 response = await axios.post(
//                     'http://localhost:8080/transactions/deposit',
//                     { accountNumber: formData.accountNumber, amount: formData.amount },
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//             } else if (transactionType === 'Withdraw') {
//                 response = await axios.post(
//                     'http://localhost:8080/transactions/withdraw',
//                     { accountNumber: formData.accountNumber, amount: formData.amount, userEmail: formData.email },
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//             } else if (transactionType === 'Transfer') {
//                 response = await axios.post(
//                     'http://localhost:8080/transactions/transfer',
//                     { sourceAccountNumber: formData.accountNumber, targetAccountNumber: formData.targetAccountNumber, amount: formData.amount },
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//             }

//             alert('Transaction successful');
//             setFormData({ accountNumber: '', amount: '', email: '', targetAccountNumber: '' });
//             setTransactionType('');
//             onSuccess(); // Notify the parent component
//         } catch (err) {
//             console.error('Transaction failed', err);
//             alert('Transaction failed. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h2>Make Transaction</h2>
//             <div>
//                 <label>Select Transaction Type: </label>
//                 <select onChange={(e) => setTransactionType(e.target.value)} value={transactionType}>
//                     <option value="">--Select--</option>
//                     <option value="Deposit">Deposit</option>
//                     <option value="Withdraw">Withdraw</option>
//                     <option value="Transfer">Transfer</option>
//                 </select>
//             </div>
//             {transactionType && (
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label>Account Number</label>
//                         <input
//                             type="text"
//                             name="accountNumber"
//                             value={formData.accountNumber}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     {transactionType === 'Deposit' && (
//                         <div>
//                             <label>Amount</label>
//                             <input
//                                 type="number"
//                                 name="amount"
//                                 value={formData.amount}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                     )}
//                     {transactionType === 'Withdraw' && (
//                         <>
//                             <div>
//                                 <label>Email</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label>Amount</label>
//                                 <input
//                                     type="number"
//                                     name="amount"
//                                     value={formData.amount}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>
//                         </>
//                     )}
//                     {transactionType === 'Transfer' && (
//                         <>
//                             <div>
//                                 <label>Target Account Number</label>
//                                 <input
//                                     type="text"
//                                     name="targetAccountNumber"
//                                     value={formData.targetAccountNumber}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label>Amount</label>
//                                 <input
//                                     type="number"
//                                     name="amount"
//                                     value={formData.amount}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </div>
//                         </>
//                     )}
//                     <div>
//                         <button type="submit">Submit Transaction</button>
//                         <button type="button" onClick={onCancel}>Cancel</button>
//                     </div>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default TransactionForm;
import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ onCancel, onTransactionComplete }) => {
    const [transactionType, setTransactionType] = useState('');
    const [formData, setFormData] = useState({
        accountNumber: '',
        amount: '',
        email: '',
        targetAccountNumber: '',
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwtToken');
        setLoading(true);

        try {
            let response;
            if (transactionType === 'Deposit') {
                response = await axios.post(
                    'http://localhost:8080/transactions/deposit',
                    { accountNumber: formData.accountNumber, amount: formData.amount },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else if (transactionType === 'Withdraw') {
                response = await axios.post(
                    'http://localhost:8080/transactions/withdraw',
                    { accountNumber: formData.accountNumber, amount: formData.amount, userEmail: formData.email },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else if (transactionType === 'Transfer') {
                response = await axios.post(
                    'http://localhost:8080/transactions/transfer',
                    { sourceAccountNumber: formData.accountNumber, targetAccountNumber: formData.targetAccountNumber, amount: formData.amount },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            onTransactionComplete(response.data);
            alert('Transaction successful!');
        } catch (err) {
            console.error('Transaction failed', err);
            alert('Transaction failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.title}>Make a Transaction</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Transaction Type</label>
                    <select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        style={styles.input}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Deposit">Deposit</option>
                        <option value="Withdraw">Withdraw</option>
                        <option value="Transfer">Transfer</option>
                    </select>
                </div>
                {transactionType && (
                    <>
                        <div style={styles.inputGroup}>
                            <label>Account Number</label>
                            <input
                                type="text"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleInputChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        {transactionType === 'Withdraw' && (
                            <div style={styles.inputGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        )}
                        {transactionType === 'Transfer' && (
                            <div style={styles.inputGroup}>
                                <label>Target Account Number</label>
                                <input
                                    type="text"
                                    name="targetAccountNumber"
                                    value={formData.targetAccountNumber}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        )}
                        <div style={styles.inputGroup}>
                            <label>Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.buttonsContainer}>
                            <button type="submit" style={styles.button} disabled={loading}>
                                {loading ? 'Processing...' : 'Submit'}
                            </button>
                            <button type="button" style={styles.cancelButton} onClick={onCancel}>
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

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

export default TransactionForm;
