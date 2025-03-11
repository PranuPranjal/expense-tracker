import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const BudgetComparisonChart = ({ budgetData }) => {
  return (
    <LineChart width={600} height={300} data={budgetData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="budget" stroke="#8884d8" />
      <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
    </LineChart>
  );
};

export default BudgetComparisonChart;
