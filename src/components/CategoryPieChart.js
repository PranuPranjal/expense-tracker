import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CategoryPieChart = ({ transactions }) => {
  const categoryData = transactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const pieData = Object.keys(categoryData).map((key) => ({
    category: key,
    value: categoryData[key],
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="category"
        outerRadius={150}
        fill="#8884d8"
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default CategoryPieChart;
