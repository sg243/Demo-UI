import React, { useState } from 'react';
import { Send, Bot, TrendingUp, Lightbulb } from 'lucide-react';
import { ConsultantService } from '../services/consultantService';
import { ConsultantResponse } from '../types';

interface PromptConsultantProps {
  onResponse?: (response: ConsultantResponse) => void;
}

export const PromptConsultant: React.FC<PromptConsultantProps> = ({ onResponse }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ConsultantResponse | null>(null);

  const consultant = ConsultantService.getInstance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const result = await consultant.processPrompt(query);
      setResponse(result);
      onResponse?.(result);
    } catch (error) {
      console.error('Error processing prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const examplePrompts = [
    "What's trending with Gen Z in western India?",
    "Should I stock more oversized t-shirts next month?",
    "Compare my store's Q1 denim sales to national average",
    "What global trend can boost my sales next week?"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">AI Business Consultant</h2>
            <p className="text-slate-300 text-sm">Ask about trends, sales, inventory, or strategy</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your business question..."
              className="w-full px-4 py-4 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>

        {!response && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Try asking:</h3>
            <div className="grid gap-2">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(prompt)}
                  className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Analyzing market data...</span>
          </div>
        )}

        {response && (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Market Insights</h3>
                  <ul className="space-y-1">
                    {response.insights.map((insight, index) => (
                      <li key={index} className="text-blue-800 text-sm">• {insight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Recommendations</h3>
                  <ul className="space-y-1">
                    {response.recommendations.map((rec, index) => (
                      <li key={index} className="text-amber-800 text-sm">• {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-semibold text-green-900 mb-2">Forecast</h3>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-green-700">
                  +{response.forecast.predicted}%
                </div>
                <div className="text-sm text-green-600">
                  {response.forecast.metric} • {response.forecast.confidence}% confidence
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};