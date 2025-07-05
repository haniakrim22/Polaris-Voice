'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  TrendingUp, 
  Heart, 
  Briefcase, 
  Award, 
  AlertCircle,
  Filter,
  Download,
  RefreshCw,
  Building,
  Loader2
} from 'lucide-react'
import { useVoEData, useVoEDepartmentAnalytics } from '@/hooks/useSupabaseData'

const employeeData = [
  {
    id: 1,
    department: 'Engineering',
    sentiment: 'positive',
    score: 8.7,
    engagement: 85,
    feedback: 'Great work-life balance and exciting projects. The new development tools have improved productivity significantly.',
    date: '2024-05-15',
    employee: 'Senior Developer',
    category: 'Work Environment'
  },
  {
    id: 2,
    department: 'Customer Success',
    sentiment: 'negative',
    score: 4.2,
    engagement: 45,
    feedback: 'Workload has increased dramatically without additional support. Feeling overwhelmed with current responsibilities.',
    date: '2024-05-14',
    employee: 'CS Manager',
    category: 'Workload'
  },
  {
    id: 3,
    department: 'Sales',
    sentiment: 'positive',
    score: 9.1,
    engagement: 92,
    feedback: 'Excellent commission structure and clear career progression path. Management is very supportive.',
    date: '2024-05-13',
    employee: 'Account Executive',
    category: 'Compensation'
  },
  {
    id: 4,
    department: 'Marketing',
    sentiment: 'neutral',
    score: 6.8,
    engagement: 68,
    feedback: 'Good team collaboration but limited budget for creative campaigns. Would like more resources.',
    date: '2024-05-12',
    employee: 'Marketing Specialist',
    category: 'Resources'
  }
]

const departmentStats = [
  { name: 'Engineering', score: 8.7, engagement: 85, trend: 12, employees: 45 },
  { name: 'Sales', score: 8.9, engagement: 89, trend: 8, employees: 32 },
  { name: 'Customer Success', score: 6.2, engagement: 62, trend: -15, employees: 28 },
  { name: 'Marketing', score: 7.4, engagement: 74, trend: 3, employees: 18 },
  { name: 'Operations', score: 7.8, engagement: 78, trend: 5, employees: 22 }
]

const engagementMetrics = {
  overall: 78.5,
  satisfaction: 82,
  retention: 94,
  empowerment: 76
}

export default function VoEPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [timeRange, setTimeRange] = useState('30d')
  
  // Fetch data from Supabase
  const { data: voeData, loading: voeLoading, error: voeError } = useVoEData({
    department: selectedDepartment === 'all' ? undefined : selectedDepartment,
    timeframe: timeRange
  })
  
  const { data: departmentAnalytics, loading: analyticsLoading } = useVoEDepartmentAnalytics()
  
  const isLoading = voeLoading || analyticsLoading
  
  if (voeError) {
    return (
      <div className="min-h-screen bg-dark-bg p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Error Loading VoE Data</h2>
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

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
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
            Voice of Employee Insights
          </h1>
          <p className="text-gray-400 font-manrope">
            Employee sentiment tracking and engagement analytics
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white font-medium flex items-center space-x-2 hover:bg-dark-bg"
          >
            <RefreshCw className="w-4 h-4" />
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
          <span className="ml-2 text-slate-400">Loading VoE data...</span>
        </div>
      )}

      {/* Engagement Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-polaris-blue/10 border border-polaris-blue/20">
              <Heart className="w-5 h-5 text-polaris-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-satoshi">
                {isLoading ? '--' : (voeData?.overallIndex?.toFixed(1) || engagementMetrics.overall)}
              </div>
              <div className="text-sm text-gray-400">Overall VoE Index</div>
            </div>
          </div>
          <div className="w-full bg-dark-bg rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${engagementMetrics.overall}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-2 rounded-full bg-polaris-blue"
            />
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-green-400/10 border border-green-400/20">
              <Award className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-satoshi">
                {isLoading ? '--' : (voeData?.satisfaction?.toFixed(0) || engagementMetrics.satisfaction)}%
              </div>
              <div className="text-sm text-gray-400">Satisfaction</div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-nebula-violet/10 border border-nebula-violet/20">
              <Users className="w-5 h-5 text-nebula-violet" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-satoshi">
                {isLoading ? '--' : (voeData?.retention?.toFixed(0) || engagementMetrics.retention)}%
              </div>
              <div className="text-sm text-gray-400">Retention</div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
              <Briefcase className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-satoshi">
                {isLoading ? '--' : (voeData?.empowerment?.toFixed(1) || engagementMetrics.empowerment)}
              </div>
              <div className="text-sm text-gray-400">Empowerment</div>
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
          {['all', 'Engineering', 'Sales', 'Customer Success', 'Marketing'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                selectedDepartment === dept
                  ? 'bg-mesh-gradient text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg'
              }`}
            >
              {dept}
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
        {/* Employee Feedback */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-4"
        >
          <h2 className="text-xl font-semibold text-white font-satoshi mb-4">Recent Employee Feedback</h2>
          {(voeData?.feedback || employeeData).map((item, index) => (
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
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{item.department}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getSentimentColor(item.sentiment)}`}>
                        {item.sentiment}
                      </span>
                      <span className="text-xs text-gray-400">{item.employee}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{item.score}</div>
                  <div className={`text-xs font-medium ${getEngagementColor(item.engagement)}`}>
                    {item.engagement}% engaged
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

        {/* Department Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 font-satoshi">Department Breakdown</h3>
            <div className="space-y-4">
              {(departmentAnalytics || departmentStats).map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium text-sm">{dept.name}</div>
                      <div className="text-gray-400 text-xs">{dept.employees} employees</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{dept.score}</div>
                      <div className={`flex items-center space-x-1 text-xs ${
                        dept.trend > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <TrendingUp className={`w-3 h-3 ${
                          dept.trend < 0 ? 'rotate-180' : ''
                        }`} />
                        <span>{Math.abs(dept.trend)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        dept.engagement >= 80 ? 'bg-green-400' :
                        dept.engagement >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${dept.engagement}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Alerts */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 font-satoshi flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span>Risk Alerts</span>
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-400/10 border border-red-400/20 rounded-lg">
                <div className="text-red-400 font-medium text-sm">High Turnover Risk</div>
                <div className="text-gray-300 text-xs mt-1">Customer Success team showing low engagement</div>
              </div>
              <div className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                <div className="text-yellow-400 font-medium text-sm">Workload Concerns</div>
                <div className="text-gray-300 text-xs mt-1">Multiple reports of increased workload stress</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}