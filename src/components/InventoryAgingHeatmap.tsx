import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, Clock, TrendingDown } from 'lucide-react';

const inventoryData = [
  {
    brand: 'Zara',
    '0-30': { count: 145, value: 217500 },
    '31-60': { count: 89, value: 133500 },
    '61+': { count: 34, value: 51000 }
  },
  {
    brand: 'H&M',
    '0-30': { count: 167, value: 167000 },
    '31-60': { count: 123, value: 123000 },
    '61+': { count: 67, value: 67000 }
  },
  {
    brand: 'Levi\'s',
    '0-30': { count: 98, value: 147000 },
    '31-60': { count: 45, value: 67500 },
    '61+': { count: 23, value: 34500 }
  },
  {
    brand: 'BIBA',
    '0-30': { count: 134, value: 201000 },
    '31-60': { count: 78, value: 117000 },
    '61+': { count: 45, value: 67500 }
  },
  {
    brand: 'Nike',
    '0-30': { count: 189, value: 283500 },
    '31-60': { count: 67, value: 100500 },
    '61+': { count: 28, value: 42000 }
  },
  {
    brand: 'Adidas',
    '0-30': { count: 156, value: 234000 },
    '31-60': { count: 89, value: 133500 },
    '61+': { count: 34, value: 51000 }
  }
];

const getHeatmapColor = (count: number, maxCount: number) => {
  const intensity = count / maxCount;
  if (intensity > 0.8) return 'bg-red-500';
  if (intensity > 0.6) return 'bg-red-400';
  if (intensity > 0.4) return 'bg-amber-400';
  if (intensity > 0.2) return 'bg-yellow-300';
  return 'bg-green-300';
};

const getTextColor = (count: number, maxCount: number) => {
  const intensity = count / maxCount;
  return intensity > 0.4 ? 'text-white' : 'text-gray-800';
};

export const InventoryAgingHeatmap: React.FC = () => {
  const [viewMode, setViewMode] = useState<'count' | 'value'>('count');
  
  const maxCount = Math.max(...inventoryData.flatMap(brand => 
    Object.values(brand).slice(1).map((item: any) => viewMode === 'count' ? item.count : item.value)
  ));

  const totalItems = inventoryData.reduce((sum, brand) => 
    sum + brand['0-30'].count + brand['31-60'].count + brand['61+'].count, 0
  );

  const agingItems = inventoryData.reduce((sum, brand) => 
    sum + brand['61+'].count, 0
  );

  const agingPercentage = (agingItems / totalItems) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Inventory Aging Analysis</h2>
              <p className="text-amber-100 text-sm">Track slow-moving stock by brand & age</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('count')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'count' 
                  ? 'bg-white text-amber-600' 
                  : 'bg-amber-500 text-white hover:bg-amber-400'
              }`}
            >
              Count
            </button>
            <button
              onClick={() => setViewMode('value')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'value' 
                  ? 'bg-white text-amber-600' 
                  : 'bg-amber-500 text-white hover:bg-amber-400'
              }`}
            >
              Value
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200"
          >
            <div className="text-2xl font-bold text-blue-700">{totalItems}</div>
            <div className="text-sm text-blue-600">Total Items</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
          >
            <div className="text-2xl font-bold text-green-700">
              {inventoryData.reduce((sum, brand) => sum + brand['0-30'].count, 0)}
            </div>
            <div className="text-sm text-green-600">Fresh Stock (0-30 days)</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200"
          >
            <div className="text-2xl font-bold text-amber-700">
              {inventoryData.reduce((sum, brand) => sum + brand['31-60'].count, 0)}
            </div>
            <div className="text-sm text-amber-600">Aging (31-60 days)</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200"
          >
            <div className="text-2xl font-bold text-red-700">{agingItems}</div>
            <div className="text-sm text-red-600">Dead Stock (61+ days)</div>
          </motion.div>
        </div>

        {/* Heatmap */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Inventory Aging Heatmap ({viewMode === 'count' ? 'Item Count' : 'Value'})
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Brand</th>
                  <th className="text-center p-3 font-semibold text-gray-700">0-30 Days</th>
                  <th className="text-center p-3 font-semibold text-gray-700">31-60 Days</th>
                  <th className="text-center p-3 font-semibold text-gray-700">61+ Days</th>
                  <th className="text-center p-3 font-semibold text-gray-700">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((brand, index) => {
                  const deadStockRatio = brand['61+'].count / (brand['0-30'].count + brand['31-60'].count + brand['61+'].count);
                  const riskLevel = deadStockRatio > 0.2 ? 'High' : deadStockRatio > 0.1 ? 'Medium' : 'Low';
                  const riskColor = deadStockRatio > 0.2 ? 'text-red-600' : deadStockRatio > 0.1 ? 'text-amber-600' : 'text-green-600';
                  
                  return (
                    <motion.tr
                      key={brand.brand}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-t border-gray-100"
                    >
                      <td className="p-3 font-medium text-gray-900">{brand.brand}</td>
                      {(['0-30', '31-60', '61+'] as const).map((period) => {
                        const data = brand[period];
                        const value = viewMode === 'count' ? data.count : data.value;
                        return (
                          <td key={period} className="p-1">
                            <div 
                              className={`p-3 rounded-lg text-center font-semibold ${getHeatmapColor(value, maxCount)} ${getTextColor(value, maxCount)}`}
                            >
                              <div>
                                {viewMode === 'count' ? data.count : `₹${data.value.toLocaleString()}`}
                              </div>
                              {viewMode === 'count' && (
                                <div className="text-xs opacity-75">
                                  ₹{data.value.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskColor} ${
                          riskLevel === 'High' ? 'bg-red-100' : 
                          riskLevel === 'Medium' ? 'bg-amber-100' : 'bg-green-100'
                        }`}>
                          {riskLevel}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h4 className="font-semibold text-red-900">Urgent Action</h4>
            </div>
            <p className="text-sm text-red-800">
              {agingItems} items (61+ days) need immediate markdown or clearance
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-amber-900">Watch List</h4>
            </div>
            <p className="text-sm text-amber-800">
              Monitor 31-60 day items for potential promotion opportunities
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Optimization</h4>
            </div>
            <p className="text-sm text-blue-800">
              {agingPercentage.toFixed(1)}% aging rate - target below 15% for optimal turnover
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};