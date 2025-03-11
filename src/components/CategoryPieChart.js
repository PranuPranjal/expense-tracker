import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FaChartPie } from 'react-icons/fa';
import { useMemo } from 'react';

const COLORS = [
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f97316', // Orange
  '#8b5cf6', // Purple
  '#ef4444', // Red
  '#06b6d4', // Cyan
];

const CategoryPieChart = ({ transactions }) => {
  // Memoize the calculations to improve performance
  const { total, pieData } = useMemo(() => {
    // Calculate total amount for percentage calculation
    const total = transactions.reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

    // Group transactions by category
    const categoryData = transactions.reduce((acc, txn) => {
      const amount = parseFloat(txn.amount);
      acc[txn.category] = (acc[txn.category] || 0) + amount;
      return acc;
    }, {});

    // Convert to array and calculate percentages
    const pieData = Object.entries(categoryData)
      .map(([category, value]) => ({
        name: category,
        value: value,
        percentage: ((value / total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value); // Sort by value in descending order

    return { total, pieData };
  }, [transactions]); // Only recalculate when transactions change

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow">
          <p className="font-semibold text-lg">{data.name}</p>
          <p className="text-gray-600">{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(data.value)}</p>
          <p className="text-sm text-gray-500">{data.percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  // Custom Legend
  const CustomLegend = () => {
    if (!pieData.length) return null;

    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {pieData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{entry.name}</span>
                <span className="text-gray-500 text-sm">{entry.percentage}%</span>
              </div>
              <p className="text-sm text-gray-600">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(entry.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!transactions.length) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaChartPie className="text-primary" />
          Category Distribution
        </h2>
        <div className="flex items-center justify-center h-[200px] text-gray-500">
          No transactions to display
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FaChartPie className="text-primary" />
        Category Distribution
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={1}
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />}
              wrapperStyle={{ outline: 'none' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend />
    </div>
  );
};

export default CategoryPieChart;
