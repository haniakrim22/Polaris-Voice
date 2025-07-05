'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  Send, 
  Mic, 
  Paperclip, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle,
  Target,
  Lightbulb,
  BarChart3
} from 'lucide-react'
import { useState } from 'react'

const aiRecommendations = [
  {
    id: 1,
    type: 'critical',
    title: 'Immediate Action Required',
    description: 'Customer churn risk detected for Enterprise Corp. Recommend executive intervention within 24 hours.',
    confidence: 94,
    impact: 'SAR 450K revenue at risk',
    actions: [
      'Schedule executive call',
      'Prepare retention offer',
      'Assign dedicated CSM'
    ]
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Upsell Opportunity',
    description: 'TechStart Inc showing high engagement with AI features. Prime candidate for premium tier upgrade.',
    confidence: 87,
    impact: '25% revenue uplift potential',
    actions: [
      'Present premium features',
      'Schedule demo call',
      'Prepare pricing proposal'
    ]
  },
  {
    id: 3,
    type: 'insight',
    title: 'Employee Engagement Trend',
    description: 'Engineering team satisfaction increased 12% after implementing new development tools.',
    confidence: 91,
    impact: 'Reduced turnover risk',
    actions: [
      'Expand tool rollout',
      'Document best practices',
      'Share success story'
    ]
  }
]

const chatHistory = [
  {
    id: 1,
    type: 'user',
    message: 'What are the key risks in our customer portfolio right now?',
    timestamp: '10:30 AM'
  },
  {
    id: 2,
    type: 'assistant',
    message: 'Based on the latest VoC analysis, I\'ve identified 3 critical risks:\n\n1. **Enterprise Corp** - 73% satisfaction drop, SAR 450K at risk\n2. **Global Solutions** - Support ticket volume up 40%\n3. **Innovation Labs** - Contract renewal in 30 days with mixed signals\n\nWould you like me to prioritize these by revenue impact?',
    timestamp: '10:30 AM'
  },
  {
    id: 3,
    type: 'user',
    message: 'Yes, show me the revenue impact analysis',
    timestamp: '10:32 AM'
  },
  {
    id: 4,
    type: 'assistant',
    message: 'Here\'s the revenue impact analysis:\n\n**High Risk (SAR 450K)**\n- Enterprise Corp: Immediate intervention needed\n\n**Medium Risk (SAR 180K)**\n- Global Solutions: Support escalation required\n\n**Low Risk (SAR 90K)**\n- Innovation Labs: Proactive engagement recommended\n\nTotal at-risk revenue: **SAR 720K**\n\nShall I generate action plans for each?',
    timestamp: '10:32 AM'
  }
]

export default function AssistantPage() {
  const [message, setMessage] = useState('')
  const [isListening, setIsListening] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('')
    }
  }

  const getRecommendationType = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          color: 'text-red-400',
          bg: 'bg-red-400/10',
          border: 'border-red-400/20',
          icon: AlertTriangle
        }
      case 'opportunity':
        return {
          color: 'text-green-400',
          bg: 'bg-green-400/10',
          border: 'border-green-400/20',
          icon: TrendingUp
        }
      case 'insight':
        return {
          color: 'text-polaris-blue',
          bg: 'bg-polaris-blue/10',
          border: 'border-polaris-blue/20',
          icon: Lightbulb
        }
      default:
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-400/10',
          border: 'border-gray-400/20',
          icon: Target
        }
    }
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
            <Brain className="w-8 h-8 text-polaris-blue" />
            <span>AI Assistant</span>
          </h1>
          <p className="text-gray-400 font-manrope">
            Smart recommendations and strategic insights powered by advanced AI
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white font-medium flex items-center space-x-2 hover:bg-dark-bg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium flex items-center space-x-2 glow-blue"
          >
            <Sparkles className="w-4 h-4" />
            <span>New Insight</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-dark-card border border-dark-border rounded-xl overflow-hidden"
        >
          {/* Chat Header */}
          <div className="p-6 border-b border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-mesh-gradient flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold font-satoshi">Polaris AI Assistant</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-xs text-gray-400">Online • Ready to help</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {chatHistory.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  chat.type === 'user'
                    ? 'bg-mesh-gradient text-white'
                    : 'bg-dark-bg border border-dark-border text-gray-300'
                }`}>
                  <p className="text-sm font-manrope whitespace-pre-line">{chat.message}</p>
                  <p className="text-xs opacity-70 mt-2">{chat.timestamp}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-dark-border">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about your business insights..."
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-polaris-blue transition-colors"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsListening(!isListening)}
                className={`p-3 rounded-lg transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-dark-bg border border-dark-border text-gray-400 hover:text-white'
                }`}
              >
                <Mic className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="p-3 bg-mesh-gradient rounded-lg text-white hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-xl font-semibold text-white font-satoshi mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-polaris-blue" />
              <span>Smart Recommendations</span>
            </h2>
            
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => {
                const config = getRecommendationType(rec.type)
                const Icon = config.icon
                
                return (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`${config.bg} ${config.border} border rounded-xl p-4 hover:border-polaris-blue/30 transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <Icon className={`w-5 h-5 ${config.color} mt-0.5`} />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm">{rec.title}</h3>
                        <p className="text-gray-300 text-xs mt-1 leading-relaxed">{rec.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-400">
                        {rec.confidence}% confidence
                      </span>
                      <span className={`text-xs font-medium ${config.color}`}>
                        {rec.impact}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400 font-medium">Suggested Actions:</div>
                      {rec.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-center space-x-2">
                          <div className="w-1 h-1 rounded-full bg-polaris-blue"></div>
                          <span className="text-xs text-gray-300">{action}</span>
                        </div>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-3 py-2 bg-mesh-gradient rounded-lg text-white text-xs font-medium hover:shadow-lg transition-all"
                    >
                      Take Action
                    </motion.button>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 font-satoshi">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-dark-bg transition-colors text-sm text-gray-300 hover:text-white">
                Generate Executive Brief
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-dark-bg transition-colors text-sm text-gray-300 hover:text-white">
                Analyze Customer Sentiment
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-dark-bg transition-colors text-sm text-gray-300 hover:text-white">
                Predict Churn Risk
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-dark-bg transition-colors text-sm text-gray-300 hover:text-white">
                Identify Upsell Opportunities
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}