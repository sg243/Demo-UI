import React from 'react';
import { TrendingUp, Target, Users, ArrowUp } from 'lucide-react';
import { TrendData } from '../types';
import { mockTrends } from '../data/mockData';

export const TrendMatchPanel: React.FC = () => {
  const topTrends = mockTrends.slice(0, 3);

  const getGenerationColor = (generation: string[]) => {
    if (generation.includes('Gen Z')) return 'bg-purple-100 text-purple-800';
    if (generation.includes('Millennials')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 20) return 'text-green-600';
    if (impact >= 15) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Trend Match Analysis</h2>
          <p className="text-gray-600 text-sm">Trends aligned with your inventory</p>
        </div>
      </div>

      <div className="space-y-4">
        {topTrends.map((trend) => (
          <div key={trend.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{trend.name}</h3>
                <p className="text-gray-600 text-sm">{trend.description}</p>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUp className="w-4 h-4" />
                <span className="font-semibold text-sm">{trend.growth}%</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{trend.matchedProducts} products</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{trend.confidence}% confidence</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {trend.generation.map((gen) => (
                  <span key={gen} className={`px-2 py-1 rounded-full text-xs font-medium ${getGenerationColor(trend.generation)}`}>
                    {gen}
                  </span>
                ))}
              </div>
              <div className="text-right">
                <div className={`text-sm font-semibold ${getImpactColor(trend.forecastedImpact)}`}>
                  +{trend.forecastedImpact}% impact
                </div>
                <div className="text-xs text-gray-500">forecasted</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {trend.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
        View All Trends
      </button>
    </div>
  );
};