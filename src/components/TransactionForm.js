import { useState, useEffect } from 'react';
import { FaPlus, FaMoneyBillWave, FaCalendarAlt, FaTags, FaFileAlt, FaSave } from 'react-icons/fa';

const TransactionForm = ({ categories, addTransaction, editingTransaction, onUpdateTransaction, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
  });

  useEffect(() => {
    if (editingTransaction) {
      const date = new Date(editingTransaction.date).toISOString().split('T')[0];
      setFormData({
        description: editingTransaction.description,
        amount: editingTransaction.amount.toString(),
        date: date,
        category: editingTransaction.category,
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
      });
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.date || !formData.category) {
      alert('All fields are required');
      return;
    }

    const formattedData = {
      ...formData,
      date: formData.date,
      amount: parseFloat(formData.amount)
    };

    if (editingTransaction) {
      onUpdateTransaction({
        _id: editingTransaction._id,
        ...formattedData,
      });
    } else {
      addTransaction(formattedData);
    }

    setFormData({
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {editingTransaction ? (
          <>
            <FaSave className="text-primary" />
            Edit Transaction
          </>
        ) : (
          <>
            <FaPlus className="text-primary" />
            Add New Transaction
          </>
        )}
      </h2>
      
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaFileAlt className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Description"
            className="input pl-10"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaMoneyBillWave className="text-gray-400" />
          </div>
          <input
            type="number"
            placeholder="Amount"
            className="input pl-10"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaCalendarAlt className="text-gray-400" />
          </div>
          <input
            type="date"
            className="input pl-10"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaTags className="text-gray-400" />
          </div>
          <select
            className="input pl-10"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="button button-primary flex-1"
        >
          {editingTransaction ? <FaSave /> : <FaPlus />}
          {editingTransaction ? 'Save Changes' : 'Add Transaction'}
        </button>
        
        {editingTransaction && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="button bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
