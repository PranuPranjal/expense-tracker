import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Chart = ({ transactions }) => {
  const monthlyData = transactions.reduce((acc, txn) => {
    const month = new Date(txn.date).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + txn.amount;
    return acc;
  }, {});

  const chartData = Object.keys(monthlyData).map((key) => ({
    name: key,
    value: monthlyData[key],
  }));

  return (
    <BarChart width={600} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default Chart;
