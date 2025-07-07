import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Upload, CheckCircle, AlertCircle, Clock, Zap, FileText, BarChart3, TrendingUp, Download, FolderOpen, Settings, Play, Pause, RefreshCw } from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: 'pos' | 'inventory' | 'social' | 'market' | 'weather' | 'competitor' | 'file';
  status: 'connected' | 'syncing' | 'error' | 'pending' | 'processing';
  lastSync: string;
  recordCount: number;
  quality: number;
  icon: React.ComponentType<any>;
  color: string;
  fileFormat?: string;
  autoSync?: boolean;
}

interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  duration?: number;
  details?: string;
}

const dataSources: DataSource[] = [
  {
    id: '1',
    name: 'Raymond POS System',
    type: 'pos',
    status: 'connected',
    lastSync: '2 mins ago',
    recordCount: 15420,
    quality: 98,
    icon: BarChart3,
    color: 'from-blue-500 to-cyan-500',
    autoSync: true
  },
  {
    id: '2',
    name: 'Inventory Management',
    type: 'inventory',
    status: 'syncing',
    lastSync: 'Syncing...',
    recordCount: 8934,
    quality: 95,
    icon: Database,
    color: 'from-emerald-500 to-teal-500',
    autoSync: true
  },
  {
    id: '3',
    name: 'Sales Data Upload',
    type: 'file',
    status: 'pending',
    lastSync: 'Never',
    recordCount: 0,
    quality: 0,
    icon: Upload,
    color: 'from-purple-500 to-pink-500',
    fileFormat: 'CSV, Excel, JSON',
    autoSync: false
  },
  {
    id: '4',
    name: 'Social Media Trends',
    type: 'social',
    status: 'connected',
    lastSync: '5 mins ago',
    recordCount: 45678,
    quality: 87,
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
    autoSync: true
  },
  {
    id: '5',
    name: 'Market Intelligence',
    type: 'market',
    status: 'error',
    lastSync: '2 hours ago',
    recordCount: 0,
    quality: 0,
    icon: FileText,
    color: 'from-red-500 to-pink-500',
    autoSync: true
  },
  {
    id: '6',
    name: 'Competitor Data',
    type: 'competitor',
    status: 'processing',
    lastSync: 'Processing...',
    recordCount: 2340,
    quality: 92,
    icon: Zap,
    color: 'from-gray-500 to-slate-500',
    autoSync: true
  }
];

const pipelineSteps: ProcessingStep[] = [
  { id: '1', name: 'File Upload & Validation', status: 'completed', progress: 100, duration: 2.3, details: 'CSV schema validated, 15,420 records detected' },
  { id: '2', name: 'Data Cleaning & Transformation', status: 'completed', progress: 100, duration: 4.7, details: 'Duplicates removed, missing values filled' },
  { id: '3', name: 'Schema Mapping', status: 'processing', progress: 75, details: 'Mapping product_id, sale_date, customer_info...' },
  { id: '4', name: 'AI Insight Generation', status: 'pending', progress: 0, details: 'Sentiment analysis, demand prediction, trend extraction' },
  { id: '5', name: 'Dashboard Integration', status: 'pending', progress: 0, details: 'KPI calculation, chart data preparation' }
];

export const DataIngestionPipeline: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [pipelineActive, setPipelineActive] = useState(true);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Update the file source status
          const fileSource = dataSources.find(s => s.type === 'file');
          if (fileSource) {
            fileSource.status = 'processing';
            fileSource.recordCount = Math.floor(Math.random() * 10000) + 5000;
            fileSource.quality = Math.floor(Math.random() * 20) + 80;
            fileSource.lastSync = 'Just now';
          }
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'syncing': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'processing': return <Clock className="w-4 h-4 text-amber-600 animate-pulse" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Upload className="w-4 h-4 text-gray-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-50 border-green-200';
      case 'syncing': return 'bg-blue-50 border-blue-200';
      case 'processing': return 'bg-amber-50 border-amber-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'pending': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing': return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Data Ingestion Pipeline</h2>
                <p className="text-slate-300 text-sm">File-to-Dashboard flow with AI processing</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPipelineActive(!pipelineActive)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pipelineActive 
                    ? 'bg-green-600 text-white' 
                    : 'bg-slate-600 text-slate-300'
                }`}
              >
                {pipelineActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {pipelineActive ? 'Active' : 'Paused'}
              </button>
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-600 rounded-full">
                <div className={`w-2 h-2 rounded-full animate-pulse ${pipelineActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <span className="text-slate-300 text-xs font-medium">
                  {pipelineActive ? 'PROCESSING' : 'IDLE'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Pipeline */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Pipeline Status</h3>
          <div className="space-y-4">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 ${
                  step.status === 'completed' ? 'bg-green-50 border-green-200' :
                  step.status === 'processing' ? 'bg-blue-50 border-blue-200' :
                  step.status === 'error' ? 'bg-red-50 border-red-200' :
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getStepStatusIcon(step.status)}
                    <h4 className="font-semibold text-gray-900">{step.name}</h4>
                  </div>
                  <div className="flex items-center gap-4">
                    {step.duration && (
                      <span className="text-sm text-gray-600">{step.duration}s</span>
                    )}
                    <span className="text-sm font-medium text-gray-900">{step.progress}%</span>
                  </div>
                </div>
                
                {step.details && (
                  <p className="text-sm text-gray-600 mb-3">{step.details}</p>
                )}
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      step.status === 'completed' ? 'bg-green-500' :
                      step.status === 'processing' ? 'bg-blue-500' :
                      step.status === 'error' ? 'bg-red-500' :
                      'bg-gray-400'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${step.progress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* File Upload Zone */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">File Upload Module</h3>
        
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <motion.div
            animate={{ scale: dragActive ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {dragActive ? 'Drop files here' : 'Drag & drop files or click to upload'}
            </h4>
            <p className="text-gray-600 mb-4">
              Supports CSV, Excel (.xlsx), JSON formats
            </p>
            
            <input
              type="file"
              multiple
              accept=".csv,.xlsx,.json"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all"
            >
              <FolderOpen className="w-4 h-4" />
              Choose Files
            </label>
          </motion.div>
        </div>

        {/* Upload Progress */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Uploading files...</span>
                <span className="text-sm text-blue-700">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auto-sync Options */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h5 className="font-medium text-gray-900 mb-2">Google Drive Sync</h5>
            <p className="text-sm text-gray-600 mb-3">Auto-sync from Google Drive folder</p>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-all">
              Connect Drive
            </button>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <h5 className="font-medium text-gray-900 mb-2">POS Integration</h5>
            <p className="text-sm text-gray-600 mb-3">Direct connection to POS system</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all">
              Configure POS
            </button>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <h5 className="font-medium text-gray-900 mb-2">Scheduled Import</h5>
            <p className="text-sm text-gray-600 mb-3">Set up automated data imports</p>
            <button className="w-full py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-all">
              Schedule Import
            </button>
          </div>
        </div>
      </div>

      {/* Data Sources Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataSources.map((source, index) => {
                const Icon = source.icon;
                return (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${getStatusColor(source.status)} ${
                      selectedSource?.id === source.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedSource(source)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gradient-to-r ${source.color} rounded-lg`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{source.name}</h4>
                          <p className="text-xs text-gray-600">{source.type.toUpperCase()}</p>
                        </div>
                      </div>
                      {getStatusIcon(source.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Records:</span>
                        <span className="font-medium">{source.recordCount.toLocaleString()}</span>
                      </div>
                      {source.quality > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Quality:</span>
                          <span className={`font-medium ${source.quality >= 95 ? 'text-green-600' : source.quality >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                            {source.quality}%
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Last Sync:</span>
                        <span className="font-medium">{source.lastSync}</span>
                      </div>
                      {source.fileFormat && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Formats:</span>
                          <span className="font-medium">{source.fileFormat}</span>
                        </div>
                      )}
                    </div>

                    {source.quality > 0 && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${source.quality >= 95 ? 'bg-green-500' : source.quality >= 80 ? 'bg-amber-500' : 'bg-red-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${source.quality}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-all">
                        Configure
                      </button>
                      {source.autoSync && (
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          Auto-sync
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Source Details */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Source Configuration</h3>
          
          <AnimatePresence mode="wait">
            {selectedSource ? (
              <motion.div
                key={selectedSource.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className={`p-4 bg-gradient-to-r ${selectedSource.color} rounded-xl text-white`}>
                  <div className="flex items-center gap-3 mb-2">
                    <selectedSource.icon className="w-6 h-6" />
                    <h4 className="font-bold text-lg">{selectedSource.name}</h4>
                  </div>
                  <p className="text-sm opacity-90">
                    {selectedSource.type === 'pos' && 'Real-time point of sale transaction data including sales, returns, and customer information.'}
                    {selectedSource.type === 'inventory' && 'Live inventory levels, stock movements, and product catalog data.'}
                    {selectedSource.type === 'file' && 'Manual file uploads for batch data processing and analysis.'}
                    {selectedSource.type === 'social' && 'Social media trends, sentiment analysis, and fashion trend indicators.'}
                    {selectedSource.type === 'market' && 'Market research data, competitor pricing, and industry benchmarks.'}
                    {selectedSource.type === 'competitor' && 'Competitor analysis including pricing, promotions, and product launches.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-1">Connection Status</div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedSource.status)}
                      <span className="text-sm text-gray-900 capitalize">{selectedSource.status}</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-1">Data Volume</div>
                    <div className="text-lg font-bold text-gray-900">{selectedSource.recordCount.toLocaleString()}</div>
                  </div>
                  
                  {selectedSource.quality > 0 && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-1">Data Quality Score</div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-gray-900">{selectedSource.quality}%</div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedSource.quality >= 95 ? 'bg-green-100 text-green-700' :
                          selectedSource.quality >= 80 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {selectedSource.quality >= 95 ? 'Excellent' : selectedSource.quality >= 80 ? 'Good' : 'Needs Attention'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <button className={`w-full py-3 bg-gradient-to-r ${selectedSource.color} text-white rounded-xl font-medium hover:shadow-lg transition-all`}>
                    <Settings className="w-4 h-4 inline mr-2" />
                    Configure Source
                  </button>
                  
                  {selectedSource.type === 'file' && (
                    <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all">
                      <Download className="w-4 h-4 inline mr-2" />
                      Download Template
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Select a data source to configure</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Performance & Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="text-2xl font-bold text-green-700">99.8%</div>
            <div className="text-sm text-green-600">Pipeline Uptime</div>
          </div>
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-700">2.3s</div>
            <div className="text-sm text-blue-600">Avg Processing Time</div>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-700">1.2M</div>
            <div className="text-sm text-purple-600">Records Processed Today</div>
          </div>
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-amber-700">94%</div>
            <div className="text-sm text-amber-600">Overall Data Quality</div>
          </div>
        </div>
      </div>
    </div>
  );
};