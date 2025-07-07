export interface TrendData {
  id: string;
  name: string;
  category: string;
  generation: string[];
  growth: number;
  confidence: number;
  description: string;
  matchedProducts: number;
  forecastedImpact: number;
  tags: string[];
}

export interface ProductData {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  stock: number;
  sales: number;
  price: number;
  tags: string[];
  generation: string[];
}

export interface StoreKPI {
  metric: string;
  value: number;
  change: number;
  benchmark: number;
  status: 'good' | 'warning' | 'critical';
  unit: string;
}

export interface ConsultantResponse {
  query: string;
  intent: string;
  insights: string[];
  recommendations: string[];
  forecast: {
    metric: string;
    predicted: number;
    confidence: number;
    timeframe?: string;
    factors?: string[];
  };
  trends: TrendData[];
  actions: ActionPlan[];
}

export interface ActionPlan {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  effort: 'quick' | 'moderate' | 'complex';
  impact: number;
  timeline: string;
}

export interface GenerationProfile {
  name: string;
  ageRange: string;
  keyTraits: string[];
  preferredCategories: string[];
  shoppingBehavior: string[];
  trendsFollowed: string[];
}

export interface MarketIntelligence {
  competitorActivity: string;
  marketTrends: string[];
  economicFactors: string;
  seasonalPatterns: string;
  riskFactors: string[];
  opportunities: string[];
}

export interface PredictiveModel {
  confidence: number;
  factors: string[];
  riskAssessment: 'Low' | 'Medium' | 'High';
  timeframe: string;
  accuracy: number;
  dataQuality: number;
}