import { useState } from 'react';

const TransactionForm = ({ categories, addTransaction }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.date || !formData.category) {
      alert('All fields are required');
      return;
    }

    addTransaction(formData);
    setFormData({ description: '', amount: '', date: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="" disabled>Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
