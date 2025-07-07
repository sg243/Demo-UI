import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, AlertTriangle, Zap, Globe, Clock, DollarSign, Users, Target, Brain, Eye, Wifi, Activity, Bell, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface RealTimeMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdate: Date;
  unit: string;
  category: 'sales' | 'traffic' | 'inventory' | 'market';
  priority: 'high' | 'medium' | 'low';
}

interface MarketAlert {
  id: string;
  type: 'opportunity' | 'threat' | 'trend' | 'competitor';
  title: string;
  message: string;
  impact: 'high' | 'medium' | 'low';
  urgency: 'immediate' | 'today' | 'this_week';
  timestamp: Date;
  actionRequired: boolean;
  source: string;
}

interface CompetitorActivity {
  competitor: string;
  activity: string;
  impact: number;
  timestamp: Date;
  category: 'pricing' | 'promotion' | 'product' | 'expansion';
  threat_level: 'high' | 'medium' | 'low';
}

const realTimeMetrics: RealTimeMetric[] = [
  {
    id: '1',
    name: 'Live Sales',
    value: 47850,
    change: 12.3,
    trend: 'up',
    lastUpdate: new Date(),
    unit: '₹',
    category: 'sales',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Store Traffic',
    value: 89,
    change: -5.2,
    trend: 'down',
    lastUpdate: new Date(),
    unit: ' visitors',
    category: 'traffic',
    priority: 'medium'
  },
  {
    id: '3',
    name: 'Conversion Rate',
    value: 5.8,
    change: 0.3,
    trend: 'up',
    lastUpdate: new Date(),
    unit: '%',
    category: 'sales',
    priority: 'high'
  },
  {
    id: '4',
    name: 'Inventory Alerts',
    value: 7,
    change: 2,
    trend: 'up',
    lastUpdate: new Date(),
    unit: ' items',
    category: 'inventory',
    priority: 'high'
  },
  {
    id: '5',
    name: 'Market Sentiment',
    value: 87,
    change: 4.1,
    trend: 'up',
    lastUpdate: new Date(),
    unit: '%',
    category: 'market',
    priority: 'medium'
  },
  {
    id: '6',
    name: 'Competitor Price Changes',
    value: 3,
    change: 1,
    trend: 'up',
    lastUpdate: new Date(),
    unit: ' changes',
    category: 'market',
    priority: 'high'
  }
];

const marketAlerts: MarketAlert[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Wedding Season Surge Detected',
    message: 'Sherwani demand spiked 280% in last 2 hours. Only 5 days inventory remaining.',
    impact: 'high',
    urgency: 'immediate',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    actionRequired: true,
    source: 'Inventory AI'
  },
  {
    id: '2',
    type: 'threat',
    title: 'Competitor Price Drop Alert',
    message: 'Allen Solly launched 30% off on formal shirts - affecting our mid-tier segment.',
    impact: 'medium',
    urgency: 'today',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    actionRequired: true,
    source: 'Price Monitor'
  },
  {
    id: '3',
    type: 'trend',
    title: 'Social Media Trend Spike',
    message: '#CustomTailoring trending with 45K mentions - opportunity for brand positioning.',
    impact: 'medium',
    urgency: 'this_week',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    actionRequired: false,
    source: 'Social Intelligence'
  },
  {
    id: '4',
    type: 'competitor',
    title: 'Manyavar Store Opening',
    message: 'New Manyavar store opening 1.5km away next month - market share risk.',
    impact: 'high',
    urgency: 'this_week',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    actionRequired: true,
    source: 'Market Intelligence'
  }
];

const competitorActivities: CompetitorActivity[] = [
  {
    competitor: 'Allen Solly',
    activity: '30% discount on formal shirts',
    impact: -8.5,
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    category: 'pricing',
    threat_level: 'high'
  },
  {
    competitor: 'Manyavar',
    activity: 'New wedding collection launch',
    impact: -5.2,
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    category: 'product',
    threat_level: 'medium'
  },
  {
    competitor: 'Cotton King',
    activity: 'Store expansion in Maharashtra',
    impact: -3.1,
    timestamp: new Date(Date.now() - 40 * 60 * 1000),
    category: 'expansion',
    threat_level: 'low'
  }
];

const liveTrafficData = [
  { time: '10:00', visitors: 12, sales: 2, conversion: 16.7 },
  { time: '10:30', visitors: 18, sales: 4, conversion: 22.2 },
  { time: '11:00', visitors: 25, sales: 7, conversion: 28.0 },
  { time: '11:30', visitors: 32, sales: 12, conversion: 37.5 },
  { time: '12:00', visitors: 28, sales: 9, conversion: 32.1 },
  { time: '12:30', visitors: 35, sales: 15, conversion: 42.9 },
  { time: '13:00', visitors: 42, sales: 18, conversion: 42.9 },
  { time: '13:30', visitors: 38, sales: 16, conversion: 42.1 }
];

export const RealTimeInsightsDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<RealTimeMetric | null>(null);
  const [alertFilter, setAlertFilter] = useState<'all' | 'high' | 'actionRequired'>('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'threat': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'trend': return <Zap className="w-5 h-5 text-blue-600" />;
      case 'competitor': return <Eye className="w-5 h-5 text-purple-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'bg-red-100 text-red-800 border-red-200';
      case 'today': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'this_week': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAlerts = marketAlerts.filter(alert => {
    if (alertFilter === 'high') return alert.impact === 'high';
    if (alertFilter === 'actionRequired') return alert.actionRequired;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Real-time Status Header */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: isLive ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-800 font-semibold text-sm">LIVE INTELLIGENCE</span>
            </motion.div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Wifi className="w-4 h-4" />
              <span className="text-sm">Real-time Data Feed Active</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Last Update</div>
              <div className="font-semibold text-gray-900">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isLive 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {isLive ? 'Live' : 'Paused'}
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {realTimeMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl shadow-lg border border-gray-100 p-4 cursor-pointer transition-all hover:shadow-xl ${
              selectedMetric?.id === metric.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedMetric(metric)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${
                metric.category === 'sales' ? 'bg-green-100' :
                metric.category === 'traffic' ? 'bg-blue-100' :
                metric.category === 'inventory' ? 'bg-amber-100' :
                'bg-purple-100'
              }`}>
                {metric.category === 'sales' && <DollarSign className="w-4 h-4 text-green-600" />}
                {metric.category === 'traffic' && <Users className="w-4 h-4 text-blue-600" />}
                {metric.category === 'inventory' && <Target className="w-4 h-4 text-amber-600" />}
                {metric.category === 'market' && <Globe className="w-4 h-4 text-purple-600" />}
              </div>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="mb-1">
              <div className="text-2xl font-bold text-gray-900">
                {metric.unit === '₹' ? metric.unit : ''}{metric.value.toLocaleString()}{metric.unit !== '₹' ? metric.unit : ''}
              </div>
              <div className="text-xs text-gray-600">{metric.name}</div>
            </div>
            <div className={`text-xs font-medium ${
              metric.change > 0 ? 'text-green-600' : 
              metric.change < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {metric.change > 0 ? '+' : ''}{metric.change}% vs last hour
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Live Traffic & Sales Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Live Store Performance</h3>
              <p className="text-gray-600 text-sm">Real-time visitor traffic and conversion tracking</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800 text-sm font-medium">Live Data</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={liveTrafficData}>
              <defs>
                <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }} 
              />
              <Area type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={2} fill="url(#visitorsGradient)" />
              <Area type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} fill="url(#salesGradient)" />
            </AreaChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">42</div>
              <div className="text-sm text-blue-600">Current Visitors</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">18</div>
              <div className="text-sm text-green-600">Sales This Hour</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">42.9%</div>
              <div className="text-sm text-purple-600">Live Conversion</div>
            </div>
          </div>
        </div>

        {/* Market Alerts Panel */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Market Intelligence Alerts</h3>
              <p className="text-gray-600 text-sm">Real-time market opportunities & threats</p>
            </div>
            <div className="flex gap-1">
              {['all', 'high', 'actionRequired'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAlertFilter(filter as any)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    alertFilter === filter 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter === 'actionRequired' ? 'Action' : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 ${
                  alert.impact === 'high' ? 'bg-red-50 border-red-200' :
                  alert.impact === 'medium' ? 'bg-amber-50 border-amber-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{alert.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(alert.urgency)}`}>
                        {alert.urgency.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>{alert.source}</span>
                        <span>•</span>
                        <span>{Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago</span>
                      </div>
                      {alert.actionRequired && (
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-all">
                          Take Action
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Activity Monitor */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Live Competitor Intelligence</h3>
            <p className="text-gray-600 text-sm">Real-time monitoring of competitor activities and market changes</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full">
            <Eye className="w-4 h-4 text-red-600" />
            <span className="text-red-800 text-sm font-medium">3 Active Threats</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {competitorActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 ${
                activity.threat_level === 'high' ? 'bg-red-50 border-red-200' :
                activity.threat_level === 'medium' ? 'bg-amber-50 border-amber-200' :
                'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{activity.competitor}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.threat_level === 'high' ? 'bg-red-100 text-red-700' :
                  activity.threat_level === 'medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {activity.threat_level} threat
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-3">{activity.activity}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">
                  {Math.floor((Date.now() - activity.timestamp.getTime()) / 60000)}m ago
                </div>
                <div className={`text-sm font-semibold ${
                  activity.impact < 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {activity.impact > 0 ? '+' : ''}{activity.impact}% impact
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Strategic Recommendations Engine */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">AI Strategic Recommendations</h3>
            <p className="text-gray-600 text-sm">Real-time strategic insights based on market intelligence</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Immediate Opportunities
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-green-800">• Increase sherwani inventory by 30% - wedding season surge detected</li>
              <li className="text-sm text-green-800">• Launch premium custom tailoring campaign - trending on social media</li>
              <li className="text-sm text-green-800">• Target corporate bulk orders - IT sector expansion in Pune</li>
            </ul>
          </div>

          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
            <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Immediate Threats
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-red-800">• Counter Allen Solly pricing with value proposition messaging</li>
              <li className="text-sm text-red-800">• Prepare for Manyavar competition with exclusive collections</li>
              <li className="text-sm text-red-800">• Address inventory shortage in high-demand categories</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};