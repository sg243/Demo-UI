import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Layers, Zap, Database, Brain, BarChart3, Settings, ArrowRight } from 'lucide-react';

interface SystemLayer {
  id: string;
  name: string;
  description: string;
  components: string[];
  status: 'active' | 'development' | 'planned';
  dependencies: string[];
  icon: React.ComponentType<any>;
  color: string;
}

const systemLayers: SystemLayer[] = [
  {
    id: 'data-ingestion',
    name: 'Data Ingestion & Pipeline',
    description: 'Real-time data collection from multiple sources including POS, inventory, social media, and market intelligence',
    components: ['POS Integration', 'Inventory Sync', 'Social Media APIs', 'Weather Data', 'Competitor Intelligence'],
    status: 'active',
    dependencies: [],
    icon: Database,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'dashboard',
    name: 'Interactive Dashboard Layer',
    description: 'Visual analytics interface providing real-time insights and KPI monitoring for fashion retail operations',
    components: ['Sales Analytics', 'Inventory Management', 'Trend Analysis', 'Financial Metrics', 'Return Analysis'],
    status: 'active',
    dependencies: ['data-ingestion'],
    icon: BarChart3,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'query-engine',
    name: 'Prompt Window & Query Engine',
    description: 'Natural language processing interface for business intelligence queries and strategic recommendations',
    components: ['NLP Processing', 'Query Parser', 'Context Understanding', 'Response Generation', 'Conversation Memory'],
    status: 'active',
    dependencies: ['data-ingestion', 'dashboard'],
    icon: Brain,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'intelligence',
    name: 'Advanced Intelligence Systems',
    description: 'AI-powered predictive analytics, trend forecasting, and automated decision support systems',
    components: ['Trend Prediction', 'Demand Forecasting', 'Price Optimization', 'Inventory Planning', 'Customer Segmentation'],
    status: 'development',
    dependencies: ['data-ingestion', 'query-engine'],
    icon: Zap,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'competitive',
    name: 'Competitive Business Report Engine',
    description: 'Comprehensive competitor analysis, market positioning, and strategic intelligence reporting',
    components: ['Competitor Monitoring', 'Market Analysis', 'Price Tracking', 'Strategy Recommendations', 'Threat Assessment'],
    status: 'planned',
    dependencies: ['data-ingestion', 'intelligence'],
    icon: Network,
    color: 'from-red-500 to-pink-500'
  }
];

const dataFlow = [
  { from: 'data-ingestion', to: 'dashboard', label: 'Real-time Data' },
  { from: 'data-ingestion', to: 'query-engine', label: 'Processed Data' },
  { from: 'dashboard', to: 'query-engine', label: 'User Context' },
  { from: 'query-engine', to: 'intelligence', label: 'Query Patterns' },
  { from: 'data-ingestion', to: 'intelligence', label: 'Raw Analytics' },
  { from: 'intelligence', to: 'competitive', label: 'Market Insights' },
  { from: 'data-ingestion', to: 'competitive', label: 'External Data' }
];

export const SystemMapping: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<SystemLayer | null>(systemLayers[0]);
  const [viewMode, setViewMode] = useState<'architecture' | 'dataflow' | 'dependencies'>('architecture');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'development': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'planned': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'development': return '🟡';
      case 'planned': return '⚪';
      default: return '⚪';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">System Architecture Mapping</h2>
              <p className="text-slate-300 text-sm">ForesightFlow X Arealis - Technical System Overview</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'architecture', label: 'Architecture', icon: Layers },
              { key: 'dataflow', label: 'Data Flow', icon: ArrowRight },
              { key: 'dependencies', label: 'Dependencies', icon: Network }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setViewMode(key as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                  viewMode === key 
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
        <AnimatePresence mode="wait">
          {viewMode === 'architecture' && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* System Layers */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Layers</h3>
                <div className="space-y-4">
                  {systemLayers.map((layer, index) => {
                    const Icon = layer.icon;
                    return (
                      <motion.div
                        key={layer.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedLayer?.id === layer.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedLayer(layer)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 bg-gradient-to-r ${layer.color} rounded-xl`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{layer.name}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(layer.status)}`}>
                                {getStatusIcon(layer.status)} {layer.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{layer.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {layer.components.slice(0, 3).map((component) => (
                                <span key={component} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                                  {component}
                                </span>
                              ))}
                              {layer.components.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                                  +{layer.components.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Layer Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Layer Details</h3>
                <AnimatePresence mode="wait">
                  {selectedLayer ? (
                    <motion.div
                      key={selectedLayer.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className={`p-4 bg-gradient-to-r ${selectedLayer.color} rounded-xl text-white`}>
                        <div className="flex items-center gap-3 mb-2">
                          <selectedLayer.icon className="w-6 h-6" />
                          <h4 className="font-bold text-lg">{selectedLayer.name}</h4>
                        </div>
                        <p className="text-sm opacity-90">{selectedLayer.description}</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl">
                        <h5 className="font-semibold text-gray-900 mb-3">Components</h5>
                        <div className="space-y-2">
                          {selectedLayer.components.map((component, index) => (
                            <div key={component} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-700">{component}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedLayer.dependencies.length > 0 && (
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <h5 className="font-semibold text-amber-900 mb-3">Dependencies</h5>
                          <div className="space-y-2">
                            {selectedLayer.dependencies.map((dep) => {
                              const depLayer = systemLayers.find(l => l.id === dep);
                              return (
                                <div key={dep} className="flex items-center gap-2">
                                  <ArrowRight className="w-3 h-3 text-amber-600" />
                                  <span className="text-sm text-amber-800">{depLayer?.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <button className={`w-full py-3 bg-gradient-to-r ${selectedLayer.color} text-white rounded-xl font-medium hover:shadow-lg transition-all`}>
                        Configure Layer
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Select a layer to view details</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {viewMode === 'dataflow' && (
            <motion.div
              key="dataflow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">Data Flow Architecture</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {systemLayers.map((layer, index) => {
                  const Icon = layer.icon;
                  return (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className={`p-6 bg-gradient-to-r ${layer.color} rounded-2xl text-white`}>
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-8 h-8" />
                          <div>
                            <h4 className="font-bold">{layer.name}</h4>
                            <p className="text-xs opacity-75">{layer.status}</p>
                          </div>
                        </div>
                        <div className="text-xs opacity-90">
                          {layer.components.length} components
                        </div>
                      </div>
                      
                      {/* Data flow arrows */}
                      {dataFlow
                        .filter(flow => flow.from === layer.id)
                        .map((flow, flowIndex) => {
                          const targetIndex = systemLayers.findIndex(l => l.id === flow.to);
                          const sourceIndex = index;
                          
                          if (targetIndex > sourceIndex) {
                            return (
                              <motion.div
                                key={`${flow.from}-${flow.to}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 + flowIndex * 0.2 }}
                                className="absolute top-1/2 -right-3 z-10"
                              >
                                <div className="flex items-center">
                                  <div className="w-6 h-0.5 bg-gray-400"></div>
                                  <ArrowRight className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                                  {flow.label}
                                </div>
                              </motion.div>
                            );
                          }
                          return null;
                        })}
                    </motion.div>
                  );
                })}
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Data Flow Summary</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Input Sources</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• POS transaction data</li>
                      <li>• Inventory management systems</li>
                      <li>• Social media APIs</li>
                      <li>• Market intelligence feeds</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Output Deliverables</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Real-time analytics dashboards</li>
                      <li>• AI-powered recommendations</li>
                      <li>• Competitive intelligence reports</li>
                      <li>• Predictive insights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'dependencies' && (
            <motion.div
              key="dependencies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">System Dependencies & Integration</h3>
              
              <div className="space-y-4">
                {systemLayers.map((layer, index) => (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 border border-gray-200 rounded-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-gradient-to-r ${layer.color} rounded-xl`}>
                        <layer.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{layer.name}</h4>
                        
                        {layer.dependencies.length > 0 ? (
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-700 mb-2">Depends on:</h5>
                            <div className="flex flex-wrap gap-2">
                              {layer.dependencies.map((dep) => {
                                const depLayer = systemLayers.find(l => l.id === dep);
                                if (!depLayer) return null;
                                const DepIcon = depLayer.icon;
                                return (
                                  <div key={dep} className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    <DepIcon className="w-3 h-3" />
                                    {depLayer.name}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="mb-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              No dependencies - Foundation layer
                            </span>
                          </div>
                        )}

                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Required by:</h5>
                          <div className="flex flex-wrap gap-2">
                            {systemLayers
                              .filter(l => l.dependencies.includes(layer.id))
                              .map((dependentLayer) => {
                                const DependentIcon = dependentLayer.icon;
                                return (
                                  <div key={dependentLayer.id} className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                    <DependentIcon className="w-3 h-3" />
                                    {dependentLayer.name}
                                  </div>
                                );
                              })}
                            {systemLayers.filter(l => l.dependencies.includes(layer.id)).length === 0 && (
                              <span className="text-gray-500 text-sm">No dependent layers</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* System Status */}
        <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-4">System Status Overview</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-600">Active Layers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">1</div>
              <div className="text-sm text-gray-600">In Development</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">1</div>
              <div className="text-sm text-gray-600">Planned</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};