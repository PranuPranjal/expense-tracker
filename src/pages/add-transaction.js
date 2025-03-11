import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TransactionForm from '../components/TransactionForm';
import { FaArrowLeft } from 'react-icons/fa';

const AddTransactionPage = () => {
  const router = useRouter();
  const [categoryBudgets, setCategoryBudgets] = useState({});
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    // Load category budgets from localStorage
    const savedBudgets = localStorage.getItem('categoryBudgets');
    if (savedBudgets) {
      setCategoryBudgets(JSON.parse(savedBudgets));
    }

    // Check for editing transaction from query params
    if (router.query.edit) {
      try {
        const transaction = JSON.parse(router.query.edit);
        setEditingTransaction(transaction);
      } catch (error) {
        console.error('Failed to parse editing transaction:', error);
      }
    }
  }, [router.query]);

  const addTransaction = (newTransaction) => {
    fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Failed to add transaction:', error);
        alert('Failed to add transaction');
      });
  };

  const updateTransaction = (updatedTransaction) => {
    const transactionToUpdate = {
      ...updatedTransaction,
      _id: updatedTransaction._id.toString(),
      amount: parseFloat(updatedTransaction.amount)
    };

    fetch('/api/transactions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionToUpdate),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw error;
        }
        return res.json();
      })
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Failed to update transaction:', error);
        alert(error.error || 'Failed to update transaction');
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
        <h1 className="text-2xl font-bold">
          {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
        </h1>
      </div>
      <div className="max-w-2xl mx-auto">
        <TransactionForm
          categories={Object.keys(categoryBudgets)}
          addTransaction={addTransaction}
          editingTransaction={editingTransaction}
          onUpdateTransaction={updateTransaction}
          onCancelEdit={() => router.push('/transactions')}
        />
      </div>
    </div>
  );
};

export default AddTransactionPage; 