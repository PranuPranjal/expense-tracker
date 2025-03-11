const SummaryCards = ({ totalExpenses, highestSpendingCategory, recentTransactions }) => {
    return (
      <div className="summary-cards">
        <div className="card">
          <h3>Total Expenses</h3>
          <p>{totalExpenses}</p>
        </div>
        <div className="card">
          <h3>Highest Spending Category</h3>
          <p>{highestSpendingCategory}</p>
        </div>
        <div className="card">
          <h3>Recent Transactions</h3>
          <ul>
            {recentTransactions.map((txn) => (
              <li key={txn._id}>{txn.description} - {txn.amount}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default SummaryCards;
  