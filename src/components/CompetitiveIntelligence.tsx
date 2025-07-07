import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, AlertTriangle, Eye, DollarSign, Users, Package, Zap, MapPin, Calendar, Star, ShoppingBag } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  category: 'direct' | 'indirect' | 'emerging';
  marketShare: number;
  pricePosition: 'premium' | 'mid' | 'budget';
  strengths: string[];
  threats: string[];
  recentMoves: string[];
  color: string;
  focusSegment: string;
  keyDifferentiator: string;
  locations: number;
  avgPrice: number;
  customerRating: number;
}

interface MarketIntelligence {
  trendName: string;
  competitorAdoption: number;
  ourAdoption: number;
  opportunity: 'high' | 'medium' | 'low';
  timeToMarket: string;
  investmentRequired: string;
  marketSize: string;
  growthRate: number;
}

const competitors: Competitor[] = [
  {
    id: '1',
    name: 'Vedant Fashions (Manyavar)',
    category: 'direct',
    marketShare: 28,
    pricePosition: 'premium',
    focusSegment: 'Wedding/ceremonial ethnic wear',
    keyDifferentiator: 'Leading in wedding/occasion wear, strong pan-India presence',
    strengths: ['Wedding Market Dominance', 'Celebrity Endorsements', 'Pan-India Network'],
    threats: ['Wedding Segment Competition', 'Premium Ethnic Positioning', 'Brand Recognition'],
    recentMoves: ['Expanded to 600+ stores', 'Celebrity campaign with Ranveer Singh', 'Premium fabric collections'],
    color: 'from-red-500 to-pink-500',
    locations: 600,
    avgPrice: 15000,
    customerRating: 4.3
  },
  {
    id: '2',
    name: 'Aditya Birla Fashion (ABFRL)',
    category: 'direct',
    marketShare: 35,
    pricePosition: 'mid',
    focusSegment: 'Formal & casual menswear',
    keyDifferentiator: 'Large multi-brand portfolio (Louis Philippe, Allen Solly), strong formal/casual',
    strengths: ['Multi-brand Portfolio', 'Distribution Network', 'Price Range Coverage'],
    threats: ['Market Share Dominance', 'Brand Portfolio Strength', 'Retail Presence'],
    recentMoves: ['Digital transformation', 'Sustainable fashion lines', 'Omnichannel expansion'],
    color: 'from-blue-500 to-cyan-500',
    locations: 3000,
    avgPrice: 2500,
    customerRating: 4.1
  },
  {
    id: '3',
    name: 'Cotton King',
    category: 'indirect',
    marketShare: 12,
    pricePosition: 'budget',
    focusSegment: 'Affordable cotton casuals',
    keyDifferentiator: 'Value segment, strong in tier 2/3 cities, price competitive',
    strengths: ['Price Leadership', 'Cotton Specialization', 'Tier 2/3 Presence'],
    threats: ['Price Competition', 'Volume Market', 'Regional Expansion'],
    recentMoves: ['Store expansion in Maharashtra', 'Online marketplace entry', 'Bulk order focus'],
    color: 'from-emerald-500 to-teal-500',
    locations: 150,
    avgPrice: 800,
    customerRating: 3.8
  },
  {
    id: '4',
    name: 'Westside',
    category: 'indirect',
    marketShare: 15,
    pricePosition: 'mid',
    focusSegment: 'Lifestyle and casualwear',
    keyDifferentiator: 'Broader lifestyle appeal, strong store experience',
    strengths: ['Lifestyle Positioning', 'Store Experience', 'Product Range'],
    threats: ['Casual Market Share', 'Store Locations', 'Brand Appeal'],
    recentMoves: ['Premium collections launch', 'Store redesign', 'Digital integration'],
    color: 'from-purple-500 to-indigo-500',
    locations: 200,
    avgPrice: 1800,
    customerRating: 4.2
  },
  {
    id: '5',
    name: 'Indian Terrain',
    category: 'direct',
    marketShare: 8,
    pricePosition: 'mid',
    focusSegment: 'Indian heritage menswear',
    keyDifferentiator: 'Indian heritage positioning, formal wear focus',
    strengths: ['Heritage Brand', 'Formal Wear', 'Quality Focus'],
    threats: ['Similar Positioning', 'Traditional Market', 'Premium Segment'],
    recentMoves: ['Heritage campaigns', 'Wedding collections', 'Fabric innovation'],
    color: 'from-amber-500 to-orange-500',
    locations: 120,
    avgPrice: 3200,
    customerRating: 4.0
  },
  {
    id: '6',
    name: 'ColorPlus',
    category: 'indirect',
    marketShare: 6,
    pricePosition: 'mid',
    focusSegment: 'Formal shirts and trousers',
    keyDifferentiator: 'Formal wear specialization, corporate focus',
    strengths: ['Formal Specialization', 'Corporate Segment', 'Quality Fabrics'],
    threats: ['Formal Market Share', 'Corporate Clients', 'Product Quality'],
    recentMoves: ['Corporate partnerships', 'Fabric technology', 'Store modernization'],
    color: 'from-gray-500 to-slate-500',
    locations: 180,
    avgPrice: 1500,
    customerRating: 3.9
  }
];

const marketIntelligence: MarketIntelligence[] = [
  {
    trendName: 'Sustainable Fashion',
    competitorAdoption: 75,
    ourAdoption: 45,
    opportunity: 'high',
    timeToMarket: '3-6 months',
    investmentRequired: 'Medium',
    marketSize: '₹2,400 Cr',
    growthRate: 25
  },
  {
    trendName: 'Digital Fitting Technology',
    competitorAdoption: 40,
    ourAdoption: 0,
    opportunity: 'high',
    timeToMarket: '6-12 months',
    investmentRequired: 'High',
    marketSize: '₹800 Cr',
    growthRate: 45
  },
  {
    trendName: 'Wedding Package Services',
    competitorAdoption: 85,
    ourAdoption: 60,
    opportunity: 'medium',
    timeToMarket: '2-4 months',
    investmentRequired: 'Low',
    marketSize: '₹5,600 Cr',
    growthRate: 18
  },
  {
    trendName: 'Corporate Bulk Orders',
    competitorAdoption: 30,
    ourAdoption: 20,
    opportunity: 'high',
    timeToMarket: '1-3 months',
    investmentRequired: 'Low',
    marketSize: '₹1,200 Cr',
    growthRate: 35
  },
  {
    trendName: 'Premium Fabric Collections',
    competitorAdoption: 60,
    ourAdoption: 80,
    opportunity: 'medium',
    timeToMarket: '2-4 months',
    investmentRequired: 'Medium',
    marketSize: '₹3,200 Cr',
    growthRate: 22
  }
];

const threatAlerts = [
  {
    id: '1',
    type: 'pricing',
    competitor: 'Allen Solly',
    threat: 'Launched 30% off on formal shirts targeting corporate segment',
    impact: 'High',
    timeline: 'This week',
    recommendation: 'Counter with premium value proposition and custom tailoring benefits'
  },
  {
    id: '2',
    type: 'expansion',
    competitor: 'Manyavar',
    threat: 'Opening new store 1.5km from Raymond Shivajinagar',
    impact: 'Medium',
    timeline: 'Next month',
    recommendation: 'Strengthen wedding season marketing and exclusive collections'
  },
  {
    id: '3',
    type: 'digital',
    competitor: 'Westside',
    threat: 'Launching AR try-on feature for online shopping',
    impact: 'Medium',
    timeline: '2 months',
    recommendation: 'Accelerate digital transformation and virtual consultation services'
  }
];

export const CompetitiveIntelligence: React.FC = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(competitors[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'intelligence' | 'threats' | 'positioning'>('overview');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'direct': return 'bg-red-100 text-red-800';
      case 'indirect': return 'bg-amber-100 text-amber-800';
      case 'emerging': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getThreatColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Competitive Intelligence Engine</h2>
              <p className="text-slate-300 text-sm">Real-time competitor analysis & market positioning for Raymond</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'overview', label: 'Overview', icon: Eye },
              { key: 'intelligence', label: 'Intelligence', icon: TrendingUp },
              { key: 'threats', label: 'Threats', icon: AlertTriangle },
              { key: 'positioning', label: 'Positioning', icon: Target }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  activeTab === key 
                    ? 'bg-white text-slate-800' 
                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                }`}
              >
                <Icon className="w-3 h-3" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Competitor List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Key Competitors</h3>
            {competitors.map((competitor, index) => (
              <motion.div
                key={competitor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedCompetitor?.id === competitor.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCompetitor(competitor)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{competitor.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(competitor.category)}`}>
                    {competitor.category}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div>Market Share: <span className="font-semibold text-gray-900">{competitor.marketShare}%</span></div>
                  <div>Locations: <span className="font-semibold text-gray-900">{competitor.locations}</span></div>
                  <div>Avg Price: <span className="font-semibold text-gray-900">₹{competitor.avgPrice}</span></div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="font-semibold text-gray-900">{competitor.customerRating}</span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${competitor.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${competitor.marketShare * 2.5}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && selectedCompetitor && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Competitor Header */}
                  <div className={`p-6 bg-gradient-to-r ${selectedCompetitor.color} rounded-2xl text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">{selectedCompetitor.name}</h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{selectedCompetitor.marketShare}%</div>
                        <div className="text-sm opacity-90">Market Share</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm opacity-90">Focus Segment</div>
                        <div className="font-semibold">{selectedCompetitor.focusSegment}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-90">Price Position</div>
                        <div className="font-semibold capitalize">{selectedCompetitor.pricePosition}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-90">Locations</div>
                        <div className="font-semibold">{selectedCompetitor.locations} stores</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-90">Customer Rating</div>
                        <div className="font-semibold flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {selectedCompetitor.customerRating}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Differentiator */}
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Key Differentiator
                    </h4>
                    <p className="text-blue-800">{selectedCompetitor.keyDifferentiator}</p>
                  </div>

                  {/* Strengths & Threats */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Key Strengths
                      </h4>
                      <ul className="space-y-2">
                        {selectedCompetitor.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-green-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                      <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Threats to Raymond
                      </h4>
                      <ul className="space-y-2">
                        {selectedCompetitor.threats.map((threat, index) => (
                          <li key={index} className="text-sm text-red-800 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            {threat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Recent Strategic Moves */}
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Recent Strategic Moves
                    </h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      {selectedCompetitor.recentMoves.map((move, index) => (
                        <div key={index} className="p-3 bg-white rounded-lg border border-purple-200">
                          <p className="text-sm text-purple-800">{move}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'intelligence' && (
                <motion.div
                  key="intelligence"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Market Intelligence & Opportunities</h3>
                  
                  <div className="space-y-4">
                    {marketIntelligence.map((intel, index) => (
                      <motion.div
                        key={intel.trendName}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">{intel.trendName}</h4>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              intel.opportunity === 'high' ? 'bg-green-100 text-green-800' :
                              intel.opportunity === 'medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {intel.opportunity.toUpperCase()} OPPORTUNITY
                            </span>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Market Size</div>
                              <div className="font-bold text-gray-900">{intel.marketSize}</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-3">Adoption Comparison</h5>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Competitors</span>
                                  <span className="font-medium">{intel.competitorAdoption}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-red-500 h-2 rounded-full" 
                                    style={{ width: `${intel.competitorAdoption}%` }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Raymond Adoption</span>
                                  <span className="font-medium">{intel.ourAdoption}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${intel.ourAdoption}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Time to Market:</span>
                              <span className="font-medium">{intel.timeToMarket}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Investment Required:</span>
                              <span className="font-medium">{intel.investmentRequired}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Growth Rate:</span>
                              <span className="font-medium text-green-600">+{intel.growthRate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Gap:</span>
                              <span className={`font-bold ${getOpportunityColor(intel.opportunity)}`}>
                                {intel.competitorAdoption - intel.ourAdoption}% behind
                              </span>
                            </div>
                          </div>
                        </div>

                        <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                          Develop Strategy
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'threats' && (
                <motion.div
                  key="threats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Threat Analysis & Response</h3>
                  
                  <div className="space-y-4">
                    {threatAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl border-2 ${getThreatColor(alert.impact)}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-gray-900">{alert.competitor}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getThreatColor(alert.impact)}`}>
                                {alert.impact.toUpperCase()} IMPACT
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">{alert.threat}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {alert.timeline}
                              </div>
                              <div className="flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {alert.type}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white bg-opacity-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">Recommended Response:</h5>
                          <p className="text-gray-700 text-sm">{alert.recommendation}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-4">Strategic Counter-Measures</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <div className="font-medium text-blue-900 mb-2">Premium Positioning</div>
                        <div className="text-sm text-blue-700">Emphasize heritage, quality, and custom tailoring</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <div className="font-medium text-blue-900 mb-2">Service Excellence</div>
                        <div className="text-sm text-blue-700">Leverage personalized service and expertise</div>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <div className="font-medium text-blue-900 mb-2">Innovation Focus</div>
                        <div className="text-sm text-blue-700">Invest in digital capabilities and new technologies</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'positioning' && (
                <motion.div
                  key="positioning"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900">Market Positioning Analysis</h3>
                  
                  {/* Positioning Matrix */}
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-4">Price vs Quality Positioning</h4>
                    <div className="relative h-80 bg-white rounded-lg border border-gray-200 p-4">
                      {/* Axes */}
                      <div className="absolute bottom-4 left-4 right-4 h-px bg-gray-300"></div>
                      <div className="absolute bottom-4 left-4 top-4 w-px bg-gray-300"></div>
                      
                      {/* Labels */}
                      <div className="absolute bottom-1 right-4 text-xs text-gray-500">High Price</div>
                      <div className="absolute bottom-1 left-4 text-xs text-gray-500">Low Price</div>
                      <div className="absolute top-4 left-1 text-xs text-gray-500 transform -rotate-90 origin-left">High Quality</div>
                      <div className="absolute bottom-8 left-1 text-xs text-gray-500 transform -rotate-90 origin-left">Low Quality</div>
                      
                      {/* Competitors positioned */}
                      <div className="absolute top-8 right-8 w-3 h-3 bg-red-500 rounded-full" title="Raymond - Premium Quality, High Price"></div>
                      <div className="absolute top-12 right-16 w-3 h-3 bg-pink-500 rounded-full" title="Manyavar"></div>
                      <div className="absolute top-20 left-1/2 w-3 h-3 bg-blue-500 rounded-full" title="Allen Solly"></div>
                      <div className="absolute bottom-16 left-8 w-3 h-3 bg-green-500 rounded-full" title="Cotton King"></div>
                      <div className="absolute top-16 left-1/3 w-3 h-3 bg-purple-500 rounded-full" title="Westside"></div>
                      
                      {/* Raymond highlight */}
                      <div className="absolute top-6 right-6 px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                        Raymond
                      </div>
                    </div>
                  </div>

                  {/* Competitive Advantages */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Raymond's Competitive Advantages
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium text-green-900">Heritage & Brand Legacy</div>
                            <div className="text-sm text-green-700">100+ years of tailoring excellence</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium text-green-900">Custom Tailoring Expertise</div>
                            <div className="text-sm text-green-700">Made-to-measure capabilities</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium text-green-900">Premium Fabric Quality</div>
                            <div className="text-sm text-green-700">Superior materials and craftsmanship</div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
                      <h4 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium text-amber-900">Digital Presence</div>
                            <div className="text-sm text-amber-700">Enhance online experience and AR features</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium text-amber-900">Youth Appeal</div>
                            <div className="text-sm text-amber-700">Attract Gen Z with contemporary styles</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                          <div>
                            <div className="font-medium text-amber-900">Price Accessibility</div>
                            <div className="text-sm text-amber-700">Introduce mid-range product lines</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};