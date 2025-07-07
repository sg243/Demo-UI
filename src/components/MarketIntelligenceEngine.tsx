import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Brain, Target, Zap, Globe, TrendingUp, AlertTriangle, DollarSign, Users, Eye, Clock, ArrowRight, Lightbulb, Shield, Rocket, Activity } from 'lucide-react';

interface MarketStrategy {
  id: string;
  title: string;
  description: string;
  category: 'pricing' | 'inventory' | 'marketing' | 'expansion' | 'competitive';
  priority: 'critical' | 'high' | 'medium' | 'low';
  timeframe: string;
  investment: string;
  expectedROI: number;
  riskLevel: 'low' | 'medium' | 'high';
  implementation: string[];
  kpis: string[];
  marketConditions: string[];
}

interface CompetitiveIntel {
  competitor: string;
  marketShare: number;
  recentMoves: string[];
  strengths: string[];
  weaknesses: string[];
  threatLevel: number;
  opportunities: string[];
  pricePosition: 'premium' | 'mid' | 'budget';
  targetSegment: string;
}

interface MarketTrend {
  name: string;
  growth: number;
  confidence: number;
  timeframe: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionable: boolean;
  marketSize: string;
  keyDrivers: string[];
}

const marketStrategies: MarketStrategy[] = [
  {
    id: '1',
    title: 'Premium Wedding Package Domination',
    description: 'Capture 40% of Pune wedding market through comprehensive groom packages and exclusive designer collaborations',
    category: 'marketing',
    priority: 'critical',
    timeframe: '3-6 months',
    investment: '₹15-25L',
    expectedROI: 280,
    riskLevel: 'medium',
    implementation: [
      'Partner with top wedding planners in Pune',
      'Create exclusive designer sherwani collections',
      'Launch groom styling consultation services',
      'Develop wedding package pricing tiers',
      'Establish referral program with venues'
    ],
    kpis: ['Wedding segment revenue growth', 'Average order value increase', 'Customer acquisition cost', 'Market share in wedding segment'],
    marketConditions: ['Peak wedding season Oct-Feb', 'Rising wedding budgets', 'Premium positioning acceptance']
  },
  {
    id: '2',
    title: 'Corporate B2B Expansion Strategy',
    description: 'Penetrate Pune IT corridor with bulk corporate orders and executive wardrobe services',
    category: 'expansion',
    priority: 'high',
    timeframe: '2-4 months',
    investment: '₹8-12L',
    expectedROI: 320,
    riskLevel: 'low',
    implementation: [
      'Identify top 50 IT companies in Pune',
      'Develop corporate pricing packages',
      'Create executive wardrobe consultation',
      'Establish on-site measurement services',
      'Build corporate sales team'
    ],
    kpis: ['B2B revenue percentage', 'Corporate client acquisition', 'Bulk order frequency', 'Corporate customer lifetime value'],
    marketConditions: ['IT sector growth in Pune', 'Return to office trends', 'Professional dress code requirements']
  },
  {
    id: '3',
    title: 'Digital-First Customer Experience',
    description: 'Transform customer journey with AR fitting, virtual consultations, and personalized recommendations',
    category: 'marketing',
    priority: 'high',
    timeframe: '4-8 months',
    investment: '₹20-30L',
    expectedROI: 240,
    riskLevel: 'medium',
    implementation: [
      'Implement AR virtual fitting technology',
      'Develop mobile app with AI recommendations',
      'Create virtual consultation platform',
      'Build customer preference database',
      'Integrate omnichannel experience'
    ],
    kpis: ['Digital engagement rate', 'Online-to-store conversion', 'Customer satisfaction score', 'Digital revenue percentage'],
    marketConditions: ['Digital adoption acceleration', 'Contactless shopping preference', 'Tech-savvy customer base']
  },
  {
    id: '4',
    title: 'Competitive Pricing Intelligence',
    description: 'Dynamic pricing strategy based on real-time competitor analysis and market demand patterns',
    category: 'pricing',
    priority: 'critical',
    timeframe: '1-2 months',
    investment: '₹5-8L',
    expectedROI: 180,
    riskLevel: 'low',
    implementation: [
      'Deploy automated price monitoring system',
      'Develop dynamic pricing algorithms',
      'Create value proposition messaging',
      'Implement competitor response protocols',
      'Train sales team on value selling'
    ],
    kpis: ['Price competitiveness index', 'Margin preservation', 'Market share retention', 'Customer price sensitivity'],
    marketConditions: ['Intense price competition', 'Value-conscious customers', 'Margin pressure']
  }
];

const competitiveIntelligence: CompetitiveIntel[] = [
  {
    competitor: 'Manyavar',
    marketShare: 28,
    recentMoves: ['Expanding to 600+ stores', 'Celebrity endorsement campaigns', 'Premium fabric collections'],
    strengths: ['Wedding market dominance', 'Brand recognition', 'Pan-India presence'],
    weaknesses: ['Limited casual wear', 'Higher price points', 'Less customization'],
    threatLevel: 85,
    opportunities: ['Custom tailoring gap', 'Corporate segment', 'Regional preferences'],
    pricePosition: 'premium',
    targetSegment: 'Wedding & ceremonial wear'
  },
  {
    competitor: 'Allen Solly',
    marketShare: 22,
    recentMoves: ['30% discount campaigns', 'Casual-formal positioning', 'Digital expansion'],
    strengths: ['Casual-formal appeal', 'Price competitiveness', 'Youth connect'],
    weaknesses: ['Limited premium offerings', 'Mass market perception', 'Quality concerns'],
    threatLevel: 65,
    opportunities: ['Premium segment gap', 'Custom services', 'Heritage positioning'],
    pricePosition: 'mid',
    targetSegment: 'Young professionals'
  },
  {
    competitor: 'Cotton King',
    marketShare: 15,
    recentMoves: ['Store expansion in Maharashtra', 'Value pricing focus', 'Bulk order targeting'],
    strengths: ['Value pricing', 'Cotton specialization', 'Local presence'],
    weaknesses: ['Limited premium appeal', 'Basic designs', 'Quality perception'],
    threatLevel: 35,
    opportunities: ['Premium positioning', 'Design innovation', 'Service excellence'],
    pricePosition: 'budget',
    targetSegment: 'Price-conscious customers'
  }
];

const marketTrends: MarketTrend[] = [
  {
    name: 'Sustainable Premium Fashion',
    growth: 45,
    confidence: 89,
    timeframe: '6-12 months',
    impact: 'high',
    category: 'Sustainability',
    actionable: true,
    marketSize: '₹2,400 Cr',
    keyDrivers: ['Environmental consciousness', 'Premium positioning', 'Brand differentiation']
  },
  {
    name: 'Custom Tailoring Renaissance',
    growth: 67,
    confidence: 94,
    timeframe: '3-6 months',
    impact: 'high',
    category: 'Personalization',
    actionable: true,
    marketSize: '₹1,800 Cr',
    keyDrivers: ['Personalization demand', 'Premium experience', 'Fit perfection']
  },
  {
    name: 'Corporate Formal Revival',
    growth: 38,
    confidence: 87,
    timeframe: '2-4 months',
    impact: 'medium',
    category: 'Professional Wear',
    actionable: true,
    marketSize: '₹3,200 Cr',
    keyDrivers: ['Return to office', 'Professional image', 'Hybrid work culture']
  },
  {
    name: 'Digital-First Shopping',
    growth: 78,
    confidence: 92,
    timeframe: '1-3 months',
    impact: 'high',
    category: 'Digital Transformation',
    actionable: true,
    marketSize: '₹5,600 Cr',
    keyDrivers: ['Tech adoption', 'Convenience preference', 'Omnichannel experience']
  }
];

const strategicMetrics = [
  { metric: 'Market Position', raymond: 85, competitor: 65, target: 90 },
  { metric: 'Price Competitiveness', raymond: 72, competitor: 85, target: 80 },
  { metric: 'Product Innovation', raymond: 88, competitor: 70, target: 95 },
  { metric: 'Customer Experience', raymond: 91, competitor: 75, target: 95 },
  { metric: 'Digital Presence', raymond: 68, competitor: 82, target: 85 },
  { metric: 'Brand Strength', raymond: 94, competitor: 78, target: 96 }
];

export const MarketIntelligenceEngine: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<MarketStrategy | null>(marketStrategies[0]);
  const [activeView, setActiveView] = useState<'strategies' | 'competitive' | 'trends' | 'execution'>('strategies');
  const [timeHorizon, setTimeHorizon] = useState<'immediate' | 'short' | 'medium' | 'long'>('immediate');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredStrategies = marketStrategies.filter(strategy => {
    switch (timeHorizon) {
      case 'immediate': return strategy.timeframe.includes('1-2') || strategy.timeframe.includes('2-4');
      case 'short': return strategy.timeframe.includes('3-6') || strategy.timeframe.includes('2-4');
      case 'medium': return strategy.timeframe.includes('4-8') || strategy.timeframe.includes('6-12');
      case 'long': return strategy.timeframe.includes('8-') || strategy.timeframe.includes('12+');
      default: return true;
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">Market Intelligence & Strategy Engine</h2>
              <p className="text-slate-300 text-sm">AI-powered strategic insights and competitive intelligence for Raymond</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'strategies', label: 'Strategies', icon: Target },
              { key: 'competitive', label: 'Competitive', icon: Eye },
              { key: 'trends', label: 'Trends', icon: TrendingUp },
              { key: 'execution', label: 'Execution', icon: Rocket }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveView(key as any)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeView === key 
                    ? 'bg-white text-slate-800' 
                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeView === 'strategies' && (
            <motion.div
              key="strategies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Time Horizon Filter */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Time Horizon:</span>
                {[
                  { key: 'immediate', label: 'Immediate (1-2M)', color: 'red' },
                  { key: 'short', label: 'Short-term (3-6M)', color: 'amber' },
                  { key: 'medium', label: 'Medium-term (6-12M)', color: 'blue' },
                  { key: 'long', label: 'Long-term (12M+)', color: 'green' }
                ].map(({ key, label, color }) => (
                  <button
                    key={key}
                    onClick={() => setTimeHorizon(key as any)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      timeHorizon === key 
                        ? `bg-${color}-100 text-${color}-800 border border-${color}-300` 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Strategy List */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Initiatives</h3>
                  <div className="space-y-4">
                    {filteredStrategies.map((strategy, index) => (
                      <motion.div
                        key={strategy.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedStrategy?.id === strategy.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedStrategy(strategy)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{strategy.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(strategy.priority)}`}>
                                {strategy.priority.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{strategy.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-500">Investment</div>
                            <div className="font-semibold text-gray-900">{strategy.investment}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Expected ROI</div>
                            <div className="font-semibold text-green-600">+{strategy.expectedROI}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Timeframe</div>
                            <div className="font-semibold text-gray-900">{strategy.timeframe}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Risk Level</div>
                            <div className={`font-semibold ${getRiskColor(strategy.riskLevel)}`}>
                              {strategy.riskLevel.toUpperCase()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                              strategy.category === 'marketing' ? 'bg-purple-100 text-purple-700' :
                              strategy.category === 'expansion' ? 'bg-blue-100 text-blue-700' :
                              strategy.category === 'pricing' ? 'bg-green-100 text-green-700' :
                              strategy.category === 'inventory' ? 'bg-amber-100 text-amber-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {strategy.category}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Strategy Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategy Details</h3>
                  <AnimatePresence mode="wait">
                    {selectedStrategy ? (
                      <motion.div
                        key={selectedStrategy.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                          <h4 className="font-semibold text-blue-900 mb-3">Implementation Steps</h4>
                          <ul className="space-y-2">
                            {selectedStrategy.implementation.map((step, index) => (
                              <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-3">Key Performance Indicators</h4>
                          <ul className="space-y-2">
                            {selectedStrategy.kpis.map((kpi, index) => (
                              <li key={index} className="text-sm text-green-800 flex items-center gap-2">
                                <Target className="w-3 h-3 text-green-600" />
                                {kpi}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                          <h4 className="font-semibold text-amber-900 mb-3">Market Conditions</h4>
                          <ul className="space-y-2">
                            {selectedStrategy.marketConditions.map((condition, index) => (
                              <li key={index} className="text-sm text-amber-800 flex items-center gap-2">
                                <Activity className="w-3 h-3 text-amber-600" />
                                {condition}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                          Launch Strategy
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                      >
                        <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Select a strategy to view details</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'competitive' && (
            <motion.div
              key="competitive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900">Competitive Intelligence Dashboard</h3>
              
              {/* Strategic Position Radar */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Strategic Position Analysis</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={strategicMetrics}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" fontSize={12} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
                      <Radar name="Raymond" dataKey="raymond" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} strokeWidth={2} />
                      <Radar name="Competitors" dataKey="competitor" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} strokeWidth={2} />
                      <Radar name="Target" dataKey="target" stroke="#10B981" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Competitive Threats</h4>
                  {competitiveIntelligence.map((competitor, index) => (
                    <motion.div
                      key={competitor.competitor}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border-2 ${
                        competitor.threatLevel > 70 ? 'bg-red-50 border-red-200' :
                        competitor.threatLevel > 50 ? 'bg-amber-50 border-amber-200' :
                        'bg-green-50 border-green-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900">{competitor.competitor}</h5>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{competitor.marketShare}% share</span>
                          <div className={`w-3 h-3 rounded-full ${
                            competitor.threatLevel > 70 ? 'bg-red-500' :
                            competitor.threatLevel > 50 ? 'bg-amber-500' : 'bg-green-500'
                          }`}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="font-medium text-gray-700 mb-1">Recent Moves</div>
                          <ul className="space-y-1">
                            {competitor.recentMoves.slice(0, 2).map((move, i) => (
                              <li key={i} className="text-gray-600">• {move}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700 mb-1">Opportunities</div>
                          <ul className="space-y-1">
                            {competitor.opportunities.slice(0, 2).map((opp, i) => (
                              <li key={i} className="text-gray-600">• {opp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'trends' && (
            <motion.div
              key="trends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900">Market Trends & Opportunities</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {marketTrends.map((trend, index) => (
                  <motion.div
                    key={trend.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 ${
                      trend.impact === 'high' ? 'bg-green-50 border-green-200' :
                      trend.impact === 'medium' ? 'bg-blue-50 border-blue-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{trend.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trend.impact === 'high' ? 'bg-green-100 text-green-700' :
                          trend.impact === 'medium' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {trend.impact.toUpperCase()} IMPACT
                        </span>
                        {trend.actionable && (
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">Growth Rate</div>
                        <div className="text-2xl font-bold text-green-600">+{trend.growth}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Confidence</div>
                        <div className="text-2xl font-bold text-blue-600">{trend.confidence}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Market Size</div>
                        <div className="font-semibold text-gray-900">{trend.marketSize}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Timeframe</div>
                        <div className="font-semibold text-gray-900">{trend.timeframe}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Key Drivers</div>
                      <div className="flex flex-wrap gap-2">
                        {trend.keyDrivers.map((driver, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                            {driver}
                          </span>
                        ))}
                      </div>
                    </div>

                    {trend.actionable && (
                      <button className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                        Develop Strategy
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'execution' && (
            <motion.div
              key="execution"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900">Strategy Execution Dashboard</h3>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Implementation Timeline</h4>
                  <div className="space-y-4">
                    {marketStrategies.slice(0, 3).map((strategy, index) => (
                      <div key={strategy.id} className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${
                          index === 0 ? 'bg-green-500' :
                          index === 1 ? 'bg-amber-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{strategy.title}</div>
                          <div className="text-sm text-gray-600">{strategy.timeframe}</div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(strategy.priority)}`}>
                          {strategy.priority}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Resource Allocation</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Marketing Budget</span>
                      <span className="font-semibold">₹45L allocated</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Technology Investment</span>
                      <span className="font-semibold">₹30L allocated</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Team Expansion</span>
                      <span className="font-semibold">12 positions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Expected ROI</span>
                      <span className="font-semibold text-green-600">+280%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-4">Next Actions Required</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <div className="font-medium text-gray-900 mb-2">Immediate (This Week)</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Finalize wedding package pricing</li>
                      <li>• Contact top 10 IT companies</li>
                      <li>• Launch competitor monitoring</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="font-medium text-gray-900 mb-2">Short-term (This Month)</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Develop AR fitting prototype</li>
                      <li>• Create corporate sales team</li>
                      <li>• Design premium collections</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="font-medium text-gray-900 mb-2">Medium-term (Next Quarter)</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Launch digital platform</li>
                      <li>• Expand corporate partnerships</li>
                      <li>• Measure strategy impact</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};