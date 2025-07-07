import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Brain, BarChart3, Users, TrendingUp, Package, DollarSign, RotateCcw, Bell, Database, Network, Layers, Activity, Zap, Upload } from 'lucide-react';
import { EnhancedPromptConsultant } from './components/EnhancedPromptConsultant';
import { SalesTrendChart } from './components/SalesTrendChart';
import { CategoryPerformanceChart } from './components/CategoryPerformanceChart';
import { InventoryAgingHeatmap } from './components/InventoryAgingHeatmap';
import { FinanceCostDashboard } from './components/FinanceCostDashboard';
import { ReturnAnalysisChart } from './components/ReturnAnalysisChart';
import { AIRecommendationsWidget } from './components/AIRecommendationsWidget';
import { InteractiveTrendAnalysis } from './components/InteractiveTrendAnalysis';
import { AdvancedKPIDashboard } from './components/AdvancedKPIDashboard';
import { AnimatedActionPlan } from './components/AnimatedActionPlan';
import { GenerationAnalysis } from './components/GenerationAnalysis';
import { DataIngestionPipeline } from './components/DataIngestionPipeline';
import { CompetitiveIntelligence } from './components/CompetitiveIntelligence';
import { SystemMapping } from './components/SystemMapping';
import { RealTimeInsightsDashboard } from './components/RealTimeInsightsDashboard';
import { MarketIntelligenceEngine } from './components/MarketIntelligenceEngine';
import { DataPipelineTab } from './components/DataPipelineTab';
import { ConsultantResponse } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('realtime');
  const [consultantResponse, setConsultantResponse] = useState<ConsultantResponse | null>(null);

  const tabs = [
    { id: 'realtime', label: 'Live Intelligence', icon: Activity, gradient: 'from-green-500 to-emerald-500' },
    { id: 'strategy', label: 'Market Strategy', icon: Zap, gradient: 'from-purple-500 to-pink-500' },
    { id: 'data-pipeline-new', label: 'Data Pipeline', icon: Upload, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'overview', label: 'Sales Overview', icon: BarChart3, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'products', label: 'Product Analytics', icon: Package, gradient: 'from-purple-500 to-pink-500' },
    { id: 'inventory', label: 'Inventory Health', icon: Package, gradient: 'from-amber-500 to-orange-500' },
    { id: 'finance', label: 'Finance & Costs', icon: DollarSign, gradient: 'from-emerald-500 to-teal-500' },
    { id: 'returns', label: 'Returns Analysis', icon: RotateCcw, gradient: 'from-red-500 to-pink-500' },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain, gradient: 'from-indigo-500 to-purple-500' },
    { id: 'trends', label: 'Trend Analysis', icon: TrendingUp, gradient: 'from-green-500 to-emerald-500' },
    { id: 'demographics', label: 'Demographics', icon: Users, gradient: 'from-pink-500 to-rose-500' },
    { id: 'data-pipeline', label: 'Data Sources', icon: Database, gradient: 'from-slate-500 to-gray-500' },
    { id: 'competitive', label: 'Competitive Intel', icon: Network, gradient: 'from-red-600 to-pink-600' },
    { id: 'system-map', label: 'System Mapping', icon: Layers, gradient: 'from-purple-600 to-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-24">
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-lg">
                <Store className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Raymond Intelligence Suite
                </h1>
                <p className="text-gray-600 font-medium text-lg">Real-time Market Intelligence & Strategic Business Analytics</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">Raymond Shivajinagar</div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Premium Menswear Store • Live Market Intelligence
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">R</span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 overflow-x-auto">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-8 xl:px-12">
          <div className="flex space-x-2 min-w-max py-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-3 py-4 px-6 font-semibold text-sm transition-all whitespace-nowrap rounded-xl ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl shadow-lg`}
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Enhanced Main Content */}
      <main className="max-w-[1920px] mx-auto px-6 lg:px-8 xl:px-12 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'realtime' && (
            <div className="space-y-8">
              <RealTimeInsightsDashboard />
            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="space-y-8">
              <MarketIntelligenceEngine />
            </div>
          )}

          {activeTab === 'data-pipeline-new' && (
            <div className="space-y-8">
              <DataPipelineTab />
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-8">
              <SalesTrendChart />
              <div className="grid xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <AdvancedKPIDashboard />
                </div>
                <div>
                  <AIRecommendationsWidget />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-8">
              <CategoryPerformanceChart />
              <div className="grid xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <AdvancedKPIDashboard />
                </div>
                <div>
                  <AIRecommendationsWidget />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-8">
              <InventoryAgingHeatmap />
              <div className="grid xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <AdvancedKPIDashboard />
                </div>
                <div>
                  <AIRecommendationsWidget />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <div className="space-y-8">
              <FinanceCostDashboard />
              <div className="grid xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <AdvancedKPIDashboard />
                </div>
                <div>
                  <AIRecommendationsWidget />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-8">
              <ReturnAnalysisChart />
              <div className="grid xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <AdvancedKPIDashboard />
                </div>
                <div>
                  <AIRecommendationsWidget />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai-insights' && (
            <div className="grid xl:grid-cols-4 gap-8">
              <div className="xl:col-span-3">
                <EnhancedPromptConsultant onResponse={setConsultantResponse} />
              </div>
              <div className="space-y-6">
                <AIRecommendationsWidget />
                {consultantResponse && (
                  <AnimatedActionPlan actions={consultantResponse.actions} />
                )}
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-8">
              <InteractiveTrendAnalysis />
              <div className="grid xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <AdvancedKPIDashboard />
                </div>
                <div>
                  <AIRecommendationsWidget />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demographics' && (
            <div className="grid xl:grid-cols-4 gap-8">
              <div className="xl:col-span-3">
                <GenerationAnalysis />
              </div>
              <div className="space-y-6">
                <AdvancedKPIDashboard />
                <AIRecommendationsWidget />
              </div>
            </div>
          )}

          {activeTab === 'data-pipeline' && (
            <div className="space-y-8">
              <DataIngestionPipeline />
            </div>
          )}

          {activeTab === 'competitive' && (
            <div className="space-y-8">
              <CompetitiveIntelligence />
            </div>
          )}

          {activeTab === 'system-map' && (
            <div className="space-y-8">
              <SystemMapping />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default App;