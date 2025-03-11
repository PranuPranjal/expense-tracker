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
                <label className="block text-sm font-semibold text-white">
                  {category}
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => handleUpdateBudget(category, e.target.value)}
                  className="input mt-1 text-white bg-gray-700 border-gray-600 focus:border-blue-500"
                  min="0"
                />
              </div>
              <button
                onClick={() => handleDeleteCategory(category)}
                className="p-2 text-red-400 hover:bg-gray-700 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
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
              <label className="block text-sm font-semibold text-white">
                Category Name
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="input mt-1 text-white bg-gray-700 border-gray-600 focus:border-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white">
                Budget Amount
              </label>
              <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="input mt-1 text-white bg-gray-700 border-gray-600 focus:border-blue-500"
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
                className="button bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 hover:shadow-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="button button-primary w-full flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg"
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