import { FaMoneyBillWave, FaChartPie, FaHistory } from 'react-icons/fa';

const SummaryCards = ({ totalExpenses, highestSpendingCategory, recentTransactions }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="summary-cards">
      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <FaMoneyBillWave size={24} />
          </div>
          <h3 className="text-lg font-semibold">Total Expenses</h3>
        </div>
        <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalExpenses)}</p>
      </div>
      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <FaChartPie size={24} />
          </div>
          <h3 className="text-lg font-semibold">Highest Spending</h3>
        </div>
        <p className="text-2xl font-bold text-purple-600">{highestSpendingCategory}</p>
      </div>
      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <FaHistory size={24} />
          </div>
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
        </div>
        <ul className="space-y-2">
          {recentTransactions.slice(0, 3).map((txn) => (
            <li key={txn._id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
              <span className="font-medium">{txn.description}</span>
              <span className="text-green-600 font-semibold">{formatCurrency(txn.amount)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SummaryCards;
  