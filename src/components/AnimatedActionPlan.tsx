import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, TrendingUp, CheckCircle, ArrowRight, Target, Sparkles } from 'lucide-react';
import { ActionPlan } from '../types';

interface AnimatedActionPlanProps {
  actions: ActionPlan[];
}

export const AnimatedActionPlan: React.FC<AnimatedActionPlanProps> = ({ actions }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityGradient = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-amber-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getEffortIcon = (effort: string) => {
    switch (effort) {
      case 'quick': return <Zap className="w-4 h-4" />;
      case 'moderate': return <Clock className="w-4 h-4" />;
      case 'complex': return <TrendingUp className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Strategic Action Plan</h2>
            <p className="text-emerald-100 text-sm">AI-powered recommendations for immediate impact</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {actions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="group"
            >
              <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
                {/* Action Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        className={`p-2 bg-gradient-to-r ${getPriorityGradient(action.priority)} rounded-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Target className="w-4 h-4 text-white" />
                      </motion.div>
                      <h3 className="font-bold text-gray-900 text-lg">{action.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getPriorityColor(action.priority)}`}>
                        {action.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{action.description}</p>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      {getEffortIcon(action.effort)}
                      <span className="text-sm font-medium capitalize">{action.effort} Effort</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{action.timeline}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <motion.div 
                      className="text-3xl font-bold text-emerald-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      +{action.impact}%
                    </motion.div>
                    <div className="text-xs text-gray-500 font-medium">Expected Impact</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Implementation Progress</span>
                    <span className="text-sm text-gray-500">Ready to start</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "15%" }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Sparkles className="w-4 h-4" />
                    Launch Action
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: actions.length * 0.1 + 0.2 }}
          className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-gray-200"
        >
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Action Plan Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                {actions.reduce((sum, action) => sum + action.impact, 0) / actions.length}%
              </div>
              <div className="text-sm text-gray-600">Avg. Expected Impact</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {actions.filter(a => a.priority === 'high').length}
              </div>
              <div className="text-sm text-gray-600">High Priority Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {actions.filter(a => a.effort === 'quick').length}
              </div>
              <div className="text-sm text-gray-600">Quick Wins</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};