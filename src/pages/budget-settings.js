import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BudgetForm from '../components/BudgetForm';
import { FaArrowLeft } from 'react-icons/fa';

const BudgetSettingsPage = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [categoryBudgets, setCategoryBudgets] = useState({});

  useEffect(() => {
    setIsClient(true);
    const savedBudgets = localStorage.getItem('categoryBudgets');
    setCategoryBudgets(savedBudgets ? JSON.parse(savedBudgets) : {
      Food: 500,
      Rent: 1000,
      Utilities: 300,
    });
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('categoryBudgets', JSON.stringify(categoryBudgets));
    }
  }, [categoryBudgets, isClient]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push('/')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
        >
          <FaArrowLeft className="text-gray-600 text-lg" />
        </button>
        <h1 className="text-2xl font-bold">Budget Settings</h1>
      </div>
      {isClient && (
        <div className="max-w-2xl mx-auto">
          <BudgetForm
            categoryBudgets={categoryBudgets}
            onUpdateBudgets={setCategoryBudgets}
          />
        </div>
      )}
    </div>
  );
};

export default BudgetSettingsPage; 