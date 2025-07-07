import React from 'react';
import { Users, Star, TrendingUp, Heart } from 'lucide-react';
import { raymondGenerationProfiles } from '../data/raymondData';

export const GenerationAnalysis: React.FC = () => {
  const getGenerationIcon = (name: string) => {
    switch (name) {
      case 'Millennials (Primary)': return '💼';
      case 'Gen X (Secondary)': return '👔';
      case 'Gen Z (Emerging)': return '🌟';
      default: return '👥';
    }
  };

  const getGenerationGradient = (name: string) => {
    switch (name) {
      case 'Millennials (Primary)': return 'from-blue-500 to-cyan-500';
      case 'Gen X (Secondary)': return 'from-gray-600 to-slate-600';
      case 'Gen Z (Emerging)': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Raymond Customer Demographics</h2>
          <p className="text-gray-600 text-sm">Premium menswear customer behavior by generation</p>
        </div>
      </div>

      <div className="space-y-6">
        {raymondGenerationProfiles.map((profile, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 bg-gradient-to-r ${getGenerationGradient(profile.name)} rounded-xl`}>
                <span className="text-2xl">{getGenerationIcon(profile.name)}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                <p className="text-gray-600 text-sm">Age {profile.ageRange}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <h4 className="font-medium text-gray-900">Key Traits</h4>
                </div>
                <ul className="space-y-1">
                  {profile.keyTraits.map((trait, i) => (
                    <li key={i} className="text-sm text-gray-600">• {trait}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <h4 className="font-medium text-gray-900">Preferred Categories</h4>
                </div>
                <ul className="space-y-1">
                  {profile.preferredCategories.map((category, i) => (
                    <li key={i} className="text-sm text-gray-600">• {category}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <h4 className="font-medium text-gray-900">Shopping Behavior</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.shoppingBehavior.map((behavior, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {behavior}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <h4 className="font-medium text-gray-900">Trends Followed</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.trendsFollowed.map((trend, i) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {trend}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};