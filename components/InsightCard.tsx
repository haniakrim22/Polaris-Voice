'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, TrendingUp, Info, ArrowRight, Zap } from 'lucide-react'

interface InsightCardProps {
  title: string
  description: string
  confidence: number
  priority: 'high' | 'medium' | 'low'
  action: string
  impact: string
}

export function InsightCard({ title, description, confidence, priority, action, impact }: InsightCardProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          color: 'text-red-400',
          bg: 'bg-red-400/10',
          border: 'border-red-400/20',
          icon: AlertTriangle,
          glow: 'shadow-red-400/20'
        }
      case 'medium':
        return {
          color: 'text-yellow-400',
          bg: 'bg-yellow-400/10',
          border: 'border-yellow-400/20',
          icon: TrendingUp,
          glow: 'shadow-yellow-400/20'
        }
      case 'low':
        return {
          color: 'text-green-400',
          bg: 'bg-green-400/10',
          border: 'border-green-400/20',
          icon: Info,
          glow: 'shadow-green-400/20'
        }
      default:
        return {
          color: 'text-polaris-blue',
          bg: 'bg-polaris-blue/10',
          border: 'border-polaris-blue/20',
          icon: Info,
          glow: 'shadow-polaris-blue/20'
        }
    }
  }

  const config = getPriorityConfig(priority)
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
      className={`bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300 hover:shadow-lg ${config.glow}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${config.bg} ${config.border} border`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <h3 className="text-white font-semibold font-satoshi">{title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded-full ${config.bg} ${config.color} font-medium`}>
                {priority.toUpperCase()}
              </span>
              <span className="text-xs text-gray-400">
                {confidence}% confidence
              </span>
            </div>
          </div>
        </div>
        
        {/* Confidence meter */}
        <div className="flex flex-col items-end">
          <div className="text-xs text-gray-400 mb-1">Confidence</div>
          <div className="w-16 bg-dark-bg rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-2 rounded-full bg-mesh-gradient"
            />
          </div>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-4 font-manrope leading-relaxed">
        {description}
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-polaris-blue" />
          <span className="text-sm text-gray-400">Recommended Action:</span>
        </div>
        <p className="text-white text-sm font-medium pl-6">{action}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-dark-border">
          <div>
            <span className="text-xs text-gray-400">Potential Impact:</span>
            <p className="text-sm text-polaris-blue font-medium">{impact}</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-3 py-2 bg-mesh-gradient rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-200"
          >
            <span>Take Action</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}