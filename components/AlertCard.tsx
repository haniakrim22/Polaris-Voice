'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react'
import { useState } from 'react'

interface AlertCardProps {
  type: 'critical' | 'warning' | 'info'
  message: string
  time: string
}

export function AlertCard({ type, message, time }: AlertCardProps) {
  const [isVisible, setIsVisible] = useState(true)

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          color: 'text-red-400',
          bg: 'bg-red-400/10',
          border: 'border-red-400/30',
          icon: AlertTriangle,
          pulse: 'animate-pulse-glow'
        }
      case 'warning':
        return {
          color: 'text-yellow-400',
          bg: 'bg-yellow-400/10',
          border: 'border-yellow-400/30',
          icon: AlertCircle,
          pulse: ''
        }
      case 'info':
        return {
          color: 'text-polaris-blue',
          bg: 'bg-polaris-blue/10',
          border: 'border-polaris-blue/30',
          icon: Info,
          pulse: ''
        }
      default:
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-400/10',
          border: 'border-gray-400/30',
          icon: Info,
          pulse: ''
        }
    }
  }

  const config = getAlertConfig(type)
  const Icon = config.icon

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`
        ${config.bg} ${config.border} border rounded-lg p-4 
        ${config.pulse} transition-all duration-200
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Icon className={`w-5 h-5 ${config.color} mt-0.5`} />
          <div className="flex-1">
            <p className="text-white text-sm font-medium font-manrope leading-relaxed">
              {message}
            </p>
            <p className="text-gray-400 text-xs mt-1">{time}</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}