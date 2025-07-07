import React from 'react';
import { Clock, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { ActionPlan } from '../types';

interface ActionPlanCardProps {
  actions: ActionPlan[];
}

export const ActionPlanCard: React.FC<ActionPlanCardProps> = ({ actions }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recommended Actions</h2>
          <p className="text-gray-600 text-sm">Strategic initiatives to boost performance</p>
        </div>
      </div>

      <div className="space-y-4">
        {actions.map((action) => (
          <div key={action.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(action.priority)}`}>
                    {action.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{action.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  {getEffortIcon(action.effort)}
                  <span className="text-sm capitalize">{action.effort}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{action.timeline}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">+{action.impact}%</div>
                <div className="text-xs text-gray-500">expected impact</div>
              </div>
            </div>

            <button className="w-full mt-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all">
              Implement Action
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};