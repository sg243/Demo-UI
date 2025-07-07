import React from 'react';
import { TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react';
import { StoreKPI } from '../types';
import { mockKPIs } from '../data/mockData';

export const KPIDashboard: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'critical': return <TrendingDown className="w-5 h-5 text-red-600" />;
      default: return <Target className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-amber-200 bg-amber-50';
      case 'critical': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Store Performance KPIs</h2>
          <p className="text-gray-600 text-sm">Real-time metrics vs benchmarks</p>
        </div>
      </div>

      <div className="grid gap-4">
        {mockKPIs.map((kpi, index) => (
          <div key={index} className={`border-2 rounded-xl p-4 ${getStatusColor(kpi.status)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(kpi.status)}
                <h3 className="font-semibold text-gray-900">{kpi.metric}</h3>
              </div>
              <span className={`text-sm font-medium ${getChangeColor(kpi.change)}`}>
                {kpi.change > 0 ? '+' : ''}{kpi.change}%
              </span>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {kpi.unit === '₹' ? kpi.unit : ''}{kpi.value.toLocaleString()}{kpi.unit !== '₹' ? kpi.unit : ''}
                </div>
                <div className="text-sm text-gray-600">
                  vs {kpi.unit === '₹' ? kpi.unit : ''}{kpi.benchmark.toLocaleString()}{kpi.unit !== '₹' ? kpi.unit : ''} benchmark
                </div>
              </div>
              
              <div className="h-12 w-24 bg-gray-200 rounded-lg flex items-end p-1">
                <div 
                  className={`w-full rounded ${kpi.status === 'good' ? 'bg-green-500' : kpi.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ height: `${Math.max(20, Math.min(100, (kpi.value / kpi.benchmark) * 100))}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-2">Performance Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-green-600">2</div>
            <div className="text-xs text-gray-600">Above Target</div>
          </div>
          <div>
            <div className="text-xl font-bold text-amber-600">2</div>
            <div className="text-xs text-gray-600">Needs Attention</div>
          </div>
          <div>
            <div className="text-xl font-bold text-red-600">0</div>
            <div className="text-xs text-gray-600">Critical</div>
          </div>
        </div>
      </div>
    </div>
  );
};