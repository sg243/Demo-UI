import { TrendData, ProductData, StoreKPI, GenerationProfile } from '../types';

// Raymond Shivajinagar specific trends
export const raymondTrends: TrendData[] = [
  {
    id: '1',
    name: 'Wedding Season Premium',
    category: 'Ethnic & Formal',
    generation: ['Millennials', 'Gen X'],
    growth: 185,
    confidence: 94,
    description: 'Premium wedding wear including sherwanis, bandhgalas, and custom suits experiencing high demand during wedding season.',
    matchedProducts: 89,
    forecastedImpact: 28,
    tags: ['wedding', 'premium', 'ethnic', 'custom-tailoring', 'sherwani']
  },
  {
    id: '2',
    name: 'Corporate Professional',
    category: 'Formal Wear',
    generation: ['Millennials', 'Gen X'],
    growth: 145,
    confidence: 91,
    description: 'High-quality business suits and formal shirts for Pune\'s growing IT and corporate sector.',
    matchedProducts: 234,
    forecastedImpact: 22,
    tags: ['business-suits', 'formal-shirts', 'corporate', 'professional', 'made-to-measure']
  },
  {
    id: '3',
    name: 'Premium Casual',
    category: 'Smart Casual',
    generation: ['Millennials'],
    growth: 167,
    confidence: 87,
    description: 'Elevated casual wear blending comfort with sophistication for weekend and leisure occasions.',
    matchedProducts: 156,
    forecastedImpact: 18,
    tags: ['smart-casual', 'weekend-wear', 'premium-cotton', 'chinos', 'polo-shirts']
  },
  {
    id: '4',
    name: 'Festive Collection',
    category: 'Ethnic Wear',
    generation: ['Millennials', 'Gen X'],
    growth: 198,
    confidence: 89,
    description: 'Traditional and indo-western wear for festivals like Diwali, Navratri, and regional celebrations.',
    matchedProducts: 67,
    forecastedImpact: 25,
    tags: ['festive', 'indo-western', 'traditional', 'kurta', 'ethnic-jacket']
  }
];

// Raymond Shivajinagar product categories
export const raymondProducts: ProductData[] = [
  {
    id: '1',
    name: 'Premium Business Suit',
    category: 'Formal Wear',
    subcategory: 'Suits',
    stock: 45,
    sales: 89,
    price: 18999,
    tags: ['business', 'wool-blend', 'made-to-measure', 'premium'],
    generation: ['Millennials', 'Gen X']
  },
  {
    id: '2',
    name: 'Silk Sherwani',
    category: 'Ethnic Wear',
    subcategory: 'Wedding Wear',
    stock: 23,
    sales: 67,
    price: 24999,
    tags: ['wedding', 'silk', 'ethnic', 'premium', 'festive'],
    generation: ['Millennials', 'Gen X']
  },
  {
    id: '3',
    name: 'Cotton Formal Shirt',
    category: 'Formal Wear',
    subcategory: 'Shirts',
    stock: 156,
    sales: 234,
    price: 2499,
    tags: ['cotton', 'formal', 'office-wear', 'classic'],
    generation: ['Millennials', 'Gen X']
  },
  {
    id: '4',
    name: 'Premium Chinos',
    category: 'Casual Wear',
    subcategory: 'Trousers',
    stock: 89,
    sales: 145,
    price: 3999,
    tags: ['chinos', 'casual', 'weekend', 'cotton-blend'],
    generation: ['Millennials']
  },
  {
    id: '5',
    name: 'Bandhgala Jacket',
    category: 'Ethnic Wear',
    subcategory: 'Jackets',
    stock: 34,
    sales: 56,
    price: 12999,
    tags: ['bandhgala', 'ethnic', 'formal', 'indo-western'],
    generation: ['Millennials', 'Gen X']
  }
];

// Raymond Shivajinagar KPIs
export const raymondKPIs: StoreKPI[] = [
  {
    metric: 'Monthly Revenue',
    value: 2850000,
    change: 18.5,
    benchmark: 2400000,
    status: 'good',
    unit: '₹'
  },
  {
    metric: 'Average Order Value',
    value: 8750,
    change: 12.3,
    benchmark: 7800,
    status: 'good',
    unit: '₹'
  },
  {
    metric: 'Conversion Rate',
    value: 4.8,
    change: -0.3,
    benchmark: 5.2,
    status: 'warning',
    unit: '%'
  },
  {
    metric: 'Custom Tailoring Orders',
    value: 145,
    change: 22.1,
    benchmark: 120,
    status: 'good',
    unit: ' orders'
  },
  {
    metric: 'Customer Satisfaction',
    value: 4.6,
    change: 0.2,
    benchmark: 4.4,
    status: 'good',
    unit: '/5'
  },
  {
    metric: 'Inventory Turnover',
    value: 4.2,
    change: -5.8,
    benchmark: 4.8,
    status: 'warning',
    unit: 'x'
  }
];

// Raymond customer demographics
export const raymondGenerationProfiles: GenerationProfile[] = [
  {
    name: 'Millennials (Primary)',
    ageRange: '28-43',
    keyTraits: ['Career-Focused', 'Quality Conscious', 'Brand Loyal', 'Wedding Market'],
    preferredCategories: ['Business Suits', 'Wedding Wear', 'Smart Casual', 'Premium Shirts'],
    shoppingBehavior: ['Research Before Purchase', 'Values Craftsmanship', 'Prefers In-Store Experience', 'Custom Tailoring'],
    trendsFollowed: ['Corporate Professional', 'Wedding Season Premium', 'Premium Casual', 'Made-to-Measure']
  },
  {
    name: 'Gen X (Secondary)',
    ageRange: '44-59',
    keyTraits: ['Established Professionals', 'Premium Quality Focus', 'Traditional Values', 'Formal Preference'],
    preferredCategories: ['Formal Suits', 'Ethnic Wear', 'Classic Shirts', 'Accessories'],
    shoppingBehavior: ['Brand Loyalty', 'In-Store Shopping', 'Personal Service', 'Long-term Investment'],
    trendsFollowed: ['Classic Formal', 'Festive Collection', 'Traditional Ethnic', 'Premium Fabrics']
  },
  {
    name: 'Gen Z (Emerging)',
    ageRange: '18-27',
    keyTraits: ['Style Conscious', 'Digital Native', 'Occasion-Based Shopping', 'Value-Aware'],
    preferredCategories: ['Smart Casual', 'Festive Wear', 'Trendy Shirts', 'Accessories'],
    shoppingBehavior: ['Social Media Influenced', 'Omnichannel', 'Occasion-Driven', 'Price Sensitive'],
    trendsFollowed: ['Smart Casual', 'Indo-Western', 'Festive Fashion', 'Contemporary Styles']
  }
];

// Competitive landscape data
export const competitorData = [
  {
    name: 'Allen Solly',
    category: 'direct',
    marketShare: 22,
    pricePosition: 'mid-premium',
    strengths: ['Casual Formal', 'Brand Recognition', 'Wide Distribution'],
    threats: ['Price Competition', 'Casual Market Share', 'Youth Appeal'],
    recentMoves: ['Digital expansion', 'Casual wear focus', 'Celebrity endorsements']
  },
  {
    name: 'Cotton King',
    category: 'indirect',
    marketShare: 15,
    pricePosition: 'budget',
    strengths: ['Value Pricing', 'Cotton Specialization', 'Local Presence'],
    threats: ['Price Wars', 'Volume Competition', 'Basic Formal Wear'],
    recentMoves: ['Store expansion', 'Online presence', 'Bulk order focus']
  },
  {
    name: 'Westside',
    category: 'indirect',
    marketShare: 18,
    pricePosition: 'mid',
    strengths: ['Lifestyle Brand', 'Store Experience', 'Product Range'],
    threats: ['Casual Segment', 'Store Locations', 'Brand Positioning'],
    recentMoves: ['Premium collections', 'Store redesign', 'Digital integration']
  },
  {
    name: 'Indian Terrain',
    category: 'direct',
    marketShare: 12,
    pricePosition: 'mid-premium',
    strengths: ['Indian Heritage', 'Formal Wear', 'Quality Focus'],
    threats: ['Similar Positioning', 'Traditional Market', 'Premium Segment'],
    recentMoves: ['Heritage campaigns', 'Wedding collections', 'Fabric innovation']
  }
];

// Raymond-specific financial data
export const raymondFinancialData = [
  {
    category: 'Formal Wear',
    revenue: 1450000,
    cost: 870000,
    profit: 580000,
    margin: 40,
    discounts: 72500,
    returns: 29000
  },
  {
    category: 'Ethnic Wear',
    revenue: 890000,
    cost: 534000,
    profit: 356000,
    margin: 40,
    discounts: 44500,
    returns: 17800
  },
  {
    category: 'Casual Wear',
    revenue: 650000,
    cost: 455000,
    profit: 195000,
    margin: 30,
    discounts: 32500,
    returns: 13000
  },
  {
    category: 'Accessories',
    revenue: 280000,
    cost: 168000,
    profit: 112000,
    margin: 40,
    discounts: 14000,
    returns: 5600
  },
  {
    category: 'Fabrics',
    revenue: 420000,
    cost: 252000,
    profit: 168000,
    margin: 40,
    discounts: 21000,
    returns: 8400
  }
];

// Raymond inventory aging data
export const raymondInventoryData = [
  {
    brand: 'Raymond Suits',
    '0-30': { count: 89, value: 1690000 },
    '31-60': { count: 45, value: 855000 },
    '61+': { count: 12, value: 228000 }
  },
  {
    brand: 'Raymond Shirts',
    '0-30': { count: 234, value: 585000 },
    '31-60': { count: 89, value: 222500 },
    '61+': { count: 23, value: 57500 }
  },
  {
    brand: 'Ethnic Collection',
    '0-30': { count: 67, value: 1675000 },
    '31-60': { count: 34, value: 850000 },
    '61+': { count: 8, value: 200000 }
  },
  {
    brand: 'Casual Wear',
    '0-30': { count: 156, value: 624000 },
    '31-60': { count: 67, value: 268000 },
    '61+': { count: 18, value: 72000 }
  },
  {
    brand: 'Accessories',
    '0-30': { count: 345, value: 345000 },
    '31-60': { count: 123, value: 123000 },
    '61+': { count: 34, value: 34000 }
  }
];

// Raymond return analysis data
export const raymondReturnData = [
  { reason: 'Size/Fit Issue', count: 89, percentage: 42, color: '#EF4444' },
  { reason: 'Fabric Quality', count: 56, percentage: 26, color: '#F59E0B' },
  { reason: 'Color Mismatch', count: 34, percentage: 16, color: '#8B5CF6' },
  { reason: 'Tailoring Issue', count: 23, percentage: 11, color: '#6B7280' },
  { reason: 'Others', count: 10, percentage: 5, color: '#10B981' }
];

// Raymond category performance
export const raymondCategoryData = [
  {
    category: 'Formal Wear',
    brands: [
      { brand: 'Raymond Suits', units: 89, revenue: 1690000, trend: 'Corporate Professional' },
      { brand: 'Raymond Shirts', units: 234, revenue: 585000, trend: 'Business Formal' },
      { brand: 'Raymond Trousers', units: 145, revenue: 435000, trend: 'Office Wear' }
    ]
  },
  {
    category: 'Ethnic Wear',
    brands: [
      { brand: 'Sherwanis', units: 67, revenue: 1675000, trend: 'Wedding Season Premium' },
      { brand: 'Bandhgalas', units: 34, revenue: 442000, trend: 'Indo-Western' },
      { brand: 'Kurtas', units: 89, revenue: 267000, trend: 'Festive Collection' }
    ]
  },
  {
    category: 'Casual Wear',
    brands: [
      { brand: 'Chinos', units: 89, revenue: 356000, trend: 'Premium Casual' },
      { brand: 'Polo Shirts', units: 123, revenue: 307500, trend: 'Weekend Wear' },
      { brand: 'Casual Shirts', units: 156, revenue: 390000, trend: 'Smart Casual' }
    ]
  }
];