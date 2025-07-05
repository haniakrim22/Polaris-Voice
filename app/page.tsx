'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Loader2,
  Brain,
  MessageSquare
} from 'lucide-react'
import { KPICard } from '@/components/KPICard'
import { InsightCard } from '@/components/InsightCard'
import { ChartCard } from '@/components/ChartCard'
import { AlertCard } from '@/components/AlertCard'
import { useDashboardData, useKPITrends } from '@/hooks/useSupabaseData'



// Fallback insights for when Supabase data is loading
const fallbackInsights = [
  {
    title: 'Critical Alert: Customer Churn Risk',
    description: 'Enterprise client showing 73% satisfaction drop. Immediate intervention recommended.',
    confidence: 94,
    priority: 'high',
    action: 'Schedule executive call within 24h',
    impact: 'SAR 450K revenue at risk'
  },
  {
    title: 'Opportunity: Feature Adoption Surge',
    description: 'New AI features showing 340% adoption increase. Scale support resources.',
    confidence: 87,
    priority: 'medium',
    action: 'Expand customer success team',
    impact: 'Potential 25% revenue uplift'
  },
  {
    title: 'Employee Sentiment: Positive Trend',
    description: 'VoE scores improving across all departments. Engagement initiatives working.',
    confidence: 91,
    priority: 'low',
    action: 'Continue current programs',
    impact: 'Reduced turnover risk'
  }
]

// Fallback alerts for when Supabase data is loading
const fallbackAlerts = [
  {
    type: 'critical',
    message: 'API rate limit approaching for CRM integration',
    time: '2 minutes ago'
  },
  {
    type: 'warning',
    message: 'Survey response rate below 60% threshold',
    time: '15 minutes ago'
  },
  {
    type: 'info',
    message: 'Weekly executive report generated successfully',
    time: '1 hour ago'
  }
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('30d')
  const { data: dashboardData, loading: dashboardLoading, error: dashboardError } = useDashboardData()
  const { data: kpiTrends, loading: trendsLoading } = useKPITrends(timeRange as '7d' | '30d' | '90d')

  if (dashboardLoading) {
    return (
      <div className="space-y-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-polaris-blue mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (dashboardError) {
    return (
      <div className="space-y-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-400">Error loading dashboard: {dashboardError}</p>
        </div>
      </div>
    )
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
            Executive Dashboard
          </h1>
          <p className="text-gray-400 font-manrope">
            Strategic insights powered by VoC, VoE, and KPI triangulation
          </p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white font-medium focus:ring-2 focus:ring-polaris-blue focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium flex items-center space-x-2 glow-blue"
          >
            <Brain className="w-4 h-4" />
            <span>AI Insights</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white font-medium flex items-center space-x-2 hover:bg-dark-bg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Generate Report</span>
          </motion.button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData?.kpis?.slice(0, 8).map((kpi, index) => {
          const getIcon = (name: string) => {
            if (name.toLowerCase().includes('revenue') || name.toLowerCase().includes('arpu')) return DollarSign
            if (name.toLowerCase().includes('retention') || name.toLowerCase().includes('customer')) return Users
            if (name.toLowerCase().includes('nps') || name.toLowerCase().includes('score')) return Target
            if (name.toLowerCase().includes('time') || name.toLowerCase().includes('resolution')) return Clock
            return Activity
          }
          
          const getColor = (status: string) => {
            switch (status) {
              case 'on-track': return 'green'
              case 'at-risk': return 'yellow'
              case 'critical': return 'red'
              default: return 'blue'
            }
          }
          
          return (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <KPICard 
                title={kpi.name}
                value={kpi.value.toString()}
                change={kpi.change}
                trend={kpi.change >= 0 ? 'up' : 'down'}
                icon={getIcon(kpi.name)}
                color={getColor(kpi.status)}
              />
            </motion.div>
          )
        }) || []}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-polaris-blue" />
            <h2 className="text-xl font-semibold text-white font-satoshi">AI-Powered Insights</h2>
          </div>
          {(dashboardData?.insights || fallbackInsights).map((insight, index) => (
            <InsightCard key={index} {...insight} />
          ))}
        </motion.div>

        {/* Alerts & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Real-time Alerts */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold text-white font-satoshi">Live Alerts</h2>
            </div>
            <div className="space-y-3">
              {dashboardData?.alerts?.slice(0, 5).map((alert, index) => {
                const getAlertColor = (type: string) => {
                  switch (type) {
                    case 'critical': return 'red'
                    case 'warning': return 'yellow'
                    case 'info': return 'blue'
                    default: return 'gray'
                  }
                }
                
                const getAlertIcon = (type: string) => {
                  switch (type) {
                    case 'critical': return AlertTriangle
                    case 'warning': return AlertTriangle
                    case 'info': return CheckCircle
                    default: return Activity
                  }
                }
                
                return (
                  <AlertCard 
                    key={alert.id}
                    title={alert.title}
                    message={alert.message}
                    type={alert.type}
                    time={new Date(alert.created_at).toLocaleString()}
                    color={getAlertColor(alert.type)}
                    icon={getAlertIcon(alert.type)}
                  />
                )
              }) || fallbackAlerts.map((alert, index) => (
                <AlertCard key={index} {...alert} />
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 font-satoshi">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Surveys</span>
                <span className="text-white font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Response Rate</span>
                <span className="text-green-400 font-semibold">73.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Data Sources</span>
                <span className="text-white font-semibold">8 Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Last Sync</span>
                <span className="text-gray-300">2 min ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Revenue Forecast Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <ChartCard 
            title="Revenue Forecast vs Actual"
            type="forecast"
            data={kpiTrends}
          />
        </motion.div>

        {/* VoC vs VoE Correlation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-1"
        >
          <ChartCard 
            title="VoC vs VoE Correlation"
            type="correlation"
            data={[
              { voc: dashboardData?.vocStats?.averageScore || 7.2, voe: dashboardData?.voeStats?.averageEngagement || 8.1, department: 'Customer Success' },
              { voc: (dashboardData?.vocStats?.averageScore || 7.2) - 0.5, voe: (dashboardData?.voeStats?.averageEngagement || 8.1) - 0.3, department: 'Sales' },
              { voc: (dashboardData?.vocStats?.averageScore || 7.2) + 0.3, voe: (dashboardData?.voeStats?.averageEngagement || 8.1) + 0.2, department: 'Engineering' },
              { voc: (dashboardData?.vocStats?.averageScore || 7.2) - 0.2, voe: (dashboardData?.voeStats?.averageEngagement || 8.1) - 0.1, department: 'Marketing' }
            ]}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}