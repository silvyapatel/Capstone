import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from '../Components/TransactionForm';
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMakingTransaction, setIsMakingTransaction] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/transactions/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransactions(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch transactions');
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const handleTransactionComplete = (newTransaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
        setIsMakingTransaction(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={styles.container}>
            {!isMakingTransaction ? (
                <>
                    <h1 style={styles.title}>Transactions</h1>
                    <button onClick={() => setIsMakingTransaction(true)} style={styles.button}>
                        Make Transaction
                    </button>
                    {transactions.length === 0 ? (
                        <p>No transactions found.</p>
                    ) : (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.type}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            ) : (
                <TransactionForm
                    onCancel={() => setIsMakingTransaction(false)}
                    onTransactionComplete={handleTransactionComplete}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '20px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    table: {
        width: '100%',
        border: '1px solid #ddd',
        marginTop: '20px',
        borderCollapse: 'collapse',
        textAlign: 'center',
    },
};
export default Transactions;
