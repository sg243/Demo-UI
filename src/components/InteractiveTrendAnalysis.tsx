import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';
import { TrendingUp, Zap, Target, Users, ArrowRight, Sparkles, Globe, Calendar, Brain, Eye, Filter, MapPin, Heart, MessageCircle, Star, ThumbsUp } from 'lucide-react';

const hyperlocalTrendData = [
  { week: 'W1', pune_it_formal: 120, mumbai_wedding: 85, delhi_casual: 95, bangalore_ethnic: 110, local_sentiment: 75 },
  { week: 'W2', pune_it_formal: 145, mumbai_wedding: 92, delhi_casual: 108, bangalore_ethnic: 125, local_sentiment: 82 },
  { week: 'W3', pune_it_formal: 180, mumbai_wedding: 105, delhi_casual: 125, bangalore_ethnic: 140, local_sentiment: 88 },
  { week: 'W4', pune_it_formal: 220, mumbai_wedding: 118, delhi_casual: 145, bangalore_ethnic: 160, local_sentiment: 92 },
  { week: 'W5', pune_it_formal: 245, mumbai_wedding: 135, delhi_casual: 165, bangalore_ethnic: 175, local_sentiment: 89 },
  { week: 'W6', pune_it_formal: 280, mumbai_wedding: 156, delhi_casual: 189, bangalore_ethnic: 195, local_sentiment: 94 }
];

const sentimentData = [
  { category: 'Custom Tailoring', positive: 94, neutral: 4, negative: 2, mentions: 1240 },
  { category: 'Wedding Collection', positive: 89, neutral: 8, negative: 3, mentions: 890 },
  { category: 'Formal Wear', positive: 87, neutral: 10, negative: 3, mentions: 2100 },
  { category: 'Store Experience', positive: 92, neutral: 6, negative: 2, mentions: 1560 },
  { category: 'Pricing', positive: 76, neutral: 18, negative: 6, mentions: 980 }
];

const hyperlocalInsights = [
  {
    location: 'Shivajinagar (2km radius)',
    insights: [
      'IT professionals prefer formal shirts during weekdays',
      'Wedding season driving 40% increase in ethnic wear',
      'Premium positioning resonating with local demographics'
    ],
    sentiment: 91,
    trendingTopics: ['Custom Tailoring', 'Wedding Suits', 'Premium Fabrics'],
    demographics: { millennials: 52, genX: 35, genZ: 13 },
    competitorActivity: 'Allen Solly opened nearby, Cotton King expanding'
  },
  {
    location: 'Pune IT Corridor',
    insights: [
      'Corporate bulk orders increasing 25% month-over-month',
      'Business casual trend emerging among tech workers',
      'Weekend shopping patterns favor smart casual wear'
    ],
    sentiment: 88,
    trendingTopics: ['Business Casual', 'Corporate Wear', 'Weekend Fashion'],
    demographics: { millennials: 68, genX: 25, genZ: 7 },
    competitorActivity: 'Westside targeting same demographic'
  },
  {
    location: 'Pune Wedding Circuit',
    insights: [
      'Groom fashion becoming more experimental',
      'Indo-western fusion gaining popularity',
      'Premium sherwanis commanding higher margins'
    ],
    sentiment: 95,
    trendingTopics: ['Groom Fashion', 'Indo-Western', 'Luxury Ethnic'],
    demographics: { millennials: 45, genX: 40, genZ: 15 },
    competitorActivity: 'Manyavar aggressive in wedding segment'
  }
];

const socialSentimentTrends = [
  { platform: 'Instagram', mentions: 2340, sentiment: 89, engagement: 4.2, trending_hashtags: ['#RaymondStyle', '#CustomTailoring', '#WeddingFashion'] },
  { platform: 'Facebook', mentions: 1890, sentiment: 87, engagement: 3.8, trending_hashtags: ['#PremiumMenswear', '#PuneFashion', '#RaymondQuality'] },
  { platform: 'Google Reviews', mentions: 890, sentiment: 92, engagement: 4.6, trending_hashtags: ['#BestTailoring', '#QualityFabrics', '#ExcellentService'] },
  { platform: 'Local Forums', mentions: 560, sentiment: 85, engagement: 3.9, trending_hashtags: ['#LocalBusiness', '#PuneStyle', '#MensFashion'] }
];

export const InteractiveTrendAnalysis: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [viewMode, setViewMode] = useState<'trends' | 'sentiment' | 'hyperlocal'>('hyperlocal');
  const [timeframe, setTimeframe] = useState<'6weeks' | '3months' | '6months'>('6weeks');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentLocation = hyperlocalInsights[selectedLocation];

  useEffect(() => {
    setIsAnalyzing(true);
    const timer = setTimeout(() => setIsAnalyzing(false), 1500);
    return () => clearTimeout(timer);
  }, [selectedLocation, viewMode]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">Hyperlocal Trend Intelligence</h2>
              <p className="text-slate-300 text-sm">Location-based insights & sentiment analysis for Raymond Shivajinagar</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'hyperlocal', label: 'Hyperlocal', icon: MapPin },
              { key: 'sentiment', label: 'Sentiment', icon: Heart },
              { key: 'trends', label: 'Trends', icon: TrendingUp }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setViewMode(key as any)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  viewMode === key 
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
          {viewMode === 'hyperlocal' && (
            <motion.div
              key="hyperlocal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Location Selector */}
              <div className="flex items-center gap-4 mb-6">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">Select Location:</span>
                <div className="flex gap-2">
                  {hyperlocalInsights.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedLocation(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedLocation === index 
                          ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {location.location}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Location Insights */}
                <div className="lg:col-span-2">
                  <motion.div
                    key={selectedLocation}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Location Header */}
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-purple-900">{currentLocation.location}</h3>
                        <div className="flex items-center gap-2 px-3 py-1 bg-purple-200 text-purple-800 rounded-full">
                          <Heart className="w-4 h-4" />
                          <span className="font-semibold">{currentLocation.sentiment}% Positive</span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-700">{currentLocation.demographics.millennials}%</div>
                          <div className="text-sm text-purple-600">Millennials</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-700">{currentLocation.demographics.genX}%</div>
                          <div className="text-sm text-purple-600">Gen X</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-700">{currentLocation.demographics.genZ}%</div>
                          <div className="text-sm text-purple-600">Gen Z</div>
                        </div>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        Hyperlocal Insights
                      </h4>
                      <div className="space-y-3">
                        {currentLocation.insights.map((insight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 p-3 bg-white rounded-lg"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-blue-800 text-sm">{insight}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Trending Topics */}
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                      <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Trending Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentLocation.trendingTopics.map((topic, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-2 bg-emerald-200 text-emerald-800 rounded-full text-sm font-medium"
                          >
                            #{topic}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Competitor Activity */}
                    <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
                      <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Competitive Intelligence
                      </h4>
                      <p className="text-amber-800 text-sm">{currentLocation.competitorActivity}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Hyperlocal Chart */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Local Trend Performance</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={hyperlocalTrendData}>
                      <defs>
                        <linearGradient id="localGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="pune_it_formal" 
                        stroke="#8B5CF6" 
                        strokeWidth={3} 
                        fill="url(#localGradient)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="local_sentiment" 
                        stroke="#10B981" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        fill="none" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'sentiment' && (
            <motion.div
              key="sentiment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900">Social Sentiment Analysis</h3>
              
              {/* Sentiment Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Category Sentiment Breakdown</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="category" stroke="#6b7280" fontSize={10} angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '12px'
                        }} 
                      />
                      <Bar dataKey="positive" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="neutral" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="negative" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Social Media Sentiment</h4>
                  {socialSentimentTrends.map((platform, index) => (
                    <motion.div
                      key={platform.platform}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{platform.platform}</h5>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="font-semibold text-gray-900">{platform.sentiment}%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>Mentions: {platform.mentions.toLocaleString()}</div>
                        <div>Engagement: {platform.engagement}/5</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {platform.trending_hashtags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Sentiment Insights */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    <h4 className="font-semibold text-green-900">Top Positive</h4>
                  </div>
                  <p className="text-sm text-green-800">Custom tailoring services receiving 94% positive sentiment</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Most Discussed</h4>
                  </div>
                  <p className="text-sm text-blue-800">Formal wear quality and fit generating highest engagement</p>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-amber-600" />
                    <h4 className="font-semibold text-amber-900">Opportunity</h4>
                  </div>
                  <p className="text-sm text-amber-800">Pricing perception can be improved through value communication</p>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'trends' && (
            <motion.div
              key="trends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900">Regional Trend Comparison</h3>
              
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={hyperlocalTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '12px'
                    }} 
                  />
                  <Line type="monotone" dataKey="pune_it_formal" stroke="#8B5CF6" strokeWidth={3} name="Pune IT Formal" />
                  <Line type="monotone" dataKey="mumbai_wedding" stroke="#10B981" strokeWidth={3} name="Mumbai Wedding" />
                  <Line type="monotone" dataKey="delhi_casual" stroke="#3B82F6" strokeWidth={3} name="Delhi Casual" />
                  <Line type="monotone" dataKey="bangalore_ethnic" stroke="#F59E0B" strokeWidth={3} name="Bangalore Ethnic" />
                </LineChart>
              </ResponsiveContainer>

              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { name: 'Pune IT Formal', growth: '+180%', color: 'purple' },
                  { name: 'Mumbai Wedding', growth: '+83%', color: 'green' },
                  { name: 'Delhi Casual', growth: '+99%', color: 'blue' },
                  { name: 'Bangalore Ethnic', growth: '+77%', color: 'amber' }
                ].map((trend, index) => (
                  <div key={index} className={`p-4 bg-${trend.color}-50 rounded-xl border border-${trend.color}-200`}>
                    <h4 className={`font-semibold text-${trend.color}-900 mb-2`}>{trend.name}</h4>
                    <div className={`text-2xl font-bold text-${trend.color}-700`}>{trend.growth}</div>
                    <div className={`text-sm text-${trend.color}-600`}>6-week growth</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};