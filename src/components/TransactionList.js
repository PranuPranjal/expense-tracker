import { FaTrash, FaList, FaCalendarAlt, FaTags, FaPencilAlt } from 'react-icons/fa';

const TransactionList = ({ transactions, deleteTransaction, onEditTransaction }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="transaction-list">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaList className="text-primary" />
        Transaction History
      </h2>
      <div className="divide-y">
        {transactions.map((transaction) => (
          <div key={transaction._id} className="transaction-item flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="font-medium">{transaction.description}</h3>
                <span className="font-semibold text-lg">
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-gray-400" />
                  {formatDate(transaction.date)}
                </div>
                <div className="flex items-center gap-1">
                  <FaTags className="text-gray-400" />
                  {transaction.category}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:self-center mt-2 sm:mt-0">
              <button
                onClick={() => onEditTransaction(transaction)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                title="Edit transaction"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => deleteTransaction(transaction._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md"
                title="Delete transaction"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
  