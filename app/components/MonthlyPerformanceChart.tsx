'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface FactoryData {
  production_level_2024: Array<{ month: string; value: number }>;
  inventory_level_2024: Array<{ month: string; value: number }>;
}

interface MonthlyData {
  month: string;
  Production: number;
  Inventory: number;
}

interface MonthlyPerformanceChartProps {
  factories: FactoryData[];
}

export default function MonthlyPerformanceChart({ factories }: MonthlyPerformanceChartProps) {
  // Aggregate production and inventory data across all factories
  const monthlyAggregates = factories.reduce((acc: Record<string, MonthlyData>, factory) => {
    factory.production_level_2024.forEach(({ month, value }) => {
      if (!acc[month]) {
        acc[month] = { month, Production: 0, Inventory: 0 };
      }
      acc[month].Production += value;
    });

    factory.inventory_level_2024.forEach(({ month, value }) => {
      if (!acc[month]) {
        acc[month] = { month, Production: 0, Inventory: 0 };
      }
      acc[month].Inventory += value;
    });

    return acc;
  }, {});

  // Convert the aggregated data into an array and calculate averages
  const data = Object.values(monthlyAggregates).map((item) => ({
    ...item,
    Production: Math.round(item.Production / factories.length),
    Inventory: Math.round(item.Inventory / factories.length),
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-center text-xl font-bold mb-4 text-gray-800">Monthly Performance</h3>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" stroke="#525252" />
            <YAxis stroke="#525252" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Production" fill="#16a34a" name="Avg. Production (Units)" />
            <Bar dataKey="Inventory" fill="#ef4444" name="Avg. Inventory (Units)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}