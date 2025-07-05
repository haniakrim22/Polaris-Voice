'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Brain, 
  Target, 
  AlertTriangle, 
  DollarSign, 
  Users, 
  Calendar, 
  Zap,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Settings
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  ScatterChart,
  Scatter
} from 'recharts'
import { useState } from 'react'

const forecastData = [
  { month: 'Jul', actual: 2450, forecast: 2480, confidence: 95 },
  { month: 'Aug', actual: null, forecast: 2520, confidence: 92 },
  { month: 'Sep', actual: null, forecast: 2580, confidence: 89 },
  { month: 'Oct', actual: null, forecast: 2640, confidence: 85 },
  { month: 'Nov', actual: null, forecast: 2710, confidence: 82 },
  { month: 'Dec', actual: null, forecast: 2780, confidence: 78 }
]

const churnPrediction = [
  { segment: 'Enterprise', risk: 15, revenue: 450000, customers: 12 },
  { segment: 'Mid-Market', risk: 22, revenue: 280000, customers: 28 },
  { segment: 'SMB', risk: 8, revenue: 120000, customers: 45 },
  { segment: 'Startup', risk: 35, revenue: 85000, customers: 67 }
]

const scenarioData = [
  {
    scenario: 'Conservative',
    revenue: 2650000,
    growth: 8.2,
    retention: 93.5,
    probability: 70
  },
  {
    scenario: 'Optimistic',
    revenue: 3200000,
    growth: 15.8,
    retention: 96.2,
    probability: 25
  },
  {
    scenario: 'Pessimistic',
    revenue: 2100000,
    growth: -2.1,
    retention: 89.8,
    probability: 5
  }
]

const predictiveInsights = [
  {
    id: 1,
    type: 'revenue',
    title: 'Revenue Forecast',
    prediction: 'Q4 revenue expected to reach SAR 2.78M',
    confidence: 85,
    impact: 'High',
    timeframe: '3 months',
    factors: ['Seasonal trends', 'Customer expansion', 'Market conditions']
  },
  {
    id: 2,
    type: 'churn',
    title: 'Churn Risk Alert',
    prediction: '15% of Enterprise customers at risk',
    confidence: 92,
    impact: 'Critical',
    timeframe: '30 days',
    factors: ['Support tickets', 'Usage decline', 'Contract renewal']
  },
  {
    id: 3,
    type: 'opportunity',
    title: 'Upsell Opportunity',
    prediction: '28 customers ready for premium upgrade',
    confidence: 78,
    impact: 'Medium',
    timeframe: '60 days',
    factors: ['Feature usage', 'Engagement score', 'Support interactions']
  }
]

const modelPerformance = [
  { model: 'Churn Prediction', accuracy: 94.2, precision: 91.8, recall: 89.5 },
  { model: 'Revenue Forecast', accuracy: 87.6, precision: 85.3, recall: 88.1 },
  { model: 'Upsell Prediction', accuracy: 82.4, precision: 79.7, recall: 84.2 },
  { model: 'Sentiment Analysis', accuracy: 91.3, precision: 88.9, recall: 92.1 }
]

const COLORS = ['#00D0FF', '#4C00FF', '#F472B6', '#10B981', '#F59E0B']

export default function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6m')
  const [selectedModel, setSelectedModel] = useState('all')

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'revenue': return DollarSign
      case 'churn': return AlertTriangle
      case 'opportunity': return Target
      default: return Brain
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start"
      >
        <div>
          <h1 className="text-3xl font-bold text-white font-satoshi mb-2 flex items-center space-x-3">
            <Brain className="w-8 h-8 text-polaris-blue" />
            <span>Predictive Analytics</span>
          </h1>
          <p className="text-gray-400 font-manrope">
            AI-powered forecasting and scenario modeling for strategic decision making
          </p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white font-medium focus:outline-none focus:border-polaris-blue"
          >
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="12m">12 Months</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium flex items-center space-x-2 glow-blue"
          >
            <Settings className="w-4 h-4" />
            <span>Configure Models</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Predictive Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {predictiveInsights.map((insight, index) => {
          const Icon = getTypeIcon(insight.type)
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-dark-bg rounded-lg">
                    <Icon className="w-5 h-5 text-polaris-blue" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold font-satoshi">{insight.title}</h3>
                    <span className={`text-xs font-medium ${getImpactColor(insight.impact)}`}>
                      {insight.impact} Impact
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-polaris-blue">{insight.confidence}%</div>
                  <div className="text-xs text-gray-400">Confidence</div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{insight.prediction}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Timeframe:</span>
                  <span className="text-xs text-white">{insight.timeframe}</span>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-2">Key Factors:</div>
                  <div className="space-y-1">
                    {insight.factors.map((factor, factorIndex) => (
                      <div key={factorIndex} className="flex items-center space-x-2">
                        <div className="w-1 h-1 rounded-full bg-polaris-blue"></div>
                        <span className="text-xs text-gray-300">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex-1 bg-dark-bg rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-polaris-blue transition-all duration-500"
                      style={{ width: `${insight.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Forecast */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
            <LineChartIcon className="w-5 h-5 text-polaris-blue" />
            <span>Revenue Forecast</span>
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#00D0FF" 
                  fill="#00D0FF" 
                  fillOpacity={0.3}
                  name="Actual Revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#4C00FF" 
                  fill="#4C00FF" 
                  fillOpacity={0.2}
                  strokeDasharray="5 5"
                  name="Forecast"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Churn Risk Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-polaris-blue" />
            <span>Churn Risk by Segment</span>
          </h3>
          
          <div className="space-y-4">
            {churnPrediction.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-dark-bg rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-white font-medium">{segment.segment}</div>
                    <div className="text-sm text-gray-400">{segment.customers} customers</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      segment.risk > 30 ? 'text-red-400' :
                      segment.risk > 20 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {segment.risk}%
                    </div>
                    <div className="text-xs text-gray-400">Risk</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Revenue at Risk:</span>
                  <span className="text-xs text-white font-medium">
                    SAR {(segment.revenue / 1000).toFixed(0)}K
                  </span>
                </div>
                
                <div className="w-full bg-dark-card rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      segment.risk > 30 ? 'bg-red-400' :
                      segment.risk > 20 ? 'bg-yellow-400' : 'bg-green-400'
                    }`}
                    style={{ width: `${segment.risk}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Planning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-dark-card border border-dark-border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
            <Target className="w-5 h-5 text-polaris-blue" />
            <span>Scenario Planning</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarioData.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  scenario.scenario === 'Conservative' ? 'border-polaris-blue bg-polaris-blue/5' :
                  scenario.scenario === 'Optimistic' ? 'border-green-400 bg-green-400/5' :
                  'border-red-400 bg-red-400/5'
                }`}
              >
                <div className="text-center mb-4">
                  <h4 className="text-white font-semibold text-lg">{scenario.scenario}</h4>
                  <div className="text-sm text-gray-400">{scenario.probability}% probability</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Revenue:</span>
                    <span className="text-white font-medium">
                      SAR {(scenario.revenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Growth:</span>
                    <span className={`font-medium ${
                      scenario.growth > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {scenario.growth > 0 ? '+' : ''}{scenario.growth}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Retention:</span>
                    <span className="text-white font-medium">{scenario.retention}%</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="w-full bg-dark-bg rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        scenario.scenario === 'Conservative' ? 'bg-polaris-blue' :
                        scenario.scenario === 'Optimistic' ? 'bg-green-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${scenario.probability}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Model Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-polaris-blue" />
            <span>Model Performance</span>
          </h3>
          
          <div className="space-y-4">
            {modelPerformance.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-dark-bg rounded-lg p-4"
              >
                <div className="text-white font-medium mb-3">{model.model}</div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Accuracy</span>
                    <span className="text-xs text-white">{model.accuracy}%</span>
                  </div>
                  <div className="w-full bg-dark-card rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-polaris-blue transition-all duration-500"
                      style={{ width: `${model.accuracy}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Precision</span>
                    <span className="text-xs text-white">{model.precision}%</span>
                  </div>
                  <div className="w-full bg-dark-card rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-green-400 transition-all duration-500"
                      style={{ width: `${model.precision}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Recall</span>
                    <span className="text-xs text-white">{model.recall}%</span>
                  </div>
                  <div className="w-full bg-dark-card rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-nebula-violet transition-all duration-500"
                      style={{ width: `${model.recall}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}