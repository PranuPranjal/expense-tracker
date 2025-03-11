import { useState } from 'react';
import { FaWallet, FaPlus, FaTrash } from 'react-icons/fa';

const BudgetForm = ({ categoryBudgets, onUpdateBudgets }) => {
  const [newCategory, setNewCategory] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCategory || !newBudget) return;

    const updatedBudgets = {
      ...categoryBudgets,
      [newCategory]: parseFloat(newBudget)
    };
    onUpdateBudgets(updatedBudgets);
    setNewCategory('');
    setNewBudget('');
    setIsEditing(false);
  };

  const handleDeleteCategory = (category) => {
    const { [category]: _, ...remainingBudgets } = categoryBudgets;
    onUpdateBudgets(remainingBudgets);
  };

  const handleUpdateBudget = (category, value) => {
    onUpdateBudgets({
      ...categoryBudgets,
      [category]: parseFloat(value)
    });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaWallet className="text-primary" />
        Budget Settings
      </h2>

      <div className="space-y-4">
        {/* Existing Categories */}
        <div className="grid gap-3">
          {Object.entries(categoryBudgets).map(([category, budget]) => (
            <div key={category} className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  {category}
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => handleUpdateBudget(category, e.target.value)}
                  className="input mt-1"
                  min="0"
                />
              </div>
              <button
                onClick={() => handleDeleteCategory(category)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Delete category"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Category */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="input mt-1"
                placeholder="Enter category name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget Amount
              </label>
              <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="input mt-1"
                placeholder="Enter budget amount"
                min="0"
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="button button-primary flex-1">
                Add Category
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="button bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="button button-primary w-full flex items-center justify-center gap-2"
          >
            <FaPlus />
            Add New Category
          </button>
        )}
      </div>
    </div>
  );
};

export default BudgetForm; 