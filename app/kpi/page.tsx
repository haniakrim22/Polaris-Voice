'use client'

import { motion } from 'framer-motion'
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  DollarSign, 
  Heart, 
  Zap, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const kpiData = [
  {
    id: 'ttv',
    name: 'Time to Value',
    value: '12.3',
    unit: 'days',
    target: '15',
    change: -18.5,
    status: 'good',
    description: 'Average time for customers to realize value',
    icon: Clock,
    color: 'text-green-400'
  },
  {
    id: 'retention',
    name: 'Customer Retention',
    value: '94.2',
    unit: '%',
    target: '92',
    change: 2.8,
    status: 'excellent',
    description: 'Percentage of customers retained over 12 months',
    icon: Users,
    color: 'text-polaris-blue'
  },
  {
    id: 'arpu',
    name: 'ARPU',
    value: '2,450',
    unit: 'SAR',
    target: '2,200',
    change: 11.4,
    status: 'excellent',
    description: 'Average Revenue Per User',
    icon: DollarSign,
    color: 'text-green-400'
  },
  {
    id: 'nps',
    name: 'Net Promoter Score',
    value: '67',
    unit: '',
    target: '60',
    change: 8.2,
    status: 'good',
    description: 'Customer loyalty and satisfaction metric',
    icon: Heart,
    color: 'text-pink-400'
  },
  {
    id: 'fcr',
    name: 'First Call Resolution',
    value: '78.5',
    unit: '%',
    target: '80',
    change: -1.8,
    status: 'warning',
    description: 'Percentage of issues resolved on first contact',
    icon: Zap,
    color: 'text-yellow-400'
  },
  {
    id: 'voe',
    name: 'VoE Index',
    value: '8.2',
    unit: '/10',
    target: '8.0',
    change: 2.5,
    status: 'good',
    description: 'Voice of Employee satisfaction index',
    icon: Users,
    color: 'text-nebula-violet'
  }
]

const trendData = [
  { month: 'Jan', ttv: 15.2, retention: 91.5, arpu: 2200, nps: 62 },
  { month: 'Feb', ttv: 14.8, retention: 92.1, arpu: 2250, nps: 64 },
  { month: 'Mar', ttv: 14.1, retention: 93.2, arpu: 2300, nps: 65 },
  { month: 'Apr', ttv: 13.5, retention: 93.8, arpu: 2350, nps: 66 },
  { month: 'May', ttv: 12.9, retention: 94.2, arpu: 2400, nps: 67 },
  { month: 'Jun', ttv: 12.3, retention: 94.2, arpu: 2450, nps: 67 }
]

const correlationData = [
  { name: 'VoC-VoE', correlation: 0.87, strength: 'Strong Positive' },
  { name: 'NPS-Retention', correlation: 0.92, strength: 'Very Strong' },
  { name: 'TTV-ARPU', correlation: -0.74, strength: 'Strong Negative' },
  { name: 'FCR-NPS', correlation: 0.68, strength: 'Moderate Positive' },
  { name: 'VoE-Retention', correlation: 0.81, strength: 'Strong Positive' }
]

const departmentKPIs = [
  { name: 'Sales', performance: 95, trend: 'up', color: 'bg-green-400' },
  { name: 'Support', performance: 78, trend: 'down', color: 'bg-yellow-400' },
  { name: 'Product', performance: 88, trend: 'up', color: 'bg-polaris-blue' },
  { name: 'Engineering', performance: 92, trend: 'stable', color: 'bg-nebula-violet' },
  { name: 'Marketing', performance: 85, trend: 'up', color: 'bg-pink-400' }
]

export default function KPIPage() {
  const getTrendIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight className="w-4 h-4 text-green-400" />
    if (change < 0) return <ArrowDownRight className="w-4 h-4 text-red-400" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400'
      case 'good': return 'text-polaris-blue'
      case 'warning': return 'text-yellow-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getCorrelationColor = (correlation: number) => {
    const abs = Math.abs(correlation)
    if (abs >= 0.8) return 'text-green-400'
    if (abs >= 0.6) return 'text-polaris-blue'
    if (abs >= 0.4) return 'text-yellow-400'
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
          <h1 className="text-3xl font-bold text-white font-satoshi mb-2 flex items-center space-x-3">
            <Target className="w-8 h-8 text-polaris-blue" />
            <span>KPI Mapping</span>
          </h1>
          <p className="text-gray-400 font-manrope">
            Track key performance indicators and their correlations across the organization
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white font-medium flex items-center space-x-2 hover:bg-dark-bg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Export Report</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium flex items-center space-x-2 glow-blue"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Analyze Trends</span>
          </motion.button>
        </div>
      </motion.div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-dark-bg rounded-lg">
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold font-satoshi">{kpi.name}</h3>
                    <p className="text-xs text-gray-400">{kpi.description}</p>
                  </div>
                </div>
                {getTrendIcon(kpi.change)}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-white">{kpi.value}</span>
                  <span className="text-sm text-gray-400">{kpi.unit}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Target:</span>
                    <span className="text-xs text-white">{kpi.target}{kpi.unit}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`text-xs font-medium ${
                      kpi.change > 0 ? 'text-green-400' : kpi.change < 0 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {kpi.change > 0 ? '+' : ''}{kpi.change}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-dark-bg rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        kpi.status === 'excellent' ? 'bg-green-400' :
                        kpi.status === 'good' ? 'bg-polaris-blue' :
                        kpi.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ 
                        width: `${Math.min(100, (parseFloat(kpi.value.replace(',', '')) / parseFloat(kpi.target.replace(',', ''))) * 100)}%` 
                      }}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium capitalize ${getStatusColor(kpi.status)}`}>
                    {kpi.status}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI Trends Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-polaris-blue" />
            <span>KPI Trends (6 Months)</span>
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
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
                <Line type="monotone" dataKey="ttv" stroke="#00D0FF" strokeWidth={2} name="TTV (days)" />
                <Line type="monotone" dataKey="retention" stroke="#4C00FF" strokeWidth={2} name="Retention (%)" />
                <Line type="monotone" dataKey="nps" stroke="#F472B6" strokeWidth={2} name="NPS" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Correlation Matrix */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-polaris-blue" />
            <span>KPI Correlations</span>
          </h3>
          
          <div className="space-y-4">
            {correlationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-4 bg-dark-bg rounded-lg"
              >
                <div>
                  <div className="text-white font-medium">{item.name}</div>
                  <div className="text-sm text-gray-400">{item.strength}</div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getCorrelationColor(item.correlation)}`}>
                    {item.correlation > 0 ? '+' : ''}{item.correlation.toFixed(2)}
                  </div>
                  <div className="w-20 bg-dark-card rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        Math.abs(item.correlation) >= 0.8 ? 'bg-green-400' :
                        Math.abs(item.correlation) >= 0.6 ? 'bg-polaris-blue' :
                        Math.abs(item.correlation) >= 0.4 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.abs(item.correlation) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Department Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-dark-card border border-dark-border rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6 font-satoshi flex items-center space-x-2">
          <Users className="w-5 h-5 text-polaris-blue" />
          <span>Department Performance Overview</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {departmentKPIs.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="bg-dark-bg rounded-lg p-4 text-center"
            >
              <div className="flex items-center justify-center mb-3">
                <div className={`w-12 h-12 ${dept.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {dept.performance}
                </div>
              </div>
              <div className="text-white font-medium mb-1">{dept.name}</div>
              <div className="flex items-center justify-center space-x-1">
                {dept.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-400" />}
                {dept.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                {dept.trend === 'stable' && <Minus className="w-3 h-3 text-gray-400" />}
                <span className="text-xs text-gray-400 capitalize">{dept.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}