import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RotateCcw, AlertTriangle, TrendingDown, Package } from 'lucide-react';

const returnReasons = [
  { reason: 'Size Issue', count: 145, percentage: 45, color: '#EF4444' },
  { reason: 'Color Mismatch', count: 80, percentage: 25, color: '#F59E0B' },
  { reason: 'Material Quality', count: 48, percentage: 15, color: '#8B5CF6' },
  { reason: 'Damaged', count: 32, percentage: 10, color: '#6B7280' },
  { reason: 'Others', count: 16, percentage: 5, color: '#10B981' }
];

const brandReturnData = [
  { brand: 'Zara', returns: 89, sales: 1200, rate: 7.4, topReason: 'Size Issue' },
  { brand: 'H&M', returns: 76, sales: 980, rate: 7.8, topReason: 'Color Mismatch' },
  { brand: 'Levi\'s', returns: 34, sales: 650, rate: 5.2, topReason: 'Size Issue' },
  { brand: 'BIBA', returns: 45, sales: 780, rate: 5.8, topReason: 'Material Quality' },
  { brand: 'Nike', returns: 67, sales: 890, rate: 7.5, topReason: 'Size Issue' },
  { brand: 'Adidas', returns: 52, sales: 720, rate: 7.2, topReason: 'Size Issue' }
];

const trendReturnData = [
  { trend: 'Y2K Revival', returns: 78, sales: 890, rate: 8.8, issue: 'Sizing inconsistency' },
  { trend: 'Cottagecore', returns: 34, sales: 670, rate: 5.1, issue: 'Color expectations' },
  { trend: 'Tech-Wear', returns: 23, sales: 450, rate: 5.1, issue: 'Fit preferences' },
  { trend: 'Maximalist', returns: 45, sales: 560, rate: 8.0, issue: 'Pattern mismatch' },
  { trend: 'Sustainable', returns: 19, sales: 420, rate: 4.5, issue: 'Material feel' }
];

const monthlyReturns = [
  { month: 'Jan', returns: 234, sales: 5600, rate: 4.2 },
  { month: 'Feb', returns: 267, sales: 6200, rate: 4.3 },
  { month: 'Mar', returns: 298, sales: 6800, rate: 4.4 },
  { month: 'Apr', returns: 321, sales: 7200, rate: 4.5 },
  { month: 'May', returns: 289, sales: 6900, rate: 4.2 },
  { month: 'Jun', returns: 312, sales: 7400, rate: 4.2 }
];

export const ReturnAnalysisChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<'reasons' | 'brands' | 'trends'>('reasons');
  
  const totalReturns = returnReasons.reduce((sum, item) => sum + item.count, 0);
  const avgReturnRate = brandReturnData.reduce((sum, item) => sum + item.rate, 0) / brandReturnData.length;
  const highestReturnBrand = brandReturnData.sort((a, b) => b.rate - a.rate)[0];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Return Analysis & Insights</h2>
              <p className="text-red-100 text-sm">Understand return patterns by brand & trend</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'reasons', label: 'Reasons' },
              { key: 'brands', label: 'Brands' },
              { key: 'trends', label: 'Trends' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setViewMode(key as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  viewMode === key 
                    ? 'bg-white text-red-600' 
                    : 'bg-red-500 text-white hover:bg-red-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200"
          >
            <div className="text-2xl font-bold text-red-700">{totalReturns}</div>
            <div className="text-sm text-red-600">Total Returns</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200"
          >
            <div className="text-2xl font-bold text-amber-700">{avgReturnRate.toFixed(1)}%</div>
            <div className="text-sm text-amber-600">Avg Return Rate</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200"
          >
            <div className="text-2xl font-bold text-purple-700">{returnReasons[0].percentage}%</div>
            <div className="text-sm text-purple-600">Top Issue: {returnReasons[0].reason}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
          >
            <div className="text-2xl font-bold text-blue-700">{highestReturnBrand.rate}%</div>
            <div className="text-sm text-blue-600">Highest: {highestReturnBrand.brand}</div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            {viewMode === 'reasons' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Reasons Breakdown</h3>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={returnReasons}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {returnReasons.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number, name: string) => [`${value} returns`, 'Count']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {returnReasons.map((reason, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: reason.color }}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{reason.reason}</div>
                        <div className="text-xs text-gray-600">{reason.count} returns ({reason.percentage}%)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {viewMode === 'brands' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Rate by Brand</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={brandReturnData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="brand" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'rate' ? `${value}%` : value,
                        name === 'rate' ? 'Return Rate' : name === 'returns' ? 'Returns' : 'Sales'
                      ]}
                    />
                    <Bar dataKey="rate" fill="#EF4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {viewMode === 'trends' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Rate by Trend</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={trendReturnData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="trend" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'rate' ? `${value}%` : value,
                        name === 'rate' ? 'Return Rate' : name === 'returns' ? 'Returns' : 'Sales'
                      ]}
                    />
                    <Bar dataKey="rate" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Detailed Analysis */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {viewMode === 'reasons' ? 'Action Items' : 
               viewMode === 'brands' ? 'Brand Analysis' : 'Trend Issues'}
            </h3>
            
            {viewMode === 'reasons' && (
              <div className="space-y-3">
                {[
                  { issue: 'Size Issue (45%)', action: 'Improve size charts & fit guides', priority: 'High' },
                  { issue: 'Color Mismatch (25%)', action: 'Better product photography', priority: 'Medium' },
                  { issue: 'Material Quality (15%)', action: 'Supplier quality control', priority: 'High' },
                  { issue: 'Damaged Items (10%)', action: 'Packaging improvements', priority: 'Medium' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.issue}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{item.action}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === 'brands' && (
              <div className="space-y-3">
                {brandReturnData.map((brand, index) => (
                  <motion.div
                    key={brand.brand}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-xl border ${
                      brand.rate > 7 ? 'bg-red-50 border-red-200' : 
                      brand.rate > 6 ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{brand.brand}</h4>
                      <span className={`text-lg font-bold ${
                        brand.rate > 7 ? 'text-red-700' : 
                        brand.rate > 6 ? 'text-amber-700' : 'text-green-700'
                      }`}>
                        {brand.rate}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <div>Top issue: {brand.topReason}</div>
                      <div>{brand.returns} returns from {brand.sales} sales</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === 'trends' && (
              <div className="space-y-3">
                {trendReturnData.map((trend, index) => (
                  <motion.div
                    key={trend.trend}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-xl border ${
                      trend.rate > 7 ? 'bg-red-50 border-red-200' : 
                      trend.rate > 6 ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{trend.trend}</h4>
                      <span className={`text-lg font-bold ${
                        trend.rate > 7 ? 'text-red-700' : 
                        trend.rate > 6 ? 'text-amber-700' : 'text-green-700'
                      }`}>
                        {trend.rate}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <div>Issue: {trend.issue}</div>
                      <div>{trend.returns} returns from {trend.sales} sales</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Monthly Trend */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Monthly Return Trend</h4>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={monthlyReturns}>
                  <XAxis dataKey="month" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'rate' ? `${value}%` : value,
                      name === 'rate' ? 'Return Rate' : 'Returns'
                    ]}
                  />
                  <Bar dataKey="rate" fill="#EF4444" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h4 className="font-semibold text-red-900">Critical Issue</h4>
            </div>
            <p className="text-sm text-red-800">
              Size issues account for 45% of returns - urgent sizing standardization needed
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-amber-900">Brand Focus</h4>
            </div>
            <p className="text-sm text-amber-800">
              Zara & H&M show higher return rates - review quality & descriptions
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Trend Impact</h4>
            </div>
            <p className="text-sm text-blue-800">
              Y2K Revival trend shows 8.8% return rate - sizing inconsistency issue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};