'use client'

import { motion } from 'framer-motion'
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  X, 
  Plus, 
  Settings, 
  Filter,
  Clock,
  TrendingDown,
  TrendingUp,
  Users,
  DollarSign,
  MessageSquare,
  Zap,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'High Churn Risk Detected',
    description: 'Enterprise Corp showing 73% satisfaction drop with SAR 450K revenue at risk',
    timestamp: '2024-06-15T10:30:00Z',
    source: 'VoC Analytics',
    status: 'active',
    priority: 'high',
    affectedCustomers: 1,
    revenueImpact: 450000,
    actions: [
      'Schedule executive call',
      'Prepare retention offer',
      'Assign dedicated CSM'
    ]
  },
  {
    id: 2,
    type: 'warning',
    title: 'Support Ticket Volume Spike',
    description: 'Support tickets increased by 40% in the last 24 hours',
    timestamp: '2024-06-15T09:15:00Z',
    source: 'Support Analytics',
    status: 'active',
    priority: 'medium',
    affectedCustomers: 23,
    revenueImpact: 0,
    actions: [
      'Scale support team',
      'Review common issues',
      'Update knowledge base'
    ]
  },
  {
    id: 3,
    type: 'info',
    title: 'Positive Sentiment Trend',
    description: 'Customer satisfaction increased by 8% this week',
    timestamp: '2024-06-15T08:45:00Z',
    source: 'VoC Analytics',
    status: 'acknowledged',
    priority: 'low',
    affectedCustomers: 156,
    revenueImpact: 0,
    actions: [
      'Share success story',
      'Identify best practices',
      'Replicate across segments'
    ]
  },
  {
    id: 4,
    type: 'critical',
    title: 'Employee Engagement Drop',
    description: 'Engineering team satisfaction decreased by 15% this month',
    timestamp: '2024-06-15T07:20:00Z',
    source: 'VoE Analytics',
    status: 'resolved',
    priority: 'high',
    affectedCustomers: 0,
    revenueImpact: 0,
    actions: [
      'Conduct team meeting',
      'Review workload distribution',
      'Implement feedback'
    ]
  },
  {
    id: 5,
    type: 'warning',
    title: 'Contract Renewal Risk',
    description: 'Innovation Labs contract expires in 30 days with mixed signals',
    timestamp: '2024-06-14T16:30:00Z',
    source: 'Predictive Analytics',
    status: 'active',
    priority: 'medium',
    affectedCustomers: 1,
    revenueImpact: 90000,
    actions: [
      'Schedule renewal discussion',
      'Prepare value proposition',
      'Address concerns'
    ]
  }
]

const triggers = [
  {
    id: 1,
    name: 'Customer Satisfaction Drop',
    description: 'Trigger when NPS score drops below 6 for any customer',
    condition: 'NPS < 6',
    status: 'active',
    frequency: 'real-time',
    lastTriggered: '2024-06-15T10:30:00Z',
    triggerCount: 3
  },
  {
    id: 2,
    name: 'High Support Volume',
    description: 'Alert when support tickets increase by 30% in 24 hours',
    condition: 'Support tickets > 130% of daily average',
    status: 'active',
    frequency: 'hourly',
    lastTriggered: '2024-06-15T09:15:00Z',
    triggerCount: 1
  },
  {
    id: 3,
    name: 'Revenue at Risk',
    description: 'Critical alert for customers with >SAR 100K revenue at risk',
    condition: 'Revenue at risk > SAR 100K',
    status: 'active',
    frequency: 'real-time',
    lastTriggered: '2024-06-15T10:30:00Z',
    triggerCount: 2
  },
  {
    id: 4,
    name: 'Employee Engagement Alert',
    description: 'Warning when department engagement drops below 7.5',
    condition: 'VoE Index < 7.5',
    status: 'paused',
    frequency: 'daily',
    lastTriggered: '2024-06-15T07:20:00Z',
    triggerCount: 5
  }
]

const alertTrends = [
  { day: 'Mon', critical: 2, warning: 5, info: 3 },
  { day: 'Tue', critical: 1, warning: 7, info: 4 },
  { day: 'Wed', critical: 3, warning: 4, info: 2 },
  { day: 'Thu', critical: 0, warning: 6, info: 5 },
  { day: 'Fri', critical: 2, warning: 3, info: 1 },
  { day: 'Sat', critical: 1, warning: 2, info: 2 },
  { day: 'Sun', critical: 1, warning: 1, info: 1 }
]

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('alerts')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle
      case 'warning': return AlertCircle
      case 'info': return Info
      case 'success': return CheckCircle
      default: return Bell
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'warning': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'info': return 'text-polaris-blue bg-polaris-blue/10 border-polaris-blue/20'
      case 'success': return 'text-green-400 bg-green-400/10 border-green-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-400/10'
      case 'acknowledged': return 'text-yellow-400 bg-yellow-400/10'
      case 'resolved': return 'text-green-400 bg-green-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filterType !== 'all' && alert.type !== filterType) return false
    if (filterStatus !== 'all' && alert.status !== filterStatus) return false
    if (filterPriority !== 'all' && alert.priority !== filterPriority) return false
    return true
  })

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
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
            <Bell className="w-8 h-8 text-polaris-blue" />
            <span>Alerts & Triggers</span>
          </h1>
          <p className="text-gray-400 font-manrope">
            Real-time monitoring and intelligent alerting for proactive decision making
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white font-medium flex items-center space-x-2 hover:bg-dark-bg"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium flex items-center space-x-2 glow-blue"
          >
            <Plus className="w-4 h-4" />
            <span>Create Trigger</span>
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
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-gray-400 text-sm">Critical Alerts</span>
          </div>
          <div className="text-2xl font-bold text-white">3</div>
          <div className="flex items-center space-x-1 mt-2">
            <TrendingUp className="w-3 h-3 text-red-400" />
            <span className="text-xs text-red-400">+2 today</span>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-400 text-sm">Warnings</span>
          </div>
          <div className="text-2xl font-bold text-white">7</div>
          <div className="flex items-center space-x-1 mt-2">
            <TrendingDown className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">-1 today</span>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <DollarSign className="w-5 h-5 text-polaris-blue" />
            <span className="text-gray-400 text-sm">Revenue at Risk</span>
          </div>
          <div className="text-2xl font-bold text-white">540K</div>
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-xs text-gray-400">SAR</span>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Zap className="w-5 h-5 text-nebula-violet" />
            <span className="text-gray-400 text-sm">Active Triggers</span>
          </div>
          <div className="text-2xl font-bold text-white">12</div>
          <div className="flex items-center space-x-1 mt-2">
            <span className="text-xs text-gray-400">monitoring</span>
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
        {['alerts', 'triggers', 'analytics'].map((tab) => (
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

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-polaris-blue"
              >
                <option value="all">All Types</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-polaris-blue"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
            </select>
            <select 
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-polaris-blue"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </motion.div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => {
              const Icon = getAlertIcon(alert.type)
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300 ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <Icon className="w-6 h-6 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-semibold font-satoshi">{alert.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                          <span className={`text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                            {alert.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-3">{alert.description}</p>
                        
                        <div className="flex items-center space-x-6 text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(alert.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{alert.source}</span>
                          </div>
                          {alert.affectedCustomers > 0 && (
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{alert.affectedCustomers} customers</span>
                            </div>
                          )}
                          {alert.revenueImpact > 0 && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-3 h-3" />
                              <span>SAR {(alert.revenueImpact / 1000).toFixed(0)}K at risk</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-dark-bg border border-dark-border rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-dark-bg border border-dark-border rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </motion.button>
                      {alert.status === 'active' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </div>
                  
                  {alert.actions.length > 0 && (
                    <div className="border-t border-current/10 pt-4">
                      <div className="text-xs text-gray-400 mb-2">Suggested Actions:</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {alert.actions.map((action, actionIndex) => (
                          <motion.button
                            key={actionIndex}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-2 bg-dark-bg border border-dark-border rounded-lg text-xs text-gray-300 hover:text-white hover:border-polaris-blue/30 transition-all text-left"
                          >
                            {action}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Triggers Tab */}
      {activeTab === 'triggers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {triggers.map((trigger, index) => (
              <motion.div
                key={trigger.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold font-satoshi mb-2">{trigger.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{trigger.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    trigger.status === 'active' ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-400/10'
                  }`}>
                    {trigger.status}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Condition:</span>
                    <code className="text-sm text-polaris-blue bg-polaris-blue/10 px-2 py-1 rounded">
                      {trigger.condition}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Frequency:</span>
                    <span className="text-sm text-white">{trigger.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Last Triggered:</span>
                    <span className="text-sm text-white">{formatTimeAgo(trigger.lastTriggered)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Trigger Count:</span>
                    <span className="text-sm text-white font-medium">{trigger.triggerCount}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm font-medium hover:bg-dark-card transition-colors"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      trigger.status === 'active'
                        ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30'
                        : 'bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30'
                    }`}
                  >
                    {trigger.status === 'active' ? 'Pause' : 'Activate'}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-card border border-dark-border rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-polaris-blue" />
              <span>Alert Trends (7 Days)</span>
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={alertTrends}>
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
                  <Line type="monotone" dataKey="critical" stroke="#EF4444" strokeWidth={2} name="Critical" />
                  <Line type="monotone" dataKey="warning" stroke="#F59E0B" strokeWidth={2} name="Warning" />
                  <Line type="monotone" dataKey="info" stroke="#00D0FF" strokeWidth={2} name="Info" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}