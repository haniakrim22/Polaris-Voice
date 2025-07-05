'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, MoreHorizontal } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'

interface ChartCardProps {
  title: string
  description: string
  type: 'correlation' | 'forecast'
}

// Sample data for charts
const correlationData = [
  { voc: 85, voe: 78, name: 'Q1' },
  { voc: 82, voe: 75, name: 'Q2' },
  { voc: 88, voe: 82, name: 'Q3' },
  { voc: 91, voe: 85, name: 'Q4' },
  { voc: 87, voe: 83, name: 'Current' },
]

const forecastData = [
  { month: 'Jan', actual: 2.1, forecast: 2.1, name: 'Jan' },
  { month: 'Feb', actual: 2.3, forecast: 2.3, name: 'Feb' },
  { month: 'Mar', actual: 2.0, forecast: 2.0, name: 'Mar' },
  { month: 'Apr', actual: 2.4, forecast: 2.4, name: 'Apr' },
  { month: 'May', actual: null, forecast: 2.6, name: 'May' },
  { month: 'Jun', actual: null, forecast: 2.8, name: 'Jun' },
  { month: 'Jul', actual: null, forecast: 3.1, name: 'Jul' },
]

export function ChartCard({ title, description, type }: ChartCardProps) {
  const renderChart = () => {
    if (type === 'correlation') {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <ScatterChart data={correlationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" />
            <XAxis 
              dataKey="voc" 
              stroke="#6B7280" 
              fontSize={12}
              domain={[70, 100]}
            />
            <YAxis 
              dataKey="voe" 
              stroke="#6B7280" 
              fontSize={12}
              domain={[70, 100]}
            />
            <Scatter 
              dataKey="voe" 
              fill="#00D0FF" 
              stroke="#4C00FF" 
              strokeWidth={2}
              r={6}
            />
          </ScatterChart>
        </ResponsiveContainer>
      )
    }

    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={forecastData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" />
          <XAxis 
            dataKey="name" 
            stroke="#6B7280" 
            fontSize={12}
          />
          <YAxis 
            stroke="#6B7280" 
            fontSize={12}
            domain={[1.5, 3.5]}
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#00D0FF" 
            strokeWidth={3}
            dot={{ fill: '#00D0FF', strokeWidth: 2, r: 4 }}
            connectNulls={false}
          />
          <Line 
            type="monotone" 
            dataKey="forecast" 
            stroke="#4C00FF" 
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: '#4C00FF', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-polaris-blue/10 border border-polaris-blue/20">
            {type === 'correlation' ? (
              <BarChart3 className="w-5 h-5 text-polaris-blue" />
            ) : (
              <TrendingUp className="w-5 h-5 text-polaris-blue" />
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold font-satoshi">{title}</h3>
            <p className="text-gray-400 text-sm font-manrope">{description}</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-lg hover:bg-dark-bg transition-colors"
        >
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </motion.button>
      </div>
      
      <div className="mb-4">
        {renderChart()}
      </div>
      
      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 text-xs">
        {type === 'correlation' ? (
          <>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-polaris-blue"></div>
              <span className="text-gray-400">VoC vs VoE Correlation</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-polaris-blue rounded"></div>
              <span className="text-gray-400">Actual Revenue (SAR M)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-nebula-violet rounded border-dashed"></div>
              <span className="text-gray-400">Forecast</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}