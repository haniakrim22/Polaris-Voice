'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  target: string
  icon: LucideIcon
  color: string
}

export function KPICard({ title, value, change, trend, target, icon: Icon, color }: KPICardProps) {
  const isPositive = trend === 'up'
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400'
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'polaris-blue':
        return 'text-polaris-blue border-polaris-blue/20 bg-polaris-blue/5'
      case 'nebula-violet':
        return 'text-nebula-violet border-nebula-violet/20 bg-nebula-violet/5'
      case 'green':
        return 'text-green-400 border-green-400/20 bg-green-400/5'
      case 'red':
        return 'text-red-400 border-red-400/20 bg-red-400/5'
      default:
        return 'text-polaris-blue border-polaris-blue/20 bg-polaris-blue/5'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center space-x-1 ${changeColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-gray-400 text-sm font-medium font-manrope">{title}</h3>
        <div className="text-2xl font-bold text-white font-satoshi">{value}</div>
        <div className="text-xs text-gray-500">
          Target: <span className="text-gray-400">{target}</span>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4 w-full bg-dark-bg rounded-full h-1">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.abs(change) * 10)}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-1 rounded-full ${
            color === 'polaris-blue' ? 'bg-polaris-blue' :
            color === 'nebula-violet' ? 'bg-nebula-violet' :
            color === 'green' ? 'bg-green-400' :
            color === 'red' ? 'bg-red-400' : 'bg-polaris-blue'
          }`}
        />
      </div>
    </motion.div>
  )
}