import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Chart from '../components/Chart';
import CategoryPieChart from '../components/CategoryPieChart';
import SummaryCards from '../components/SummaryCards';
import BudgetComparisonChart from '../components/BudgetComparisonChart';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [categoryBudgets, setCategoryBudgets] = useState({
    Food: 500,
    Rent: 1000,
    Utilities: 300,
  });

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const addTransaction = (newTransaction) => {
    fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => setTransactions([...transactions, data]));
  };

  const deleteTransaction = (id) => {
    fetch('/api/transactions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(() => setTransactions(transactions.filter((txn) => txn._id !== id)));
  };

  const totalExpenses = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const recentTransactions = transactions.slice(0, 5);
  const highestSpendingCategory = Object.keys(categoryBudgets).reduce((a, b) =>
    categoryBudgets[a] > categoryBudgets[b] ? a : b
  );

  const budgetData = Object.keys(categoryBudgets).map((cat) => ({
    category: cat,
    budget: categoryBudgets[cat],
    actual: transactions
      .filter((txn) => txn.category === cat)
      .reduce((sum, txn) => sum + txn.amount, 0),
  }));

  return (
    <div>
      <TransactionForm categories={Object.keys(categoryBudgets)} addTransaction={addTransaction} />
      <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
      <Chart transactions={transactions} />
      <CategoryPieChart transactions={transactions} />
      <SummaryCards
        totalExpenses={totalExpenses}
        highestSpendingCategory={highestSpendingCategory}
        recentTransactions={recentTransactions}
      />
      <BudgetComparisonChart budgetData={budgetData} />
    </div>
  );
};

export default Home;
