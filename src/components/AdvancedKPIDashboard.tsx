import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { TrendingUp, TrendingDown, Target, AlertTriangle, DollarSign, Users, ShoppingCart, Eye } from 'lucide-react';
import { raymondKPIs } from '../data/raymondData';

const salesData = [
  { month: 'Jul', sales: 2650000, target: 2400000, conversion: 4.2 },
  { month: 'Aug', sales: 2890000, target: 2400000, conversion: 4.5 },
  { month: 'Sep', sales: 3120000, target: 2400000, conversion: 4.8 },
  { month: 'Oct', sales: 3450000, target: 2400000, conversion: 5.1 },
  { month: 'Nov', sales: 3780000, target: 2400000, conversion: 5.3 },
  { month: 'Dec', sales: 4200000, target: 2400000, conversion: 5.6 }
];

const categoryData = [
  { name: 'Formal Wear', value: 45, color: '#3B82F6' },
  { name: 'Ethnic Wear', value: 28, color: '#8B5CF6' },
  { name: 'Casual Wear', value: 18, color: '#10B981' },
  { name: 'Accessories', value: 6, color: '#F59E0B' },
  { name: 'Fabrics', value: 3, color: '#EF4444' }
];

const generationData = [
  { name: 'Millennials', value: 52, fill: '#8B5CF6' },
  { name: 'Gen X', value: 35, fill: '#3B82F6' },
  { name: 'Gen Z', value: 13, fill: '#6B7280' }
];

const hourlyTraffic = [
  { hour: '10AM', visitors: 8, sales: 2 },
  { hour: '11AM', visitors: 15, sales: 4 },
  { hour: '12PM', visitors: 25, sales: 8 },
  { hour: '1PM', visitors: 32, sales: 12 },
  { hour: '2PM', visitors: 28, sales: 10 },
  { hour: '3PM', visitors: 35, sales: 15 },
  { hour: '4PM', visitors: 42, sales: 18 },
  { hour: '5PM', visitors: 48, sales: 22 },
  { hour: '6PM', visitors: 55, sales: 28 },
  { hour: '7PM', visitors: 45, sales: 20 },
  { hour: '8PM', visitors: 38, sales: 16 },
  { hour: '9PM', visitors: 25, sales: 8 }
];

export const AdvancedKPIDashboard: React.FC = () => {
  const kpiCards = [
    {
      title: 'Monthly Revenue',
      value: `₹${(raymondKPIs[0].value / 100000).toFixed(1)}L`,
      change: `+${raymondKPIs[0].change}%`,
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      title: 'Avg Order Value',
      value: `₹${raymondKPIs[1].value.toLocaleString()}`,
      change: `+${raymondKPIs[1].change}%`,
      trend: 'up',
      icon: Target,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Conversion Rate',
      value: `${raymondKPIs[2].value}%`,
      change: `${raymondKPIs[2].change}%`,
      trend: 'down',
      icon: ShoppingCart,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Custom Orders',
      value: `${raymondKPIs[3].value}`,
      change: `+${raymondKPIs[3].change}%`,
      trend: 'up',
      icon: Users,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
    }
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${kpi.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  kpi.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
              <div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{kpi.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid xl:grid-cols-2 gap-8">
        {/* Sales Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Raymond Sales Performance</h3>
              <p className="text-gray-600 text-sm">Monthly revenue vs targets (Premium Menswear)</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-gray-600">Target</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }} 
                formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, 'Sales']}
              />
              <Area type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} fill="url(#salesGradient)" />
              <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Raymond Category Mix</h3>
            <p className="text-gray-600 text-sm">Revenue distribution by product category</p>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                <span className="text-sm text-gray-600">{category.name}</span>
                <span className="text-sm font-semibold text-gray-900 ml-auto">{category.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row Charts */}
      <div className="grid xl:grid-cols-3 gap-8">
        {/* Store Traffic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Store Traffic</h3>
            <p className="text-gray-600 text-sm">Hourly visitors & conversions</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hourlyTraffic}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
              <Bar dataKey="visitors" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Customer Demographics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Customer Demographics</h3>
            <p className="text-gray-600 text-sm">Sales by generation</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={generationData}>
              <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {generationData.map((gen, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: gen.fill }}></div>
                  <span className="text-sm text-gray-600">{gen.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{gen.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Key Metrics</h3>
            <p className="text-gray-600 text-sm">Raymond performance indicators</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Custom Tailoring</p>
                  <p className="text-xs text-gray-600">145 orders this month</p>
                </div>
              </div>
              <span className="text-green-600 font-semibold">+22.1%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Customer Satisfaction</p>
                  <p className="text-xs text-gray-600">4.6/5.0 rating</p>
                </div>
              </div>
              <span className="text-blue-600 font-semibold">+0.2</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Inventory Turnover</p>
                  <p className="text-xs text-gray-600">4.2x this quarter</p>
                </div>
              </div>
              <span className="text-amber-600 font-semibold">-5.8%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};