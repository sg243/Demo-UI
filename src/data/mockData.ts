import { TrendData, ProductData, StoreKPI, GenerationProfile } from '../types';

export const mockTrends: TrendData[] = [
  {
    id: '1',
    name: 'Y2K Revival',
    category: 'Fashion',
    generation: ['Gen Z'],
    growth: 245,
    confidence: 89,
    description: 'Early 2000s aesthetic with metallic fabrics, low-rise jeans, and futuristic accessories gaining massive traction among Gen Z.',
    matchedProducts: 127,
    forecastedImpact: 18,
    tags: ['metallic', 'low-rise', 'retro', 'futuristic']
  },
  {
    id: '2',
    name: 'Cottagecore Aesthetic',
    category: 'Lifestyle Fashion',
    generation: ['Gen Z', 'Millennials'],
    growth: 156,
    confidence: 92,
    description: 'Nature-inspired fashion emphasizing soft fabrics, floral prints, and sustainable materials.',
    matchedProducts: 340,
    forecastedImpact: 14,
    tags: ['floral', 'sustainable', 'soft', 'natural']
  },
  {
    id: '3',
    name: 'Tech-Wear Fusion',
    category: 'Activewear',
    generation: ['Millennials', 'Gen X'],
    growth: 189,
    confidence: 76,
    description: 'Functional fashion blending performance fabrics with urban streetwear aesthetics.',
    matchedProducts: 89,
    forecastedImpact: 22,
    tags: ['performance', 'urban', 'functional', 'tech-fabric']
  },
  {
    id: '4',
    name: 'Maximalist Prints',
    category: 'Pattern Trends',
    generation: ['Gen Z'],
    growth: 134,
    confidence: 81,
    description: 'Bold, oversized patterns and clashing prints as a rebellion against minimalism.',
    matchedProducts: 203,
    forecastedImpact: 16,
    tags: ['bold', 'oversized', 'patterns', 'maximalist']
  }
];

export const mockProducts: ProductData[] = [
  {
    id: '1',
    name: 'Metallic Crop Top',
    category: 'Topwear',
    subcategory: 'Tank Tops',
    stock: 67,
    sales: 145,
    price: 1299,
    tags: ['metallic', 'cropped', 'party'],
    generation: ['Gen Z']
  },
  {
    id: '2',
    name: 'Floral Midi Dress',
    category: 'One-Piece',
    subcategory: 'Dresses',
    stock: 89,
    sales: 234,
    price: 2499,
    tags: ['floral', 'midi', 'cotton', 'sustainable'],
    generation: ['Gen Z', 'Millennials']
  },
  {
    id: '3',
    name: 'Tech Joggers',
    category: 'Bottomwear',
    subcategory: 'Joggers',
    stock: 156,
    sales: 189,
    price: 1899,
    tags: ['tech-fabric', 'performance', 'urban'],
    generation: ['Millennials', 'Gen X']
  }
];

export const mockKPIs: StoreKPI[] = [
  {
    metric: 'Weekly Sales',
    value: 45600,
    change: 12.5,
    benchmark: 42000,
    status: 'good',
    unit: '₹'
  },
  {
    metric: 'Conversion Rate',
    value: 3.2,
    change: -0.4,
    benchmark: 3.8,
    status: 'warning',
    unit: '%'
  },
  {
    metric: 'Inventory Turnover',
    value: 6.8,
    change: 8.2,
    benchmark: 7.2,
    status: 'good',
    unit: 'x'
  },
  {
    metric: 'Customer Satisfaction',
    value: 4.1,
    change: -0.2,
    benchmark: 4.3,
    status: 'warning',
    unit: '/5'
  }
];

export const generationProfiles: GenerationProfile[] = [
  {
    name: 'Gen Z',
    ageRange: '9-27',
    keyTraits: ['Digital Native', 'Values Authenticity', 'Sustainability Focused', 'Trend Creators'],
    preferredCategories: ['Streetwear', 'Athleisure', 'Vintage/Thrift', 'Accessories'],
    shoppingBehavior: ['Social Media Influenced', 'Mobile-First', 'Reviews Important', 'Quick Decisions'],
    trendsFollowed: ['Y2K Revival', 'Cottagecore', 'Dark Academia', 'Maximalist Prints']
  },
  {
    name: 'Millennials',
    ageRange: '28-43',
    keyTraits: ['Quality Conscious', 'Brand Loyal', 'Experience Seekers', 'Work-Life Balance'],
    preferredCategories: ['Business Casual', 'Athleisure', 'Premium Basics', 'Tech-Wear'],
    shoppingBehavior: ['Research Heavy', 'Value for Money', 'Omnichannel', 'Sustainability Aware'],
    trendsFollowed: ['Minimalist Chic', 'Tech-Wear Fusion', 'Sustainable Fashion', 'Comfort Luxury']
  },
  {
    name: 'Gen X',
    ageRange: '44-59',
    keyTraits: ['Practical', 'Quality Over Quantity', 'Brand Loyal', 'Professional'],
    preferredCategories: ['Classic Styles', 'Professional Wear', 'Comfortable Fits', 'Timeless Pieces'],
    shoppingBehavior: ['In-Store Preference', 'Brand Trust Important', 'Durability Focus', 'Less Trend-Driven'],
    trendsFollowed: ['Classic Revival', 'Comfort Fashion', 'Premium Basics', 'Functional Luxury']
  }
];