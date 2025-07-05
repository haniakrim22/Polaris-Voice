'use client'

import { motion } from 'framer-motion'
import { 
  FileText, 
  Plus, 
  Edit, 
  Eye, 
  Share2, 
  BarChart3, 
  Users, 
  Calendar, 
  Star,
  MessageSquare,
  CheckCircle,
  Clock,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react'
import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const surveys = [
  {
    id: 1,
    title: 'Customer Satisfaction Q2 2024',
    type: 'VoC',
    status: 'active',
    responses: 1247,
    target: 1500,
    completion: 83.1,
    avgScore: 4.2,
    created: '2024-04-01',
    lastModified: '2024-05-15',
    category: 'Customer Experience'
  },
  {
    id: 2,
    title: 'Employee Engagement Survey',
    type: 'VoE',
    status: 'active',
    responses: 342,
    target: 400,
    completion: 85.5,
    avgScore: 3.8,
    created: '2024-05-01',
    lastModified: '2024-05-20',
    category: 'Employee Experience'
  },
  {
    id: 3,
    title: 'Product Feature Feedback',
    type: 'VoC',
    status: 'draft',
    responses: 0,
    target: 800,
    completion: 0,
    avgScore: 0,
    created: '2024-05-25',
    lastModified: '2024-05-25',
    category: 'Product Development'
  },
  {
    id: 4,
    title: 'Support Experience Review',
    type: 'VoC',
    status: 'completed',
    responses: 892,
    target: 800,
    completion: 111.5,
    avgScore: 4.1,
    created: '2024-03-01',
    lastModified: '2024-04-30',
    category: 'Customer Support'
  }
]

const responseData = [
  { day: 'Mon', responses: 45 },
  { day: 'Tue', responses: 52 },
  { day: 'Wed', responses: 38 },
  { day: 'Thu', responses: 61 },
  { day: 'Fri', responses: 48 },
  { day: 'Sat', responses: 23 },
  { day: 'Sun', responses: 19 }
]

const satisfactionData = [
  { name: 'Very Satisfied', value: 45, color: '#10B981' },
  { name: 'Satisfied', value: 32, color: '#00D0FF' },
  { name: 'Neutral', value: 15, color: '#F59E0B' },
  { name: 'Dissatisfied', value: 6, color: '#F97316' },
  { name: 'Very Dissatisfied', value: 2, color: '#EF4444' }
]

const templates = [
  {
    id: 1,
    name: 'Customer Satisfaction (NPS)',
    description: 'Standard Net Promoter Score survey with follow-up questions',
    questions: 8,
    estimatedTime: '3-5 min',
    category: 'VoC',
    usage: 'High'
  },
  {
    id: 2,
    name: 'Employee Engagement',
    description: 'Comprehensive employee satisfaction and engagement survey',
    questions: 15,
    estimatedTime: '8-10 min',
    category: 'VoE',
    usage: 'Medium'
  },
  {
    id: 3,
    name: 'Product Feedback',
    description: 'Feature-specific feedback collection with usability questions',
    questions: 12,
    estimatedTime: '5-7 min',
    category: 'Product',
    usage: 'Medium'
  },
  {
    id: 4,
    name: 'Support Experience',
    description: 'Post-support interaction feedback survey',
    questions: 6,
    estimatedTime: '2-3 min',
    category: 'Support',
    usage: 'High'
  }
]

export default function SurveysPage() {
  const [activeTab, setActiveTab] = useState('surveys')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10'
      case 'draft': return 'text-yellow-400 bg-yellow-400/10'
      case 'completed': return 'text-polaris-blue bg-polaris-blue/10'
      case 'paused': return 'text-gray-400 bg-gray-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VoC': return 'text-polaris-blue bg-polaris-blue/10'
      case 'VoE': return 'text-nebula-violet bg-nebula-violet/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const filteredSurveys = surveys.filter(survey => {
    if (filterStatus !== 'all' && survey.status !== filterStatus) return false
    if (filterType !== 'all' && survey.type !== filterType) return false
    return true
  })

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
            <span>Surveys & Forms</span>
          </h1>
          <p className="text-gray-400 font-manrope">
            Create, manage, and analyze customer and employee feedback surveys
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white font-medium flex items-center space-x-2 hover:bg-dark-bg"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium flex items-center space-x-2 glow-blue"
          >
            <Plus className="w-4 h-4" />
            <span>Create Survey</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex space-x-1 bg-dark-card border border-dark-border rounded-lg p-1"
      >
        {['surveys', 'analytics', 'templates'].map((tab) => (
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

      {/* Surveys Tab */}
      {activeTab === 'surveys' && (
        <div className="space-y-6">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-polaris-blue"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-polaris-blue"
            >
              <option value="all">All Types</option>
              <option value="VoC">Voice of Customer</option>
              <option value="VoE">Voice of Employee</option>
            </select>
          </motion.div>

          {/* Surveys Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSurveys.map((survey, index) => (
              <motion.div
                key={survey.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold font-satoshi mb-2">{survey.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(survey.status)}`}>
                        {survey.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(survey.type)}`}>
                        {survey.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{survey.category}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Responses:</span>
                    <span className="text-sm text-white font-medium">
                      {survey.responses} / {survey.target}
                    </span>
                  </div>
                  
                  <div className="w-full bg-dark-bg rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-polaris-blue transition-all duration-500"
                      style={{ width: `${Math.min(100, survey.completion)}%` }}
                    ></div>
                  </div>
                  
                  {survey.avgScore > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Avg Score:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-white font-medium">{survey.avgScore}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Last Modified:</span>
                    <span className="text-sm text-white">
                      {new Date(survey.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm font-medium hover:bg-dark-card transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm font-medium hover:bg-dark-card transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-3 bg-mesh-gradient rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all"
                  >
                    <Share2 className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Trends */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-card border border-dark-border rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-polaris-blue" />
                <span>Daily Response Trends</span>
              </h3>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={responseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="responses" fill="#00D0FF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Satisfaction Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-card border border-dark-border rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-polaris-blue" />
                <span>Satisfaction Distribution</span>
              </h3>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {satisfactionData.map((entry, index) => (
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
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                {satisfactionData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs text-gray-300">{item.name}</span>
                    <span className="text-xs text-white font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-5 h-5 text-polaris-blue" />
                <span className="text-gray-400 text-sm">Total Responses</span>
              </div>
              <div className="text-2xl font-bold text-white">2,481</div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400">+12.5%</span>
              </div>
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-400 text-sm">Completion Rate</span>
              </div>
              <div className="text-2xl font-bold text-white">84.2%</div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400">+3.1%</span>
              </div>
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-400 text-sm">Avg Time</span>
              </div>
              <div className="text-2xl font-bold text-white">4.2m</div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="w-3 h-3 text-red-400" />
                <span className="text-xs text-red-400">+0.3m</span>
              </div>
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-400 text-sm">Avg Rating</span>
              </div>
              <div className="text-2xl font-bold text-white">4.1</div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400">+0.2</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold font-satoshi mb-2">{template.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{template.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    template.usage === 'High' ? 'text-green-400 bg-green-400/10' :
                    template.usage === 'Medium' ? 'text-yellow-400 bg-yellow-400/10' :
                    'text-gray-400 bg-gray-400/10'
                  }`}>
                    {template.usage} Usage
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Questions:</span>
                    <span className="text-sm text-white font-medium">{template.questions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Est. Time:</span>
                    <span className="text-sm text-white font-medium">{template.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Category:</span>
                    <span className={`text-sm font-medium ${
                      template.category === 'VoC' ? 'text-polaris-blue' :
                      template.category === 'VoE' ? 'text-nebula-violet' :
                      'text-gray-400'
                    }`}>
                      {template.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm font-medium hover:bg-dark-card transition-colors"
                  >
                    Preview
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 bg-mesh-gradient rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all"
                  >
                    Use Template
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  )
}