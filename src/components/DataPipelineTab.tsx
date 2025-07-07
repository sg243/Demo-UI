import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Database, Brain, BarChart3, FileText, CheckCircle, AlertCircle, Play, Download, Zap, Search, Code, Table } from 'lucide-react';

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

const PREDEFINED_QUERIES = {
  "What is the most sold product?": "SELECT product_name, SUM(quantity) AS total_sold FROM data GROUP BY product_name ORDER BY total_sold DESC LIMIT 1",
  "Which brand had the highest revenue?": "SELECT brand, SUM(final_price * quantity) AS revenue FROM data GROUP BY brand ORDER BY revenue DESC LIMIT 1",
  "Which category has the most returns?": "SELECT category, COUNT(*) AS return_count FROM data WHERE return_status = 1 GROUP BY category ORDER BY return_count DESC LIMIT 1",
  "What is the average delivery time?": "SELECT AVG(delivery_days) AS avg_delivery_time FROM data",
  "Which payment mode is most used?": "SELECT payment_mode, COUNT(*) AS count FROM data GROUP BY payment_mode ORDER BY count DESC LIMIT 1",
  "Which store location had the highest revenue?": "SELECT store_location, SUM(final_price * quantity) AS revenue FROM data GROUP BY store_location ORDER BY revenue DESC LIMIT 1",
  "What is the average discount given?": "SELECT AVG(discount_percent) AS avg_discount FROM data",
  "Which brand has the best average rating?": "SELECT brand, AVG(rating) AS avg_rating FROM data GROUP BY brand ORDER BY avg_rating DESC LIMIT 1",
  "What are the top 5 returned products?": "SELECT product_name, COUNT(*) AS return_count FROM data WHERE return_status = 1 GROUP BY product_name ORDER BY return_count DESC LIMIT 5",
  "Which sales channel performs best?": "SELECT sales_channel, SUM(final_price * quantity) AS total_sales FROM data GROUP BY sales_channel ORDER BY total_sales DESC LIMIT 1"
};

export const DataPipelineTab: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [rawData, setRawData] = useState<any[]>([]);
  const [cleanedData, setCleanedData] = useState<any[]>([]);
  const [cleaningLogs, setCleaningLogs] = useState<CleaningLog[]>([]);
  const [beforeStats, setBeforeStats] = useState<DataStats | null>(null);
  const [afterStats, setAfterStats] = useState<DataStats | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preserveRows, setPreserveRows] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [activeStep, setActiveStep] = useState<'upload' | 'clean' | 'query'>('upload');

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
          // Simple CSV parsing (you might want to use a proper CSV parser)
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
    const logs: CleaningLog[] = [];
    
    try {
      // Create a copy of the data
      let cleaned = JSON.parse(JSON.stringify(rawData));
      
      // Column mapping
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
            }
          }
        }
      }
      
      // Rename columns
      cleaned = cleaned.map(row => {
        const newRow: any = {};
        for (const [oldName, newName] of Object.entries(foundColumns)) {
          newRow[newName] = row[oldName];
          logs.push({
            message: `Renamed column '${oldName}' to '${newName}'`,
            type: 'info'
          });
        }
        // Keep unmapped columns
        for (const [key, value] of Object.entries(row)) {
          if (!foundColumns[key]) {
            newRow[key] = value;
          }
        }
        return newRow;
      });
      
      logs.push({
        message: 'Column mapping completed',
        type: 'success'
      });
      
      // Data cleaning operations
      cleaned = cleaned.map(row => {
        const cleanedRow = { ...row };
        
        // Fill missing values
        if (!cleanedRow.return_reason || cleanedRow.return_reason === '') {
          cleanedRow.return_reason = 'No return reason';
        }
        if (!cleanedRow.review_text || cleanedRow.review_text === '') {
          cleanedRow.review_text = 'No review provided';
        }
        if (!cleanedRow.rating || cleanedRow.rating === '') {
          cleanedRow.rating = 0;
        }
        if (!cleanedRow.co2_saved || cleanedRow.co2_saved === '') {
          cleanedRow.co2_saved = 0;
        }
        
        // Convert date format
        if (cleanedRow.date_of_sale) {
          try {
            cleanedRow.date_of_sale = new Date(cleanedRow.date_of_sale).toISOString().split('T')[0];
          } catch (e) {
            // Keep original if conversion fails
          }
        }
        
        // Convert numeric fields
        if (cleanedRow.price) {
          cleanedRow.price = parseFloat(cleanedRow.price) || 0;
        }
        if (cleanedRow.final_price) {
          cleanedRow.final_price = parseFloat(cleanedRow.final_price) || 0;
        }
        if (cleanedRow.quantity) {
          cleanedRow.quantity = parseInt(cleanedRow.quantity) || 0;
        }
        if (cleanedRow.rating) {
          cleanedRow.rating = parseFloat(cleanedRow.rating) || 0;
        }
        if (cleanedRow.discount_percent) {
          const discount = parseFloat(cleanedRow.discount_percent) || 0;
          cleanedRow.discount_percent = Math.max(0, Math.min(100, discount));
        }
        
        // Standardize text fields
        if (cleanedRow.brand) {
          cleanedRow.brand = cleanedRow.brand.toString().toUpperCase().trim();
        }
        if (cleanedRow.category) {
          cleanedRow.category = cleanedRow.category.toString().replace(/\b\w/g, l => l.toUpperCase()).trim();
        }
        if (cleanedRow.sub_category) {
          cleanedRow.sub_category = cleanedRow.sub_category.toString().replace(/\b\w/g, l => l.toUpperCase()).trim();
        }
        if (cleanedRow.payment_mode) {
          cleanedRow.payment_mode = cleanedRow.payment_mode.toString().toUpperCase().trim();
        }
        if (cleanedRow.store_location) {
          cleanedRow.store_location = cleanedRow.store_location.toString().replace(/\b\w/g, l => l.toUpperCase()).trim();
        }
        if (cleanedRow.sales_channel) {
          cleanedRow.sales_channel = cleanedRow.sales_channel.toString().replace(/\b\w/g, l => l.toUpperCase()).trim();
        }
        
        return cleanedRow;
      });
      
      logs.push({
        message: 'Data cleaning operations completed',
        type: 'success'
      });
      
      logs.push({
        message: 'Filled missing values with defaults',
        type: 'info'
      });
      
      logs.push({
        message: 'Converted numeric fields and standardized text',
        type: 'info'
      });
      
      setCleanedData(cleaned);
      setAfterStats({
        shape: [cleaned.length, Object.keys(cleaned[0] || {}).length],
        columns: Object.keys(cleaned[0] || {}),
        nullCounts: {}
      });
      
      logs.push({
        message: `Data cleaning completed successfully. Processed ${cleaned.length} rows.`,
        type: 'success'
      });
      
    } catch (error) {
      logs.push({
        message: `Error during cleaning: ${error}`,
        type: 'error'
      });
    }
    
    setCleaningLogs(logs);
    setIsProcessing(false);
  }, [rawData, preserveRows]);

  const executeQuery = useCallback((query: string) => {
    if (!cleanedData.length) return;
    
    setIsQuerying(true);
    setActiveStep('query');
    
    try {
      // Simple query execution simulation
      // In a real implementation, you'd use a proper SQL engine
      let result: any[] = [];
      
      if (query.includes('SELECT') && query.includes('FROM data')) {
        // This is a simplified query execution
        // You would need a proper SQL parser and executor
        result = cleanedData.slice(0, 10); // Return first 10 rows as example
      }
      
      setQueryResult({
        data: result,
        columns: Object.keys(result[0] || {}),
        query
      });
      
    } catch (error) {
      console.error('Query execution error:', error);
    }
    
    setIsQuerying(false);
  }, [cleanedData]);

  const handlePredefinedQuery = (question: string) => {
    const query = PREDEFINED_QUERIES[question as keyof typeof PREDEFINED_QUERIES];
    if (query) {
      setCurrentQuery(query);
      executeQuery(query);
    }
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
        </div>

        {/* Data Preview */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Data Preview</h3>
          
          <AnimatePresence mode="wait">
            {rawData.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Raw Data (First 5 rows)</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          {beforeStats?.columns.slice(0, 5).map(col => (
                            <th key={col} className="px-3 py-2 text-left font-medium text-gray-700">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rawData.slice(0, 5).map((row, index) => (
                          <tr key={index} className="border-t">
                            {beforeStats?.columns.slice(0, 5).map(col => (
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

                {cleanedData.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Cleaned Data (First 5 rows)</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead className="bg-green-50">
                          <tr>
                            {afterStats?.columns.slice(0, 5).map(col => (
                              <th key={col} className="px-3 py-2 text-left font-medium text-green-700">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {cleanedData.slice(0, 5).map((row, index) => (
                            <tr key={index} className="border-t">
                              {afterStats?.columns.slice(0, 5).map(col => (
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
                )}
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
      {cleanedData.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Query Interface</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Questions
              </label>
              <div className="space-y-2">
                {Object.keys(PREDEFINED_QUERIES).slice(0, 5).map(question => (
                  <button
                    key={question}
                    onClick={() => handlePredefinedQuery(question)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

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

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Query Results</h3>
            
            {queryResult ? (
              <div>
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-mono text-gray-700">{queryResult.query}</p>
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
                              {String(row[col] || '')}
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
      )}

      {/* Statistics Comparison */}
      {beforeStats && afterStats && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Data Statistics</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Before Cleaning</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rows:</span>
                  <span className="font-medium">{beforeStats.shape[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Columns:</span>
                  <span className="font-medium">{beforeStats.shape[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Quality:</span>
                  <span className="font-medium text-amber-600">Raw</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-3">After Cleaning</h4>
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
                  <span className="font-medium text-green-600">Cleaned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};