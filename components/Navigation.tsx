'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const navigationItems = [
  {
    name: 'Executive Dashboard',
    href: '/',
    icon: LayoutDashboard,
    description: 'Strategic insights & KPIs'
  },
  {
    name: 'VoC Analytics',
    href: '/voc',
    icon: MessageSquare,
    description: 'Customer feedback analysis'
  },
  {
    name: 'VoE Insights',
    href: '/voe',
    icon: Users,
    description: 'Employee sentiment tracking'
  },
  {
    name: 'KPI Mapping',
    href: '/kpi',
    icon: Target,
    description: 'Performance indicators'
  },
  {
    name: 'AI Assistant',
    href: '/assistant',
    icon: Brain,
    description: 'Smart recommendations'
  },
  {
    name: 'Predictive Analytics',
    href: '/analytics',
    icon: TrendingUp,
    description: 'Scenario modeling'
  },
  {
    name: 'Surveys & Forms',
    href: '/surveys',
    icon: FileText,
    description: 'Dynamic form builder'
  },
  {
    name: 'Alerts & Triggers',
    href: '/alerts',
    icon: AlertTriangle,
    description: 'Risk monitoring'
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    description: 'Executive briefings'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'System configuration'
  }
]

export function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-dark-card border-r border-dark-border z-50"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-dark-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-lg bg-mesh-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white font-satoshi">Polaris Voice+</h1>
                  <p className="text-xs text-gray-400">Decision Intelligence</p>
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-dark-bg transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative flex items-center px-3 py-3 rounded-lg transition-all duration-200
                      ${isActive
                        ? 'bg-mesh-gradient text-white shadow-lg glow-blue'
                        : 'text-gray-300 hover:bg-dark-bg hover:text-white'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                    {!isCollapsed && (
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs opacity-70">{item.description}</div>
                      </div>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-polaris-blue rounded-r"
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-border">
          {!isCollapsed && (
            <div className="text-xs text-gray-500 text-center">
              <div>Polaris Executive Unit</div>
              <div className="text-polaris-blue">v1.0.0 - May 2025</div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}