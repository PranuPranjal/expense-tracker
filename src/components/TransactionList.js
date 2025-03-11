const TransactionList = ({ transactions, deleteTransaction }) => {
    return (
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.description} - {transaction.amount} - {transaction.date} - {transaction.category}
            <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
export default TransactionList;
  