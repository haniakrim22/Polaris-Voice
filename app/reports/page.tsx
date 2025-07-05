'use client'

import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Share, 
  Calendar, 
  Filter,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  MessageSquare,
  Clock,
  Eye,
  Plus,
  Search,
  Grid,
  List,
  Star,
  Bookmark,
  MoreHorizontal
} from 'lucide-react'
import { useState } from 'react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'

const reports = [
  {
    id: 1,
    title: 'Executive Summary - Q2 2024',
    description: 'Comprehensive overview of customer satisfaction, employee engagement, and key performance indicators',
    type: 'executive',
    category: 'Strategic',
    lastGenerated: '2024-06-15T10:30:00Z',
    frequency: 'Monthly',
    status: 'ready',
    size: '2.4 MB',
    pages: 24,
    views: 156,
    downloads: 23,
    isFavorite: true,
    tags: ['Executive', 'KPI', 'Strategic']
  },
  {
    id: 2,
    title: 'Voice of Customer Analytics',
    description: 'Detailed analysis of customer feedback, sentiment trends, and satisfaction metrics',
    type: 'voc',
    category: 'Customer Experience',
    lastGenerated: '2024-06-15T08:45:00Z',
    frequency: 'Weekly',
    status: 'ready',
    size: '1.8 MB',
    pages: 18,
    views: 89,
    downloads: 12,
    isFavorite: false,
    tags: ['VoC', 'Customer', 'Sentiment']
  },
  {
    id: 3,
    title: 'Employee Engagement Report',
    description: 'Voice of Employee insights, department performance, and engagement trends',
    type: 'voe',
    category: 'Human Resources',
    lastGenerated: '2024-06-14T16:20:00Z',
    frequency: 'Bi-weekly',
    status: 'generating',
    size: '1.2 MB',
    pages: 15,
    views: 67,
    downloads: 8,
    isFavorite: true,
    tags: ['VoE', 'HR', 'Engagement']
  },
  {
    id: 4,
    title: 'Revenue Impact Analysis',
    description: 'Financial impact of customer satisfaction on revenue and churn prevention',
    type: 'financial',
    category: 'Finance',
    lastGenerated: '2024-06-14T14:15:00Z',
    frequency: 'Monthly',
    status: 'ready',
    size: '3.1 MB',
    pages: 32,
    views: 134,
    downloads: 28,
    isFavorite: false,
    tags: ['Revenue', 'Finance', 'ROI']
  },
  {
    id: 5,
    title: 'Predictive Analytics Dashboard',
    description: 'AI-powered forecasts and predictive insights for strategic planning',
    type: 'predictive',
    category: 'Analytics',
    lastGenerated: '2024-06-13T11:30:00Z',
    frequency: 'Daily',
    status: 'ready',
    size: '1.6 MB',
    pages: 12,
    views: 201,
    downloads: 45,
    isFavorite: true,
    tags: ['AI', 'Predictive', 'Forecast']
  },
  {
    id: 6,
    title: 'Survey Performance Report',
    description: 'Analysis of survey response rates, completion times, and feedback quality',
    type: 'survey',
    category: 'Operations',
    lastGenerated: '2024-06-12T09:45:00Z',
    frequency: 'Weekly',
    status: 'scheduled',
    size: '0.9 MB',
    pages: 8,
    views: 43,
    downloads: 6,
    isFavorite: false,
    tags: ['Survey', 'Operations', 'Performance']
  }
]

const reportTemplates = [
  {
    id: 1,
    name: 'Executive Brief',
    description: 'High-level summary for C-suite executives',
    icon: BarChart3,
    color: 'text-polaris-blue',
    estimatedTime: '5 minutes'
  },
  {
    id: 2,
    name: 'Customer Journey Analysis',
    description: 'End-to-end customer experience mapping',
    icon: Users,
    color: 'text-nebula-violet',
    estimatedTime: '15 minutes'
  },
  {
    id: 3,
    name: 'Financial Impact Report',
    description: 'Revenue and cost impact analysis',
    icon: DollarSign,
    color: 'text-green-400',
    estimatedTime: '10 minutes'
  },
  {
    id: 4,
    name: 'Department Performance',
    description: 'Team-specific metrics and insights',
    icon: PieChart,
    color: 'text-yellow-400',
    estimatedTime: '8 minutes'
  }
]

const reportMetrics = [
  { month: 'Jan', generated: 45, downloaded: 234, shared: 67 },
  { month: 'Feb', generated: 52, downloaded: 289, shared: 78 },
  { month: 'Mar', generated: 48, downloaded: 267, shared: 71 },
  { month: 'Apr', generated: 61, downloaded: 312, shared: 89 },
  { month: 'May', generated: 58, downloaded: 298, shared: 82 },
  { month: 'Jun', generated: 67, downloaded: 345, shared: 95 }
]

const categoryData = [
  { name: 'Executive', value: 35, color: '#00D0FF' },
  { name: 'Customer', value: 28, color: '#4C00FF' },
  { name: 'Employee', value: 22, color: '#10B981' },
  { name: 'Financial', value: 15, color: '#F59E0B' }
]

export default function ReportsPage() {
  const [viewMode, setViewMode] = useState('grid')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('reports')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-400 bg-green-400/10'
      case 'generating': return 'text-yellow-400 bg-yellow-400/10'
      case 'scheduled': return 'text-polaris-blue bg-polaris-blue/10'
      case 'error': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'executive': return BarChart3
      case 'voc': return MessageSquare
      case 'voe': return Users
      case 'financial': return DollarSign
      case 'predictive': return TrendingUp
      case 'survey': return PieChart
      default: return FileText
    }
  }

  const filteredReports = reports.filter(report => {
    if (filterCategory !== 'all' && report.category.toLowerCase() !== filterCategory) return false
    if (filterStatus !== 'all' && report.status !== filterStatus) return false
    if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !report.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const reportTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - reportTime.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
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
            <FileText className="w-8 h-8 text-polaris-blue" />
            <span>Reports & Analytics</span>
          </h1>
          <p className="text-gray-400 font-manrope">
            Generate, manage, and share comprehensive business intelligence reports
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white font-medium flex items-center space-x-2 hover:bg-dark-bg"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium flex items-center space-x-2 glow-blue"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Report</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <FileText className="w-5 h-5 text-polaris-blue" />
            <span className="text-gray-400 text-sm">Total Reports</span>
          </div>
          <div className="text-2xl font-bold text-white">67</div>
          <div className="flex items-center space-x-1 mt-2">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">+12 this month</span>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Download className="w-5 h-5 text-green-400" />
            <span className="text-gray-400 text-sm">Downloads</span>
          </div>
          <div className="text-2xl font-bold text-white">345</div>
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-xs text-gray-400">this month</span>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Share className="w-5 h-5 text-nebula-violet" />
            <span className="text-gray-400 text-sm">Shares</span>
          </div>
          <div className="text-2xl font-bold text-white">95</div>
          <div className="flex items-center space-x-1 mt-2">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">+8 this week</span>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Eye className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-400 text-sm">Total Views</span>
          </div>
          <div className="text-2xl font-bold text-white">1.2K</div>
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-xs text-gray-400">all time</span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-1 bg-dark-card border border-dark-border rounded-lg p-1"
      >
        {['reports', 'templates', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-mesh-gradient text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-bg'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-polaris-blue w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-polaris-blue"
                >
                  <option value="all">All Categories</option>
                  <option value="strategic">Strategic</option>
                  <option value="customer experience">Customer Experience</option>
                  <option value="human resources">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="analytics">Analytics</option>
                  <option value="operations">Operations</option>
                </select>
              </div>
              
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-polaris-blue"
              >
                <option value="all">All Status</option>
                <option value="ready">Ready</option>
                <option value="generating">Generating</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-polaris-blue text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-polaris-blue text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Reports Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredReports.map((report, index) => {
              const Icon = getTypeIcon(report.type)
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300 ${
                    viewMode === 'list' ? 'flex items-center space-x-6' : ''
                  }`}
                >
                  <div className={`flex items-start ${viewMode === 'list' ? 'space-x-4 flex-1' : 'justify-between mb-4'}`}>
                    <div className={`flex items-start space-x-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <Icon className="w-6 h-6 text-polaris-blue mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-white font-semibold font-satoshi">{report.title}</h3>
                          {report.isFavorite && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                        </div>
                        <p className={`text-gray-400 text-sm leading-relaxed ${viewMode === 'grid' ? 'mb-4' : 'mb-2'}`}>
                          {report.description}
                        </p>
                        
                        {viewMode === 'grid' && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {report.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-2 py-1 bg-dark-bg text-xs text-gray-300 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className={`flex items-center space-x-4 text-xs text-gray-400 ${viewMode === 'list' ? '' : 'mb-4'}`}>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(report.lastGenerated)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-3 h-3" />
                            <span>{report.pages} pages</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="w-3 h-3" />
                            <span>{report.downloads}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{report.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center space-x-2 ${viewMode === 'list' ? '' : 'flex-col space-y-2'}`}>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      {viewMode === 'grid' && (
                        <span className="text-xs text-gray-400">{report.category}</span>
                      )}
                    </div>
                  </div>
                  
                  {viewMode === 'grid' && (
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-mesh-gradient rounded-lg text-white text-sm font-medium glow-blue"
                      >
                        <Download className="w-4 h-4 mx-auto" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm font-medium hover:bg-dark-card transition-colors"
                      >
                        <Eye className="w-4 h-4 mx-auto" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm font-medium hover:bg-dark-card transition-colors"
                      >
                        <Share className="w-4 h-4 mx-auto" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-dark-bg border border-dark-border rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </motion.button>
                    </div>
                  )}
                  
                  {viewMode === 'list' && (
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-mesh-gradient rounded-lg text-white glow-blue"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-dark-bg border border-dark-border rounded-lg text-white hover:bg-dark-card transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-dark-bg border border-dark-border rounded-lg text-white hover:bg-dark-card transition-colors"
                      >
                        <Share className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-dark-bg border border-dark-border rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <Bookmark className="w-4 h-4" />
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {reportTemplates.map((template, index) => {
              const Icon = template.icon
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-center">
                    <Icon className={`w-12 h-12 mx-auto mb-4 ${template.color} group-hover:scale-110 transition-transform`} />
                    <h3 className="text-white font-semibold font-satoshi mb-2">{template.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{template.description}</p>
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-400 mb-4">
                      <Clock className="w-3 h-3" />
                      <span>{template.estimatedTime}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 bg-mesh-gradient rounded-lg text-white text-sm font-medium glow-blue"
                    >
                      Generate Report
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Report Generation Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-card border border-dark-border rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-polaris-blue" />
                <span>Report Activity (6 Months)</span>
              </h3>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportMetrics}>
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
                    <Legend />
                    <Line type="monotone" dataKey="generated" stroke="#00D0FF" strokeWidth={2} name="Generated" />
                    <Line type="monotone" dataKey="downloaded" stroke="#10B981" strokeWidth={2} name="Downloaded" />
                    <Line type="monotone" dataKey="shared" stroke="#4C00FF" strokeWidth={2} name="Shared" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Category Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-card border border-dark-border rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-polaris-blue" />
                <span>Reports by Category</span>
              </h3>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      dataKey="value"
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}