import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Chart = ({ transactions }) => {
  // Create a map to store monthly totals with both month name and numeric month
  const monthlyData = transactions.reduce((acc, txn) => {
    const date = new Date(txn.date);
    const monthName = date.toLocaleString('default', { month: 'long' });
    const monthKey = date.getMonth(); // 0-11 for sorting
    const year = date.getFullYear();
    
    // Create a unique key for each month-year combination
    const key = `${year}-${monthKey}`;
    
    if (!acc[key]) {
      acc[key] = {
        name: monthName,
        value: 0,
        monthKey,
        year
      };
    }
    acc[key].value += txn.amount;
    return acc;
  }, {});

  // Convert to array and sort by year and month
  const chartData = Object.values(monthlyData)
    .sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      return a.monthKey - b.monthKey;
    });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
          formatter={(value) => new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
          }).format(value)}
        />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Chart;
