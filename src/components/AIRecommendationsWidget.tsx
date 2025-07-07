import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Bell, TrendingUp, AlertTriangle, Lightbulb, Zap, Target, ArrowRight, Sparkles, Clock, Users, DollarSign } from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'opportunity' | 'info';
  title: string;
  message: string;
  action?: string;
  impact?: string;
  timestamp: string;
  priority: number;
  category: 'inventory' | 'sales' | 'trends' | 'competition' | 'customer';
}

interface Recommendation {
  id: string;
  category: 'inventory' | 'pricing' | 'marketing' | 'operations' | 'strategy';
  title: string;
  description: string;
  confidence: number;
  impact: string;
  effort: 'low' | 'medium' | 'high';
  timeline: string;
  roi: number;
  urgency: 'low' | 'medium' | 'high';
}

const raymondAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Wedding Season Stock Alert',
    message: 'Premium sherwanis showing 280% demand spike - only 5 days of stock remaining for peak wedding season',
    action: 'Emergency reorder',
    impact: 'Potential ₹8.5L lost sales',
    timestamp: '3 mins ago',
    priority: 10,
    category: 'inventory'
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Corporate Formal Trend',
    message: 'Pune IT sector expansion driving 45% increase in business suit demand - perfect inventory alignment detected',
    action: 'Launch B2B campaign',
    impact: '+35% revenue potential',
    timestamp: '12 mins ago',
    priority: 9,
    category: 'trends'
  },
  {
    id: '3',
    type: 'warning',
    title: 'Allen Solly Price Competition',
    message: 'Allen Solly launched 25% off on formal shirts - affecting mid-tier segment market position',
    action: 'Review pricing strategy',
    impact: 'Market share risk',
    timestamp: '28 mins ago',
    priority: 7,
    category: 'competition'
  },
  {
    id: '4',
    type: 'info',
    title: 'Custom Tailoring Surge',
    message: 'Made-to-measure orders up 22% - premium positioning resonating with target customers',
    action: 'Expand capacity',
    impact: 'Brand strengthening',
    timestamp: '1 hour ago',
    priority: 6,
    category: 'customer'
  }
];

const raymondRecommendations: Recommendation[] = [
  {
    id: '1',
    category: 'strategy',
    title: 'Premium Wedding Package Launch',
    description: 'Create comprehensive wedding packages combining sherwanis, accessories, and styling services for groom market',
    confidence: 94,
    impact: '+42% wedding revenue',
    effort: 'medium',
    timeline: '3-4 weeks',
    roi: 380,
    urgency: 'high'
  },
  {
    id: '2',
    category: 'marketing',
    title: 'Corporate Partnership Program',
    description: 'Develop B2B relationships with Pune IT companies for bulk formal wear orders and executive wardrobes',
    confidence: 89,
    impact: '+28% corporate sales',
    effort: 'high',
    timeline: '6-8 weeks',
    roi: 320,
    urgency: 'high'
  },
  {
    id: '3',
    category: 'inventory',
    title: 'Premium Fabric Collection Expansion',
    description: 'Expand exclusive fabric range for custom tailoring to differentiate from competitors',
    confidence: 87,
    impact: '+22% margin improvement',
    effort: 'medium',
    timeline: '4-6 weeks',
    roi: 280,
    urgency: 'medium'
  },
  {
    id: '4',
    category: 'operations',
    title: 'Digital Fitting Experience',
    description: 'Implement virtual fitting technology for online consultations while maintaining in-store craftsmanship',
    confidence: 82,
    impact: '+18% digital engagement',
    effort: 'high',
    timeline: '8-10 weeks',
    roi: 240,
    urgency: 'medium'
  }
];

export const AIRecommendationsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'recommendations'>('alerts');
  const [newAlerts, setNewAlerts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setNewAlerts(prev => prev + 1);
    }, 60000); // Simulate new alerts every minute

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <Bell className="w-5 h-5 text-amber-600" />;
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'info': return <Lightbulb className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'from-red-50 to-pink-50 border-red-200';
      case 'warning': return 'from-amber-50 to-orange-50 border-amber-200';
      case 'opportunity': return 'from-green-50 to-emerald-50 border-green-200';
      case 'info': return 'from-blue-50 to-cyan-50 border-blue-200';
    }
  };

  const getCategoryIcon = (category: Recommendation['category']) => {
    switch (category) {
      case 'inventory': return <Target className="w-4 h-4" />;
      case 'pricing': return <DollarSign className="w-4 h-4" />;
      case 'marketing': return <Zap className="w-4 h-4" />;
      case 'operations': return <Brain className="w-4 h-4" />;
      case 'strategy': return <Sparkles className="w-4 h-4" />;
    }
  };

  const getEffortColor = (effort: Recommendation['effort']) => {
    switch (effort) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'high': return 'bg-red-100 text-red-700';
    }
  };

  const getUrgencyColor = (urgency: Recommendation['urgency']) => {
    switch (urgency) {
      case 'low': return 'bg-gray-100 text-gray-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'high': return 'bg-red-100 text-red-700';
    }
  };

  const filteredAlerts = selectedCategory === 'all' 
    ? raymondAlerts.sort((a, b) => b.priority - a.priority)
    : raymondAlerts.filter(alert => alert.category === selectedCategory).sort((a, b) => b.priority - a.priority);

  const filteredRecommendations = selectedCategory === 'all'
    ? raymondRecommendations.sort((a, b) => b.roi - a.roi)
    : raymondRecommendations.filter(rec => rec.category === selectedCategory).sort((a, b) => b.roi - a.roi);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.div 
              className="p-3 bg-white bg-opacity-20 rounded-xl"
              animate={{ 
                scale: newAlerts > 0 ? [1, 1.1, 1] : 1,
                rotate: newAlerts > 0 ? [0, 5, -5, 0] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-white font-bold text-xl">Raymond AI Intelligence</h2>
              <p className="text-indigo-100 text-sm">Premium menswear insights & strategic guidance</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-indigo-100 text-xs font-medium">LIVE</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
              activeTab === 'alerts' 
                ? 'bg-white text-indigo-600' 
                : 'bg-indigo-500 text-white hover:bg-indigo-400'
            }`}
          >
            Smart Alerts
            {newAlerts > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                {newAlerts}
              </motion.div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'recommendations' 
                ? 'bg-white text-indigo-600' 
                : 'bg-indigo-500 text-white hover:bg-indigo-400'
            }`}
          >
            AI Recommendations
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'inventory', 'sales', 'trends', 'competition', 'customer'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'alerts' ? (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Priority Alerts</h3>
                <button 
                  onClick={() => setNewAlerts(0)}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Mark all as read
                </button>
              </div>
              
              {filteredAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-5 rounded-xl border bg-gradient-to-r ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{alert.timestamp}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            alert.priority >= 9 ? 'bg-red-500' :
                            alert.priority >= 7 ? 'bg-amber-500' : 'bg-blue-500'
                          }`}></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {alert.impact && (
                            <span className="text-xs text-gray-600 font-medium">
                              Impact: {alert.impact}
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.category === 'inventory' ? 'bg-blue-100 text-blue-700' :
                            alert.category === 'trends' ? 'bg-purple-100 text-purple-700' :
                            alert.category === 'competition' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {alert.category}
                          </span>
                        </div>
                        {alert.action && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-lg text-sm font-medium text-gray-700 transition-all flex items-center gap-2"
                          >
                            {alert.action}
                            <ArrowRight className="w-3 h-3" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
              
              {filteredRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 rounded-xl mt-1">
                      {getCategoryIcon(rec.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(rec.urgency)}`}>
                            {rec.urgency} urgency
                          </span>
                          <span className="text-sm font-semibold text-indigo-600">
                            {rec.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{rec.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Expected Impact:</span>
                          <span className="text-sm font-semibold text-green-600">{rec.impact}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">ROI:</span>
                          <span className="text-sm font-semibold text-blue-600">{rec.roi}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Timeline:</span>
                          <span className="text-sm font-medium text-gray-700">{rec.timeline}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Effort:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(rec.effort)}`}>
                            {rec.effort}
                          </span>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Implement Strategy
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced AI Status */}
        <div className="mt-8 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Raymond AI Engine: Active</span>
            </div>
            <div className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">{filteredAlerts.length}</div>
              <div className="text-xs text-gray-600">Active Alerts</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">{filteredRecommendations.length}</div>
              <div className="text-xs text-gray-600">Recommendations</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">96%</div>
              <div className="text-xs text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};