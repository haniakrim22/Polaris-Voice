'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Star,
  Filter,
  Download,
  Search,
  Calendar,
  BarChart3,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts'
import { useVoCData, useVoCSentimentTrends, useVoCCategoryBreakdown } from '@/hooks/useSupabaseData'

const customerFeedback = [
  {
    id: 1,
    customer: 'Enterprise Corp',
    sentiment: 'positive',
    score: 8.5,
    category: 'Product Features',
    feedback: 'The new AI features have significantly improved our workflow efficiency. Great job on the implementation!',
    date: '2024-05-15',
    source: 'NPS Survey',
    impact: 'high'
  },
  {
    id: 2,
    customer: 'TechStart Inc',
    sentiment: 'negative',
    score: 3.2,
    category: 'Support',
    feedback: 'Response time for technical issues has been disappointing. We need faster resolution.',
    date: '2024-05-14',
    source: 'Support Ticket',
    impact: 'critical'
  },
  {
    id: 3,
    customer: 'Global Solutions',
    sentiment: 'neutral',
    score: 6.8,
    category: 'User Experience',
    feedback: 'The interface is functional but could be more intuitive. Some features are hard to find.',
    date: '2024-05-13',
    source: 'User Interview',
    impact: 'medium'
  },
  {
    id: 4,
    customer: 'Innovation Labs',
    sentiment: 'positive',
    score: 9.1,
    category: 'Integration',
    feedback: 'Seamless integration with our existing systems. The API documentation is excellent.',
    date: '2024-05-12',
    source: 'Developer Survey',
    impact: 'high'
  }
]

const sentimentStats = {
  positive: 45,
  neutral: 32,
  negative: 23
}

const categories = [
  { name: 'Product Features', count: 156, trend: 12 },
  { name: 'Support', count: 89, trend: -8 },
  { name: 'User Experience', count: 134, trend: 5 },
  { name: 'Integration', count: 67, trend: 18 },
  { name: 'Performance', count: 98, trend: -3 }
]

export default function VoCPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSentiment, setSelectedSentiment] = useState('all')
  
  // Fetch data from Supabase
  const { data: vocData, loading: vocLoading, error: vocError } = useVoCData({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    sentiment: selectedSentiment === 'all' ? undefined : selectedSentiment,
    timeframe: timeRange
  })
  
  const { data: sentimentTrends, loading: trendsLoading } = useVoCSentimentTrends(timeRange)
  const { data: categoryBreakdown, loading: categoryLoading } = useVoCCategoryBreakdown()
  
  const isLoading = vocLoading || trendsLoading || categoryLoading
  
  if (vocError) {
    return (
      <div className="min-h-screen bg-dark-bg p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading VoC Data</h2>
          <p className="text-slate-400">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'negative': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'neutral': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
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
          <h1 className="text-3xl font-bold text-white font-satoshi mb-2">
            Voice of Customer Analytics
          </h1>
          <p className="text-gray-400 font-manrope">
            Customer feedback analysis and sentiment tracking
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white font-medium flex items-center space-x-2 hover:bg-dark-bg"
          >
            <Download className="w-4 h-4" />
            <span>Refresh</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium flex items-center space-x-2 glow-blue"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-polaris-blue" />
          <span className="ml-2 text-slate-400">Loading VoC data...</span>
        </div>
      )}

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-green-400/10 border border-green-400/20">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-satoshi">
                {isLoading ? '--' : `${sentimentTrends?.positive || sentimentStats.positive}%`}
              </div>
              <div className="text-sm text-gray-400">Positive</div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-satoshi">
                {isLoading ? '--' : `${sentimentTrends?.neutral || sentimentStats.neutral}%`}
              </div>
              <div className="text-sm text-gray-400">Neutral</div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-red-400/10 border border-red-400/20">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-satoshi">
                {isLoading ? '--' : `${sentimentTrends?.negative || sentimentStats.negative}%`}
              </div>
              <div className="text-sm text-gray-400">Negative</div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-polaris-blue/10 border border-polaris-blue/20">
              <Star className="w-5 h-5 text-polaris-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-satoshi">
                {isLoading ? '--' : (vocData?.averageScore?.toFixed(1) || '7.2')}
              </div>
              <div className="text-sm text-gray-400">Avg Score</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-4 bg-dark-card border border-dark-border rounded-xl p-4"
      >
        <Filter className="w-5 h-5 text-gray-400" />
        <div className="flex space-x-2">
          {['all', 'positive', 'neutral', 'negative'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-mesh-gradient text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <div className="ml-auto flex space-x-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-mesh-gradient text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-4"
        >
          <h2 className="text-xl font-semibold text-white font-satoshi mb-4">Recent Feedback</h2>
          {(vocData?.feedback || customerFeedback).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-mesh-gradient flex items-center justify-center text-white font-semibold">
                    {item.customer.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{item.customer}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getSentimentColor(item.sentiment)}`}>
                        {item.sentiment}
                      </span>
                      <span className="text-xs text-gray-400">{item.source}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{item.score}</div>
                  <div className={`text-xs font-medium ${getImpactColor(item.impact)}`}>
                    {item.impact} impact
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3 font-manrope leading-relaxed">
                {item.feedback}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Category: {item.category}</span>
                <span>{item.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories & Trends */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 font-satoshi">Feedback Categories</h3>
            <div className="space-y-4">
              {(categoryBreakdown || categories).map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium text-sm">{category.name}</div>
                    <div className="text-gray-400 text-xs">{category.count} feedback items</div>
                  </div>
                  <div className={`flex items-center space-x-1 ${
                    category.trend > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${
                      category.trend < 0 ? 'rotate-180' : ''
                    }`} />
                    <span className="text-xs font-medium">{Math.abs(category.trend)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}