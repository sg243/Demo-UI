import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Calendar, Filter, Download } from 'lucide-react';

const dailySalesData = [
  { date: 'Jun 01', sales: 12500, target: 15000, orders: 45 },
  { date: 'Jun 02', sales: 15800, target: 15000, orders: 58 },
  { date: 'Jun 03', sales: 9300, target: 15000, orders: 32 },
  { date: 'Jun 04', sales: 18200, target: 15000, orders: 67 },
  { date: 'Jun 05', sales: 22100, target: 15000, orders: 78 },
  { date: 'Jun 06', sales: 25400, target: 15000, orders: 89 },
  { date: 'Jun 07', sales: 28900, target: 15000, orders: 95 },
  { date: 'Jun 08', sales: 16700, target: 15000, orders: 61 },
  { date: 'Jun 09', sales: 19200, target: 15000, orders: 72 },
  { date: 'Jun 10', sales: 21800, target: 15000, orders: 81 }
];

const weeklySalesData = [
  { week: 'Week 1', sales: 145600, target: 140000, growth: 8.2 },
  { week: 'Week 2', sales: 167800, target: 140000, growth: 12.5 },
  { week: 'Week 3', sales: 189200, target: 140000, growth: 18.7 },
  { week: 'Week 4', sales: 203400, target: 140000, growth: 22.1 }
];

export const SalesTrendChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const currentData = viewMode === 'daily' ? dailySalesData : weeklySalesData;
  const totalSales = currentData.reduce((sum, item) => sum + item.sales, 0);
  const avgGrowth = viewMode === 'weekly' 
    ? weeklySalesData.reduce((sum, item) => sum + item.growth, 0) / weeklySalesData.length
    : ((currentData[currentData.length - 1].sales - currentData[0].sales) / currentData[0].sales) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Sales Performance Trends</h2>
              <p className="text-blue-100 text-sm">Monitor daily & weekly revenue patterns</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'daily' 
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-400'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'weekly' 
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-400'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
          >
            <div className="text-2xl font-bold text-emerald-700">₹{totalSales.toLocaleString()}</div>
            <div className="text-sm text-emerald-600">Total {viewMode === 'daily' ? 'Daily' : 'Weekly'} Sales</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
          >
            <div className="text-2xl font-bold text-blue-700">+{avgGrowth.toFixed(1)}%</div>
            <div className="text-sm text-blue-600">Average Growth</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
          >
            <div className="text-2xl font-bold text-purple-700">
              {viewMode === 'daily' ? Math.round(totalSales / currentData.length) : currentData.length}
            </div>
            <div className="text-sm text-purple-600">
              {viewMode === 'daily' ? 'Avg Daily Sales' : 'Weeks Tracked'}
            </div>
          </motion.div>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {viewMode === 'daily' ? 'Last 10 Days' : 'Last 4 Weeks'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChartType('area')}
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  chartType === 'area' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Area
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  chartType === 'line' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Line
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey={viewMode === 'daily' ? 'date' : 'week'} 
                  stroke="#6b7280" 
                  fontSize={12}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                  formatter={(value: number, name: string) => [
                    `₹${value.toLocaleString()}`,
                    name === 'sales' ? 'Sales' : 'Target'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  fill="url(#salesGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  fill="url(#targetGradient)" 
                />
              </AreaChart>
            ) : (
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey={viewMode === 'daily' ? 'date' : 'week'} 
                  stroke="#6b7280" 
                  fontSize={12}
                />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                  formatter={(value: number, name: string) => [
                    `₹${value.toLocaleString()}`,
                    name === 'sales' ? 'Sales' : 'Target'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <h4 className="font-semibold text-green-900 mb-2">📈 Peak Performance</h4>
            <p className="text-sm text-green-800">
              {viewMode === 'daily' 
                ? 'Weekend sales show 40% higher performance. Optimize weekend staffing.'
                : 'Week 4 shows strongest growth at 22.1%. Campaign effectiveness confirmed.'
              }
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
            <h4 className="font-semibold text-amber-900 mb-2">💡 AI Recommendation</h4>
            <p className="text-sm text-amber-800">
              {viewMode === 'daily'
                ? 'Increase inventory for high-demand items before weekends.'
                : 'Replicate successful Week 4 strategies for upcoming periods.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};