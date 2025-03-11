import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FaHistory, FaPlus, FaCog, FaChartLine, FaWallet } from 'react-icons/fa';

// Import charts with dynamic loading and disabled SSR
const Chart = dynamic(() => import('../components/Chart'), { ssr: false });
const CategoryPieChart = dynamic(() => import('../components/CategoryPieChart'), { ssr: false });
const BudgetComparisonChart = dynamic(() => import('../components/BudgetComparisonChart'), { ssr: false });

const Home = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState({});

  // Handle client-side initialization
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
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => console.error('Failed to fetch transactions:', error));
  }, []);

  // Calculate monthly expenses and category spending
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyTransactions = transactions.filter(txn => {
    const txnDate = new Date(txn.date);
    return txnDate.getMonth() === currentMonth && txnDate.getFullYear() === currentYear;
  });

  const monthlyTotal = monthlyTransactions.reduce((sum, txn) => 
    sum + Math.abs(parseFloat(txn.amount)), 0
  );

  const categorySpending = monthlyTransactions.reduce((acc, txn) => {
    const amount = Math.abs(parseFloat(txn.amount));
    acc[txn.category] = (acc[txn.category] || 0) + amount;
    return acc;
  }, {});

  const highestSpendingCategory = Object.entries(categorySpending)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'No spending';

  // Calculate budget data for current month only
  const budgetData = Object.keys(categoryBudgets).map((cat) => ({
    category: cat,
    budget: categoryBudgets[cat],
    actual: monthlyTransactions
      .filter((txn) => txn.category === cat)
      .reduce((sum, txn) => sum + Math.abs(parseFloat(txn.amount)), 0),
  }));

  const lastThreeTransactions = transactions.slice(0, 3);

  // Get current month name for display
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push('/transactions')}
          className="button button-secondary flex items-center gap-2"
        >
          <FaHistory />
          Transaction History
        </button>
        <button
          onClick={() => router.push('/add-transaction')}
          className="button button-primary flex items-center gap-2"
        >
          <FaPlus />
          Add Transaction
        </button>
        <button
          onClick={() => router.push('/budget-settings')}
          className="button button-secondary flex items-center gap-2"
        >
          <FaCog />
          Budget Settings
        </button>
      </div>

      {/* Monthly Summary */}
      {isClient && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <FaWallet className="text-primary text-xl" />
              <h2 className="text-xl font-semibold">{currentMonthName} Summary</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-primary">
                  ${monthlyTotal.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Highest Spending Category</p>
                <p className="text-xl font-semibold">{highestSpendingCategory}</p>
                <p className="text-primary font-medium">
                  ${(categorySpending[highestSpendingCategory] || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <FaChartLine className="text-primary text-xl" />
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
            </div>
            <div className="space-y-4">
              {lastThreeTransactions.map((transaction) => (
                <div key={transaction._id} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-gray-600">{transaction.category}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <p className={`text-lg font-semibold ${
                    parseFloat(transaction.amount) > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${Math.abs(parseFloat(transaction.amount)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      {isClient && (
        <div className="space-y-6">
          {/* Category and Budget Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-4">{currentMonthName} Expenses by Category</h3>
              <CategoryPieChart transactions={monthlyTransactions} />
            </div>
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-4">{currentMonthName} Budget vs Actual</h3>
              <BudgetComparisonChart budgetData={budgetData} />
            </div>
          </div>
          
          {/* Monthly Expense Trend */}
          <div className="card p-4">
            <h3 className="text-lg font-semibold mb-4">Monthly Expense Trend</h3>
            <Chart transactions={transactions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
