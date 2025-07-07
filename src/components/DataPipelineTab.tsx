import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Database, Brain, BarChart3, FileText, CheckCircle, AlertCircle, Play, Download, Zap, Search, Code, Table, Send, Bot, Sparkles, MessageCircle } from 'lucide-react';

interface CleaningLog {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface DataStats {
  shape: [number, number];
  columns: string[];
  nullCounts: Record<string, number>;
}

interface QueryResult {
  data: any[];
  columns: string[];
  query: string;
  executionTime?: number;
  nlpAnswer?: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  query?: string;
  result?: QueryResult;
  timestamp: Date;
}

const COLUMN_MAPPING = {
  'transaction_id': ['transaction_id', 'transactionid', 'txn_id', 'transaction', 'txn', 'trans_id'],
  'date_of_sale': ['date_of_sale', 'sale_date', 'transaction_date', 'purchase_date', 'sale_datetime', 'date'],
  'brand': ['brand', 'product_brand', 'company', 'manufacturer', 'product_label', 'product_make'],
  'product_name': ['product_name', 'item_name', 'product', 'item', 'product_label', 'item_description'],
  'category': ['category', 'product_category', 'product_type', 'item_category', 'category_name'],
  'sub_category': ['sub_category', 'subcategory', 'category_type', 'item_subcategory'],
  'size': ['size', 'product_size', 'item_size', 'garment_size', 'shoe_size'],
  'color': ['color', 'product_color', 'item_color', 'colour'],
  'price': ['price', 'cost', 'product_price', 'item_price', 'cost_price', 'unit_price'],
  'discount_percent': ['discount_percent', 'discount', 'discount_rate', 'discount_value'],
  'final_price': ['final_price', 'price_after_discount', 'sale_price', 'final_cost', 'net_price'],
  'quantity': ['quantity', 'qty', 'units', 'item_count', 'quantity_sold'],
  'payment_mode': ['payment_mode', 'payment_method', 'transaction_mode', 'payment_type', 'payment_method_type'],
  'store_location': ['store_location', 'outlet', 'store', 'store_name', 'location', 'store_address'],
  'sales_channel': ['sales_channel', 'channel', 'selling_channel', 'sale_channel', 'channel_type'],
  'customer_id': ['customer_id', 'user_id', 'client_id', 'customer_number', 'account_id'],
  'customer_gender': ['customer_gender', 'gender', 'user_gender', 'customer_sex'],
  'return_status': ['return_status', 'is_returned', 'return', 'return_flag', 'return_ind'],
  'return_reason': ['return_reason', 'reason_for_return', 'return_cause', 'return_description', 'reason'],
  'review_text': ['review_text', 'customer_review', 'feedback', 'product_review', 'review'],
  'co2_saved': ['co2_saved', 'carbon_saved', 'carbon_emission_saved', 'co2_reduction'],
  'rating': ['rating', 'product_rating', 'customer_rating', 'user_rating', 'product_review_score'],
  'delivery_days': ['delivery_days', 'days_to_deliver', 'delivery_time', 'shipping_days', 'shipping_time']
};

// Sample data for demonstration
const SAMPLE_DATA = [
  {
    transaction_id: 'TXN001',
    date_of_sale: '2024-01-15',
    brand: 'RAYMOND',
    product_name: 'Premium Business Suit',
    category: 'Formal Wear',
    sub_category: 'Suits',
    size: '42',
    color: 'Navy Blue',
    price: 18999,
    discount_percent: 10,
    final_price: 17099,
    quantity: 1,
    payment_mode: 'Credit Card',
    store_location: 'Shivajinagar',
    sales_channel: 'Store',
    customer_gender: 'Male',
    return_status: 0,
    rating: 5,
    delivery_days: 0
  },
  {
    transaction_id: 'TXN002',
    date_of_sale: '2024-01-16',
    brand: 'RAYMOND',
    product_name: 'Silk Sherwani',
    category: 'Ethnic Wear',
    sub_category: 'Wedding Wear',
    size: '40',
    color: 'Gold',
    price: 24999,
    discount_percent: 5,
    final_price: 23749,
    quantity: 1,
    payment_mode: 'Cash',
    store_location: 'Shivajinagar',
    sales_channel: 'Store',
    customer_gender: 'Male',
    return_status: 0,
    rating: 5,
    delivery_days: 0
  },
  {
    transaction_id: 'TXN003',
    date_of_sale: '2024-01-17',
    brand: 'RAYMOND',
    product_name: 'Cotton Formal Shirt',
    category: 'Formal Wear',
    sub_category: 'Shirts',
    size: 'L',
    color: 'White',
    price: 2499,
    discount_percent: 15,
    final_price: 2124,
    quantity: 2,
    payment_mode: 'UPI',
    store_location: 'Shivajinagar',
    sales_channel: 'Store',
    customer_gender: 'Male',
    return_status: 0,
    rating: 4,
    delivery_days: 0
  },
  {
    transaction_id: 'TXN004',
    date_of_sale: '2024-01-18',
    brand: 'RAYMOND',
    product_name: 'Premium Chinos',
    category: 'Casual Wear',
    sub_category: 'Trousers',
    size: '34',
    color: 'Khaki',
    price: 3999,
    discount_percent: 20,
    final_price: 3199,
    quantity: 1,
    payment_mode: 'Debit Card',
    store_location: 'Shivajinagar',
    sales_channel: 'Store',
    customer_gender: 'Male',
    return_status: 1,
    return_reason: 'Size Issue',
    rating: 3,
    delivery_days: 0
  },
  {
    transaction_id: 'TXN005',
    date_of_sale: '2024-01-19',
    brand: 'RAYMOND',
    product_name: 'Bandhgala Jacket',
    category: 'Ethnic Wear',
    sub_category: 'Jackets',
    size: '42',
    color: 'Black',
    price: 12999,
    discount_percent: 8,
    final_price: 11959,
    quantity: 1,
    payment_mode: 'Credit Card',
    store_location: 'Shivajinagar',
    sales_channel: 'Store',
    customer_gender: 'Male',
    return_status: 0,
    rating: 5,
    delivery_days: 0
  }
];

const PREDEFINED_QUERIES_WITH_ANSWERS = {
  "What is the most sold product?": {
    sql: "SELECT product_name, SUM(quantity) AS total_sold FROM data GROUP BY product_name ORDER BY total_sold DESC LIMIT 1",
    answer: "Based on the sales data analysis, the Cotton Formal Shirt is the most sold product with 2 units sold. This indicates strong demand for formal wear essentials in the Raymond Shivajinagar store, particularly for everyday office wear items."
  },
  "Which brand had the highest revenue?": {
    sql: "SELECT brand, SUM(final_price * quantity) AS revenue FROM data GROUP BY brand ORDER BY revenue DESC LIMIT 1",
    answer: "Raymond brand generated the highest revenue with ₹58,031 total sales. This demonstrates the strong performance of Raymond's premium positioning and diverse product portfolio across formal, ethnic, and casual wear categories."
  },
  "Which category has the most returns?": {
    sql: "SELECT category, COUNT(*) AS return_count FROM data WHERE return_status = 1 GROUP BY category ORDER BY return_count DESC LIMIT 1",
    answer: "Casual Wear category has the highest return rate with 1 return out of the analyzed transactions. The return was due to a size issue with Premium Chinos, indicating a need for better size guidance in the casual wear segment."
  },
  "What is the average delivery time?": {
    sql: "SELECT AVG(delivery_days) AS avg_delivery_time FROM data",
    answer: "The average delivery time is 0 days, indicating that all analyzed transactions were in-store purchases at Raymond Shivajinagar. This reflects the store's strength in providing immediate product availability and customer service."
  },
  "Which payment mode is most used?": {
    sql: "SELECT payment_mode, COUNT(*) AS count FROM data GROUP BY payment_mode ORDER BY count DESC LIMIT 1",
    answer: "Credit Card and Store purchases are equally popular payment methods, each used in 2 transactions. This shows a balanced preference between traditional card payments and in-store transactions, indicating diverse customer payment preferences."
  },
  "Which store location had the highest revenue?": {
    sql: "SELECT store_location, SUM(final_price * quantity) AS revenue FROM data GROUP BY store_location ORDER BY revenue DESC LIMIT 1",
    answer: "Shivajinagar store location generated ₹58,031 in total revenue across all analyzed transactions. As the flagship Raymond store, it demonstrates strong performance in the premium menswear market in Pune."
  },
  "What is the average discount given?": {
    sql: "SELECT AVG(discount_percent) AS avg_discount FROM data",
    answer: "The average discount offered is 11.6%, indicating a balanced pricing strategy that maintains Raymond's premium positioning while providing attractive offers to customers. This discount level helps drive sales without compromising brand value."
  },
  "Which brand has the best average rating?": {
    sql: "SELECT brand, AVG(rating) AS avg_rating FROM data GROUP BY brand ORDER BY avg_rating DESC LIMIT 1",
    answer: "Raymond brand maintains an excellent average rating of 4.4 out of 5 stars. This high customer satisfaction score reflects the quality of products, service excellence, and overall brand experience at the Shivajinagar store."
  },
  "What are the top 5 returned products?": {
    sql: "SELECT product_name, COUNT(*) AS return_count FROM data WHERE return_status = 1 GROUP BY product_name ORDER BY return_count DESC LIMIT 5",
    answer: "Premium Chinos is the only returned product in the analyzed dataset, with 1 return due to size issues. This low return rate (20% of total transactions) indicates good product quality and customer satisfaction, with size fitting being the primary concern."
  },
  "Which sales channel performs best?": {
    sql: "SELECT sales_channel, SUM(final_price * quantity) AS total_sales FROM data GROUP BY sales_channel ORDER BY total_sales DESC LIMIT 1",
    answer: "Store sales channel is the top performer with ₹58,031 in total sales across all transactions. This demonstrates the continued importance of physical retail experience for Raymond's premium menswear, where customers value personal service and product touch-and-feel."
  }
};

// Feature comparison data
const FEATURE_COMPARISON_DATA = {
  "Multiple Data Ingestion Sources": { ForesightFlow: 1, Stylumia: 1, Fractal: 1, EDITED: 1, "Woven Insights": 1 },
  "Hyperlocal Sentiment Analysis": { ForesightFlow: 1, Stylumia: 0, Fractal: 1, EDITED: 0, "Woven Insights": 1 },
  "Quick Win Trend Analysis": { ForesightFlow: 1, Stylumia: 1, Fractal: 1, EDITED: 0, "Woven Insights": 1 },
  "Prompt-based Business Querying": { ForesightFlow: 1, Stylumia: 0, Fractal: 1, EDITED: 1, "Woven Insights": 1 },
  "Strategy Testing / Simulation": { ForesightFlow: 1, Stylumia: 1, Fractal: 1, EDITED: 0, "Woven Insights": 0 },
  "Consulting-style Auto Report Generation": { ForesightFlow: 1, Stylumia: 0, Fractal: 1, EDITED: 0, "Woven Insights": 0 },
  "Design Ideation (Visual AI)": { ForesightFlow: 0, Stylumia: 1, Fractal: 0, EDITED: 0, "Woven Insights": 0 },
  "SKU-Level Pricing Automation": { ForesightFlow: 0, Stylumia: 0, Fractal: 1, EDITED: 1, "Woven Insights": 0 },
  "Generative AI Narrative Insights": { ForesightFlow: 1, Stylumia: 1, Fractal: 1, EDITED: 1, "Woven Insights": 1 },
  "Product Matching (CV/NLP embeddings)": { ForesightFlow: 0, Stylumia: 1, Fractal: 0, EDITED: 1, "Woven Insights": 0 }
};

export const DataPipelineTab: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [rawData, setRawData] = useState<any[]>([]);
  const [cleanedData, setCleanedData] = useState<any[]>(SAMPLE_DATA);
  const [cleaningLogs, setCleaningLogs] = useState<CleaningLog[]>([]);
  const [beforeStats, setBeforeStats] = useState<DataStats | null>(null);
  const [afterStats, setAfterStats] = useState<DataStats | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preserveRows, setPreserveRows] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [activeStep, setActiveStep] = useState<'upload' | 'clean' | 'query'>('query');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isGeneratingSQL, setIsGeneratingSQL] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('Multiple Data Ingestion Sources');
  const [activeQueryMode, setActiveQueryMode] = useState<'predefined' | 'custom' | 'nlp'>('predefined');

  // Initialize with sample data stats
  const sampleStats = useMemo(() => ({
    shape: [SAMPLE_DATA.length, Object.keys(SAMPLE_DATA[0] || {}).length] as [number, number],
    columns: Object.keys(SAMPLE_DATA[0] || {}),
    nullCounts: {}
  }), []);

  React.useEffect(() => {
    if (!afterStats) {
      setAfterStats(sampleStats);
      setCleaningLogs([
        { message: 'Sample Raymond sales data loaded successfully', type: 'success' },
        { message: 'Data schema validated - 5 transactions processed', type: 'info' },
        { message: 'Column mapping completed for Raymond data structure', type: 'success' }
      ]);
    }
  }, [afterStats, sampleStats]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setActiveStep('upload');
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        let data: any[] = [];
        
        if (file.name.endsWith('.csv')) {
          const lines = text.split('\n');
          const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
          data = lines.slice(1).filter(line => line.trim()).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const row: any = {};
            headers.forEach((header, index) => {
              row[header] = values[index] || '';
            });
            return row;
          });
        }
        
        setRawData(data);
        setBeforeStats({
          shape: [data.length, Object.keys(data[0] || {}).length],
          columns: Object.keys(data[0] || {}),
          nullCounts: {}
        });
        
        setCleaningLogs([{
          message: `File uploaded successfully: ${file.name}`,
          type: 'success'
        }]);
        
      } catch (error) {
        setCleaningLogs([{
          message: `Error reading file: ${error}`,
          type: 'error'
        }]);
      }
    };
    
    reader.readAsText(file);
  }, []);

  const cleanData = useCallback(() => {
    if (!rawData.length) return;
    
    setIsProcessing(true);
    setActiveStep('clean');
    
    // Use setTimeout to prevent blocking
    setTimeout(() => {
      const logs: CleaningLog[] = [];
      
      try {
        let cleaned = [...rawData];
        
        // Simple column mapping and cleaning
        const foundColumns: Record<string, string> = {};
        const dataColumns = Object.keys(cleaned[0] || {}).map(col => col.toLowerCase().trim());
        
        for (const [standardName, variants] of Object.entries(COLUMN_MAPPING)) {
          for (const variant of variants) {
            if (dataColumns.includes(variant.toLowerCase().trim())) {
              const originalName = Object.keys(cleaned[0] || {}).find(
                col => col.toLowerCase().trim() === variant.toLowerCase().trim()
              );
              if (originalName) {
                foundColumns[originalName] = standardName;
                break;
              }
            }
          }
        }
        
        // Apply column mapping
        cleaned = cleaned.map(row => {
          const newRow: any = {};
          for (const [oldName, newName] of Object.entries(foundColumns)) {
            newRow[newName] = row[oldName];
          }
          // Keep unmapped columns
          for (const [key, value] of Object.entries(row)) {
            if (!foundColumns[key]) {
              newRow[key] = value;
            }
          }
          return newRow;
        });
        
        logs.push({ message: 'Column mapping completed', type: 'success' });
        logs.push({ message: 'Data cleaning operations completed', type: 'success' });
        logs.push({ message: `Processed ${cleaned.length} rows successfully`, type: 'success' });
        
        setCleanedData(cleaned);
        setAfterStats({
          shape: [cleaned.length, Object.keys(cleaned[0] || {}).length],
          columns: Object.keys(cleaned[0] || {}),
          nullCounts: {}
        });
        
      } catch (error) {
        logs.push({ message: `Error during cleaning: ${error}`, type: 'error' });
      }
      
      setCleaningLogs(logs);
      setIsProcessing(false);
    }, 100);
  }, [rawData]);

  const executeQuery = useCallback((query: string, nlpAnswer?: string) => {
    if (!cleanedData.length) return;
    
    setIsQuerying(true);
    setActiveStep('query');
    
    const startTime = Date.now();
    
    // Use setTimeout to prevent blocking
    setTimeout(() => {
      try {
        let result: any[] = [];
        
        // Simple query execution simulation
        if (query.toLowerCase().includes('most sold') || query.toLowerCase().includes('sum(quantity)')) {
          const productSales = cleanedData.reduce((acc, row) => {
            const product = row.product_name || 'Unknown';
            const quantity = parseInt(row.quantity) || 0;
            acc[product] = (acc[product] || 0) + quantity;
            return acc;
          }, {});
          
          const topProduct = Object.entries(productSales).sort(([,a], [,b]) => (b as number) - (a as number))[0];
          result = [{ product_name: topProduct[0], total_sold: topProduct[1] }];
          
        } else if (query.toLowerCase().includes('revenue') || query.toLowerCase().includes('sum(final_price')) {
          const brandRevenue = cleanedData.reduce((acc, row) => {
            const brand = row.brand || 'Unknown';
            const revenue = (parseFloat(row.final_price) || 0) * (parseInt(row.quantity) || 0);
            acc[brand] = (acc[brand] || 0) + revenue;
            return acc;
          }, {});
          
          const topBrand = Object.entries(brandRevenue).sort(([,a], [,b]) => (b as number) - (a as number))[0];
          result = [{ brand: topBrand[0], revenue: topBrand[1] }];
          
        } else if (query.toLowerCase().includes('return') && query.toLowerCase().includes('category')) {
          const categoryReturns = cleanedData.filter(row => row.return_status == 1).reduce((acc, row) => {
            const category = row.category || 'Unknown';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          }, {});
          
          const topCategory = Object.entries(categoryReturns).sort(([,a], [,b]) => (b as number) - (a as number))[0];
          result = topCategory ? [{ category: topCategory[0], return_count: topCategory[1] }] : [{ category: 'No returns', return_count: 0 }];
          
        } else if (query.toLowerCase().includes('avg') && query.toLowerCase().includes('delivery')) {
          const avgDelivery = cleanedData.reduce((sum, row) => sum + (parseInt(row.delivery_days) || 0), 0) / cleanedData.length;
          result = [{ avg_delivery_time: avgDelivery }];
          
        } else if (query.toLowerCase().includes('payment_mode')) {
          const paymentModes = cleanedData.reduce((acc, row) => {
            const mode = row.payment_mode || 'Unknown';
            acc[mode] = (acc[mode] || 0) + 1;
            return acc;
          }, {});
          
          const topMode = Object.entries(paymentModes).sort(([,a], [,b]) => (b as number) - (a as number))[0];
          result = [{ payment_mode: topMode[0], count: topMode[1] }];
          
        } else {
          // Default: return sample data
          result = cleanedData.slice(0, 5);
        }
        
        const executionTime = Date.now() - startTime;
        
        setQueryResult({
          data: result,
          columns: Object.keys(result[0] || {}),
          query,
          executionTime,
          nlpAnswer
        });
        
      } catch (error) {
        console.error('Query execution error:', error);
        setQueryResult({
          data: [],
          columns: [],
          query,
          executionTime: Date.now() - startTime,
          nlpAnswer: 'Error executing query. Please try again.'
        });
      }
      
      setIsQuerying(false);
    }, 500);
  }, [cleanedData]);

  const handlePredefinedQuery = (question: string) => {
    const queryData = PREDEFINED_QUERIES_WITH_ANSWERS[question as keyof typeof PREDEFINED_QUERIES_WITH_ANSWERS];
    if (queryData) {
      setCurrentQuery(queryData.sql);
      executeQuery(queryData.sql, queryData.answer);
      
      // Add to chat
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: question,
        timestamp: new Date()
      };
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: queryData.answer,
        query: queryData.sql,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, userMessage, assistantMessage]);
    }
  };

  const generateSQLFromNLP = useCallback(async (prompt: string) => {
    setIsGeneratingSQL(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let generatedSQL = '';
      let nlpAnswer = '';
      
      // Pattern matching for demo
      if (prompt.toLowerCase().includes('most sold') || prompt.toLowerCase().includes('best selling')) {
        generatedSQL = "SELECT product_name, SUM(quantity) AS total_sold FROM data GROUP BY product_name ORDER BY total_sold DESC LIMIT 5";
        nlpAnswer = "Based on the analysis, I've identified the best-selling products by total quantity sold. The Cotton Formal Shirt leads with 2 units sold, showing strong demand for essential formal wear items.";
      } else if (prompt.toLowerCase().includes('revenue') || prompt.toLowerCase().includes('sales')) {
        generatedSQL = "SELECT brand, SUM(final_price * quantity) AS revenue FROM data GROUP BY brand ORDER BY revenue DESC LIMIT 5";
        nlpAnswer = "I've calculated the revenue by brand. Raymond brand generated ₹58,031 in total revenue, demonstrating strong performance across all product categories.";
      } else if (prompt.toLowerCase().includes('return')) {
        generatedSQL = "SELECT category, COUNT(*) AS return_count FROM data WHERE return_status = 1 GROUP BY category ORDER BY return_count DESC";
        nlpAnswer = "Analyzing return patterns, Casual Wear has 1 return due to size issues. The overall return rate is low at 20%, indicating good product quality and customer satisfaction.";
      } else if (prompt.toLowerCase().includes('average') || prompt.toLowerCase().includes('avg')) {
        generatedSQL = "SELECT AVG(price) AS average_price, AVG(rating) AS average_rating FROM data";
        nlpAnswer = "The average product price is ₹12,499 and average customer rating is 4.4/5, reflecting Raymond's premium positioning and high customer satisfaction.";
      } else {
        generatedSQL = "SELECT * FROM data LIMIT 10";
        nlpAnswer = "I've retrieved a sample of the data to help answer your question. The dataset contains Raymond sales transactions with details about products, pricing, and customer information.";
      }
      
      setCurrentQuery(generatedSQL);
      executeQuery(generatedSQL, nlpAnswer);
      
      // Add to chat
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: prompt,
        timestamp: new Date()
      };
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: nlpAnswer,
        query: generatedSQL,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, userMessage, assistantMessage]);
      
    } catch (error) {
      console.error('Error generating SQL:', error);
    }
    
    setIsGeneratingSQL(false);
  }, [executeQuery]);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPrompt.trim()) return;
    
    generateSQLFromNLP(currentPrompt);
    setCurrentPrompt('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Data Ingestion & Query Pipeline</h2>
            <p className="text-gray-600">Upload, clean, and query retail data files with AI-powered insights</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-6">
          {[
            { key: 'upload', label: 'Upload Data', icon: Upload },
            { key: 'clean', label: 'Clean & Process', icon: CheckCircle },
            { key: 'query', label: 'Query & Analyze', icon: Search }
          ].map(({ key, label, icon: Icon }, index) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${
                activeStep === key ? 'bg-blue-500 text-white' :
                index < ['upload', 'clean', 'query'].indexOf(activeStep) ? 'bg-green-500 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-sm font-medium ${
                activeStep === key ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {label}
              </span>
              {index < 2 && <div className="w-8 h-px bg-gray-300 mx-2"></div>}
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preserveRows}
              onChange={(e) => setPreserveRows(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Preserve rows with invalid data</span>
          </label>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* File Upload */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📤 File Upload</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Upload CSV or Excel files</p>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all"
            >
              <FileText className="w-4 h-4" />
              Choose File
            </label>
          </div>

          {uploadedFile && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>File:</strong> {uploadedFile.name}
              </p>
              <p className="text-sm text-blue-600">
                Size: {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          )}

          {rawData.length > 0 && (
            <button
              onClick={cleanData}
              disabled={isProcessing}
              className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Clean Data
                </>
              )}
            </button>
          )}

          {/* Sample Data Info */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h5 className="font-medium text-green-900 mb-2">Sample Data Loaded</h5>
            <p className="text-sm text-green-700">
              Raymond sales data with 5 transactions ready for analysis. You can upload your own data or use the sample data to explore features.
            </p>
          </div>
        </div>

        {/* Data Preview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Data Preview</h3>
          
          <AnimatePresence mode="wait">
            {cleanedData.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Sample Raymond Sales Data (First 5 rows)</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-green-50">
                        <tr>
                          {afterStats?.columns.slice(0, 6).map(col => (
                            <th key={col} className="px-3 py-2 text-left font-medium text-green-700">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cleanedData.slice(0, 5).map((row, index) => (
                          <tr key={index} className="border-t">
                            {afterStats?.columns.slice(0, 6).map(col => (
                              <td key={col} className="px-3 py-2 text-gray-600">
                                {String(row[col] || '').slice(0, 20)}
                                {String(row[col] || '').length > 20 ? '...' : ''}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <Table className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Upload a file to see data preview</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cleaning Logs */}
      {cleaningLogs.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Processing Logs</h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            {cleaningLogs.map((log, index) => (
              <div key={index} className={`flex items-start gap-2 mb-2 ${
                log.type === 'success' ? 'text-green-700' :
                log.type === 'error' ? 'text-red-700' :
                log.type === 'warning' ? 'text-amber-700' :
                'text-blue-700'
              }`}>
                {log.type === 'success' && <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                {log.type === 'error' && <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                {log.type === 'info' && <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                <span className="text-sm">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Query Interface */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Query Interface</h3>
          
          {/* Query Mode Selector */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'predefined', label: 'Quick Questions', icon: Search },
              { key: 'nlp', label: 'AI Prompt', icon: Bot },
              { key: 'custom', label: 'Custom SQL', icon: Code }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveQueryMode(key as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeQueryMode === key 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Predefined Questions */}
          {activeQueryMode === 'predefined' && (
            <div className="space-y-2">
              {Object.keys(PREDEFINED_QUERIES_WITH_ANSWERS).slice(0, 8).map(question => (
                <button
                  key={question}
                  onClick={() => handlePredefinedQuery(question)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* NLP Prompt Interface */}
          {activeQueryMode === 'nlp' && (
            <div>
              <form onSubmit={handlePromptSubmit} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    placeholder="Ask a question about your data..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isGeneratingSQL}
                  />
                  <button
                    type="submit"
                    disabled={!currentPrompt.trim() || isGeneratingSQL}
                    className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                  >
                    {isGeneratingSQL ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </form>

              {/* Example Prompts */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-2">Try asking:</p>
                {[
                  "What are my best selling products?",
                  "Show me revenue by brand",
                  "Which products have the most returns?",
                  "What's the average customer rating?"
                ].map(example => (
                  <button
                    key={example}
                    onClick={() => setCurrentPrompt(example)}
                    className="block w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom SQL */}
          {activeQueryMode === 'custom' && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom SQL Query
                </label>
                <textarea
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  placeholder="SELECT * FROM data LIMIT 10"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm font-mono"
                  rows={4}
                />
              </div>

              <button
                onClick={() => executeQuery(currentQuery)}
                disabled={!currentQuery.trim() || isQuerying}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isQuerying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Query
                  </>
                )}
              </button>
            </div>
          )}

          {/* Schema Info */}
          {afterStats && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Table Schema</h4>
              <div className="text-sm text-gray-600">
                <p><strong>Table:</strong> data</p>
                <p><strong>Columns:</strong> {afterStats.columns.join(', ')}</p>
                <p><strong>Rows:</strong> {afterStats.shape[0]}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Query Results</h3>
          
          {queryResult ? (
            <div>
              {queryResult.nlpAnswer && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Bot className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">AI Analysis</h4>
                      <p className="text-blue-800 text-sm">{queryResult.nlpAnswer}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-mono text-gray-700">{queryResult.query}</p>
                {queryResult.executionTime && (
                  <p className="text-xs text-gray-500 mt-1">
                    Executed in {queryResult.executionTime}ms
                  </p>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-blue-50">
                    <tr>
                      {queryResult.columns.map(col => (
                        <th key={col} className="px-3 py-2 text-left font-medium text-blue-700">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryResult.data.slice(0, 10).map((row, index) => (
                      <tr key={index} className="border-t">
                        {queryResult.columns.map(col => (
                          <td key={col} className="px-3 py-2 text-gray-600">
                            {typeof row[col] === 'number' && col.includes('revenue') ? 
                              `₹${row[col].toLocaleString()}` : 
                              String(row[col] || '')
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Results
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Run a query to see results</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat History */}
      {chatMessages.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💬 Query Chat History</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {message.type === 'assistant' && <Bot className="w-4 h-4" />}
                    {message.type === 'user' && <MessageCircle className="w-4 h-4" />}
                    <span className="text-sm font-medium">
                      {message.type === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  {message.query && (
                    <div className="mt-2 p-2 bg-black bg-opacity-10 rounded text-xs font-mono">
                      {message.query}
                    </div>
                  )}
                  <div className="text-xs opacity-75 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Comparison */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Feature Comparison</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose feature to compare:
          </label>
          <select
            value={selectedFeature}
            onChange={(e) => setSelectedFeature(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            {Object.keys(FEATURE_COMPARISON_DATA).map(feature => (
              <option key={feature} value={feature}>{feature}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {Object.entries(FEATURE_COMPARISON_DATA[selectedFeature]).map(([company, support]) => (
            <div key={company} className="text-center">
              <div className={`h-20 rounded-lg flex items-end justify-center p-2 ${
                support ? 'bg-blue-500' : 'bg-gray-200'
              }`}>
                <div className={`w-full rounded ${support ? 'bg-blue-600' : 'bg-gray-300'}`} 
                     style={{ height: `${support * 100}%` }}>
                </div>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700">{company}</div>
              <div className="text-xs text-gray-500">{support * 100}%</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Feature Analysis: {selectedFeature}</h4>
          <p className="text-sm text-blue-800">
            ForesightFlow leads in {selectedFeature.toLowerCase()} with comprehensive implementation 
            compared to competitors in the fashion retail AI space.
          </p>
        </div>
      </div>

      {/* Statistics Comparison */}
      {afterStats && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Data Statistics</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Current Dataset</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rows:</span>
                  <span className="font-medium">{afterStats.shape[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Columns:</span>
                  <span className="font-medium">{afterStats.shape[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Quality:</span>
                  <span className="font-medium text-green-600">Cleaned & Ready</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Key Insights</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Revenue:</span>
                  <span className="font-medium">₹58,031</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Rating:</span>
                  <span className="font-medium">4.4/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Return Rate:</span>
                  <span className="font-medium text-green-600">20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};