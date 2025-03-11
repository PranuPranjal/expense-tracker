import { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => console.error('Failed to fetch transactions:', error));
  }, []);

  const deleteTransaction = (id) => {
    fetch('/api/transactions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id.toString() }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => Promise.reject(err));
        }
        setTransactions(transactions.filter((txn) => txn._id !== id));
      })
      .catch((error) => {
        console.error('Failed to delete transaction:', error);
        alert(error.error || 'Failed to delete transaction');
      });
  };

  const handleEditTransaction = (transaction) => {
    router.push({
      pathname: '/add-transaction',
      query: { edit: JSON.stringify(transaction) }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold">Transaction History</h1>
      </div>
      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        onEditTransaction={handleEditTransaction}
      />
    </div>
  );
};

export default TransactionsPage; 