import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, TrendingUp, Lightbulb, Sparkles, Brain, Zap, Target, ArrowRight, Mic, MicOff, Upload, FileText, BarChart3, Users, MapPin, Clock, Star } from 'lucide-react';
import { ConsultantService } from '../services/consultantService';
import { ConsultantResponse } from '../types';

interface EnhancedPromptConsultantProps {
  onResponse?: (response: ConsultantResponse) => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    intent?: string;
    confidence?: number;
    processingTime?: number;
  };
}

interface LLMFunction {
  name: string;
  description: string;
  parameters: any;
  icon: React.ComponentType<any>;
  category: 'analysis' | 'prediction' | 'optimization' | 'research';
}

const llmFunctions: LLMFunction[] = [
  {
    name: 'analyze_sales_performance',
    description: 'Deep dive analysis of sales metrics, trends, and performance indicators',
    parameters: { timeframe: 'string', category: 'string', comparison: 'boolean' },
    icon: BarChart3,
    category: 'analysis'
  },
  {
    name: 'predict_demand_forecast',
    description: 'AI-powered demand forecasting for inventory planning and optimization',
    parameters: { product_category: 'string', forecast_period: 'number', seasonality: 'boolean' },
    icon: TrendingUp,
    category: 'prediction'
  },
  {
    name: 'optimize_inventory_mix',
    description: 'Recommend optimal inventory allocation based on trends and demand patterns',
    parameters: { budget: 'number', constraints: 'array', objectives: 'array' },
    icon: Target,
    category: 'optimization'
  },
  {
    name: 'research_market_trends',
    description: 'Comprehensive market research including competitor analysis and trend identification',
    parameters: { market_segment: 'string', geographic_scope: 'string', depth: 'string' },
    icon: Users,
    category: 'research'
  },
  {
    name: 'analyze_customer_sentiment',
    description: 'Sentiment analysis from reviews, social media, and customer feedback',
    parameters: { data_sources: 'array', sentiment_aspects: 'array', time_range: 'string' },
    icon: Star,
    category: 'analysis'
  },
  {
    name: 'hyperlocal_insights',
    description: 'Location-specific insights including local trends, demographics, and market dynamics',
    parameters: { location: 'string', radius: 'number', demographic_filters: 'object' },
    icon: MapPin,
    category: 'research'
  }
];

export const EnhancedPromptConsultant: React.FC<EnhancedPromptConsultantProps> = ({ onResponse }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ConsultantResponse | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState<LLMFunction | null>(null);
  const [showFunctions, setShowFunctions] = useState(false);
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const consultant = ConsultantService.getInstance();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    setProcessingSteps([]);

    try {
      // Simulate LLM processing steps
      const steps = [
        'Analyzing query intent and context...',
        'Accessing Raymond store data...',
        'Processing market intelligence...',
        'Generating hyperlocal insights...',
        'Applying AI reasoning...',
        'Formulating strategic recommendations...'
      ];

      for (let i = 0; i < steps.length; i++) {
        setProcessingSteps(prev => [...prev, steps[i]]);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      const startTime = Date.now();
      const result = await consultant.processPrompt(query);
      const processingTime = Date.now() - startTime;

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Based on my analysis of Raymond Shivajinagar data and market intelligence, here are the key insights:\n\n${result.insights.join('\n\n')}\n\nRecommendations:\n${result.recommendations.join('\n\n')}`,
        timestamp: new Date(),
        metadata: {
          intent: result.intent,
          confidence: result.forecast.confidence,
          processingTime
        }
      };

      setChatHistory(prev => [...prev, assistantMessage]);
      setResponse(result);
      onResponse?.(result);
      setQuery('');
    } catch (error) {
      console.error('Error processing prompt:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setProcessingSteps([]);
    }
  };

  const handleFunctionSelect = (func: LLMFunction) => {
    setSelectedFunction(func);
    setQuery(`Use ${func.name} to ${func.description.toLowerCase()}`);
    setShowFunctions(false);
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognition.start();
    }
  };

  const smartPrompts = [
    {
      text: "Analyze Raymond's wedding season performance vs competitors in Pune market",
      category: "Competitive Analysis",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      function: "research_market_trends"
    },
    {
      text: "Predict demand for premium formal wear in Shivajinagar area for next quarter",
      category: "Demand Forecasting",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      function: "predict_demand_forecast"
    },
    {
      text: "What's the local sentiment around Raymond's custom tailoring services?",
      category: "Sentiment Analysis",
      icon: Star,
      color: "from-emerald-500 to-teal-500",
      function: "analyze_customer_sentiment"
    },
    {
      text: "Optimize inventory mix for upcoming festive season based on hyperlocal trends",
      category: "Inventory Optimization",
      icon: Target,
      color: "from-amber-500 to-orange-500",
      function: "optimize_inventory_mix"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-fit max-h-[800px] flex flex-col">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-8 py-6">
        <div className="flex items-center gap-6">
          <motion.div 
            className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl"
            animate={{ 
              boxShadow: isLoading ? '0 0 20px rgba(59, 130, 246, 0.5)' : '0 0 0px rgba(59, 130, 246, 0)'
            }}
            transition={{ duration: 0.3 }}
          >
            <Bot className="w-8 h-8 text-white" />
          </motion.div>
          <div className="flex-1">
            <h2 className="text-white font-bold text-2xl">Raymond AI Assistant</h2>
            <p className="text-slate-300 text-lg">Advanced LLM with hyperlocal intelligence & market analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFunctions(!showFunctions)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-slate-300 text-sm transition-all"
            >
              <Brain className="w-4 h-4" />
              Functions
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-sm font-medium">GPT-4 Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* LLM Functions Panel */}
      <AnimatePresence>
        {showFunctions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 border-b border-gray-200 p-4"
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Available AI Functions</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {llmFunctions.map((func) => {
                const Icon = func.icon;
                return (
                  <motion.button
                    key={func.name}
                    onClick={() => handleFunctionSelect(func)}
                    className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-600 uppercase">{func.category}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{func.name}</div>
                    <div className="text-xs text-gray-600">{func.description}</div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
        {chatHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center py-8">
              <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Raymond AI Assistant Ready</h3>
              <p className="text-gray-500">Ask me anything about your store performance, market trends, or business strategy</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4" />
                Smart Prompts:
              </h3>
              <div className="grid gap-4">
                {smartPrompts.map((prompt, index) => {
                  const Icon = prompt.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setQuery(prompt.text)}
                      className="text-left p-6 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-2xl transition-all group"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className={`p-3 bg-gradient-to-r ${prompt.color} rounded-xl`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                            {prompt.category}
                          </span>
                          <div className="text-xs text-gray-400">Function: {prompt.function}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 font-medium text-lg group-hover:text-gray-900 transition-colors">
                        "{prompt.text}"
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="flex items-center gap-2 mt-2 text-xs opacity-75">
                    <Clock className="w-3 h-3" />
                    {message.timestamp.toLocaleTimeString()}
                    {message.metadata && (
                      <>
                        <span>•</span>
                        <span>{message.metadata.confidence}% confidence</span>
                        <span>•</span>
                        <span>{message.metadata.processingTime}ms</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Processing Steps */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-start"
            >
              <div className="max-w-[80%] p-4 bg-gray-100 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                  >
                    <Brain className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="font-medium text-gray-900">AI Processing...</span>
                </div>
                <div className="space-y-2">
                  {processingSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {step}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Input */}
      <div className="p-6 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          {selectedFunction && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <selectedFunction.icon className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">Using function: {selectedFunction.name}</span>
              <button
                type="button"
                onClick={() => setSelectedFunction(null)}
                className="ml-auto text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          )}
          
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about trends, sales, inventory, competitors, or strategy..."
              className="w-full px-6 py-4 pr-32 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-lg transition-all"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-3 flex items-center gap-2">
              <button
                type="button"
                onClick={startVoiceInput}
                className={`p-2 rounded-lg transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <motion.button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 transition-all">
              <Upload className="w-3 h-3" />
              Upload Data
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 transition-all">
              <FileText className="w-3 h-3" />
              Export Chat
            </button>
          </div>
          <div className="text-xs text-gray-500">
            Powered by GPT-4 • {chatHistory.length} messages
          </div>
        </div>
      </div>
    </div>
  );
};