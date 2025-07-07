import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, TrendingDown, AlertCircle, Target } from 'lucide-react';

const financialData = [
  {
    category: 'Denim',
    revenue: 850000,
    cost: 510000,
    profit: 340000,
    margin: 40,
    discounts: 85000,
    returns: 42500
  },
  {
    category: 'Ethnic',
    revenue: 720000,
    cost: 432000,
    profit: 288000,
    margin: 40,
    discounts: 72000,
    returns: 36000
  },
  {
    category: 'Casual',
    revenue: 680000,
    cost: 476000,
    profit: 204000,
    margin: 30,
    discounts: 68000,
    returns: 34000
  },
  {
    category: 'Formal',
    revenue: 520000,
    cost: 364000,
    profit: 156000,
    margin: 30,
    discounts: 52000,
    returns: 26000
  },
  {
    category: 'Activewear',
    revenue: 450000,
    cost: 315000,
    profit: 135000,
    margin: 30,
    discounts: 45000,
    returns: 22500
  }
];

const lowMarginProducts = [
  { name: 'Basic Cotton Tees', category: 'Casual', margin: 12, volume: 450, action: 'Price Review' },
  { name: 'Polyester Blend Shirts', category: 'Formal', margin: 15, volume: 320, action: 'Supplier Negotiation' },
  { name: 'Fast Fashion Dresses', category: 'Casual', margin: 18, volume: 280, action: 'Quality Upgrade' },
  { name: 'Generic Activewear', category: 'Activewear', margin: 20, volume: 190, action: 'Brand Positioning' }
];

const monthlyTrends = [
  { month: 'Jan', revenue: 2800000, cost: 1960000, profit: 840000, margin: 30 },
  { month: 'Feb', revenue: 3200000, cost: 2240000, profit: 960000, margin: 30 },
  { month: 'Mar', revenue: 3600000, cost: 2520000, profit: 1080000, margin: 30 },
  { month: 'Apr', revenue: 3400000, cost: 2380000, profit: 1020000, margin: 30 },
  { month: 'May', revenue: 3800000, cost: 2660000, profit: 1140000, margin: 30 },
  { month: 'Jun', revenue: 4200000, cost: 2940000, profit: 1260000, margin: 30 }
];

export const FinanceCostDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'category' | 'trends'>('category');
  
  const totalRevenue = financialData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCost = financialData.reduce((sum, item) => sum + item.cost, 0);
  const totalProfit = totalRevenue - totalCost;
  const overallMargin = (totalProfit / totalRevenue) * 100;
  const totalDiscounts = financialData.reduce((sum, item) => sum + item.discounts, 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Financial Performance & Cost Analysis</h2>
              <p className="text-emerald-100 text-sm">Monitor margins, costs & profit optimization</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('category')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'category' 
                  ? 'bg-white text-emerald-600' 
                  : 'bg-emerald-500 text-white hover:bg-emerald-400'
              }`}
            >
              By Category
            </button>
            <button
              onClick={() => setViewMode('trends')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'trends' 
                  ? 'bg-white text-emerald-600' 
                  : 'bg-emerald-500 text-white hover:bg-emerald-400'
              }`}
            >
              Trends
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
          >
            <div className="text-2xl font-bold text-blue-700">₹{(totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-blue-600">Total Revenue</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200"
          >
            <div className="text-2xl font-bold text-emerald-700">₹{(totalProfit / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-emerald-600">Total Profit</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
          >
            <div className="text-2xl font-bold text-purple-700">{overallMargin.toFixed(1)}%</div>
            <div className="text-sm text-purple-600">Overall Margin</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200"
          >
            <div className="text-2xl font-bold text-amber-700">₹{(totalDiscounts / 1000).toFixed(0)}K</div>
            <div className="text-sm text-amber-600">Total Discounts</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            {viewMode === 'category' ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Cost vs Profit by Category</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="category" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value: number, name: string) => [
                        `₹${(value / 1000).toFixed(0)}K`,
                        name === 'revenue' ? 'Revenue' : name === 'cost' ? 'Cost' : 'Profit'
                      ]}
                    />
                    <Bar dataKey="revenue" fill="#3B82F6" name="revenue" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="cost" fill="#EF4444" name="cost" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="profit" fill="#10B981" name="profit" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Financial Trends</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'margin' ? `${value}%` : `₹${(value / 1000000).toFixed(1)}M`,
                        name === 'revenue' ? 'Revenue' : name === 'cost' ? 'Cost' : name === 'profit' ? 'Profit' : 'Margin'
                      ]}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
                    <Line type="monotone" dataKey="cost" stroke="#EF4444" strokeWidth={3} />
                    <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Low Margin Products Table */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Margin Products</h3>
            <div className="space-y-3">
              {lowMarginProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-red-900 text-sm">{product.name}</h4>
                      <p className="text-xs text-red-700">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-700">{product.margin}%</div>
                      <div className="text-xs text-red-600">margin</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-red-600">{product.volume} units sold</span>
                    <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-medium">
                      {product.action}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Category Margin Comparison */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Margin by Category</h4>
              <div className="space-y-2">
                {financialData.map((item, index) => (
                  <div key={item.category} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.margin >= 35 ? 'bg-green-500' : item.margin >= 25 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${(item.margin / 50) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.margin}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <h4 className="font-semibold text-red-900">Cost Optimization</h4>
            </div>
            <p className="text-sm text-red-800">
              4 product lines below 25% margin need immediate cost review
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-amber-900">Discount Control</h4>
            </div>
            <p className="text-sm text-amber-800">
              ₹{(totalDiscounts / 1000).toFixed(0)}K in discounts - optimize promotional strategy
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <h4 className="font-semibold text-emerald-900">Target Achievement</h4>
            </div>
            <p className="text-sm text-emerald-800">
              {overallMargin.toFixed(1)}% margin achieved - target 35% for optimal profitability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};