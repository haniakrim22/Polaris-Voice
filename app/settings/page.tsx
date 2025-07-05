'use client'

import { motion } from 'framer-motion'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe, 
  Key, 
  Mail, 
  Phone, 
  Building, 
  Users, 
  Zap, 
  Clock, 
  Download, 
  Upload, 
  Trash2, 
  Save, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Check,
  X,
  Plus,
  Edit,
  AlertTriangle,
  Info
} from 'lucide-react'
import { useState } from 'react'

const settingsCategories = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'integrations', name: 'Integrations', icon: Database },
  { id: 'appearance', name: 'Appearance', icon: Palette },
  { id: 'system', name: 'System', icon: Settings }
]

const integrations = [
  {
    id: 1,
    name: 'Salesforce CRM',
    description: 'Customer relationship management data',
    status: 'connected',
    lastSync: '2024-06-15T10:30:00Z',
    icon: '🔗',
    dataPoints: 15420
  },
  {
    id: 2,
    name: 'Microsoft Teams',
    description: 'Employee communication and collaboration',
    status: 'connected',
    lastSync: '2024-06-15T09:45:00Z',
    icon: '💬',
    dataPoints: 8930
  },
  {
    id: 3,
    name: 'Google Analytics',
    description: 'Website and app usage analytics',
    status: 'disconnected',
    lastSync: null,
    icon: '📊',
    dataPoints: 0
  },
  {
    id: 4,
    name: 'Zendesk Support',
    description: 'Customer support tickets and interactions',
    status: 'error',
    lastSync: '2024-06-14T16:20:00Z',
    icon: '🎫',
    dataPoints: 3240
  },
  {
    id: 5,
    name: 'Slack Workspace',
    description: 'Team communication and feedback',
    status: 'pending',
    lastSync: null,
    icon: '💼',
    dataPoints: 0
  }
]

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    alerts: true,
    reports: true,
    insights: true
  })
  const [profile, setProfile] = useState({
    firstName: 'Ahmed',
    lastName: 'Al-Rashid',
    email: 'ahmed.alrashid@polarisvoice.com',
    phone: '+966 50 123 4567',
    department: 'Executive',
    role: 'Chief Executive Officer',
    company: 'Polaris Telecommunications',
    timezone: 'Asia/Riyadh',
    language: 'en'
  })
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    accentColor: 'polaris-blue',
    fontSize: 'medium',
    animations: true,
    compactMode: false
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 bg-green-400/10'
      case 'disconnected': return 'text-gray-400 bg-gray-400/10'
      case 'error': return 'text-red-400 bg-red-400/10'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const formatTimeAgo = (timestamp: string | null) => {
    if (!timestamp) return 'Never'
    const now = new Date()
    const syncTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - syncTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            value={profile.firstName}
            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
            className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            value={profile.lastName}
            onChange={(e) => setProfile({...profile, lastName: e.target.value})}
            className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({...profile, phone: e.target.value})}
            className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
          <select
            value={profile.department}
            onChange={(e) => setProfile({...profile, department: e.target.value})}
            className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
          >
            <option value="Executive">Executive</option>
            <option value="Customer Experience">Customer Experience</option>
            <option value="Operations">Operations</option>
            <option value="Product">Product</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
          <input
            type="text"
            value={profile.role}
            onChange={(e) => setProfile({...profile, role: e.target.value})}
            className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
          <input
            type="text"
            value={profile.company}
            onChange={(e) => setProfile({...profile, company: e.target.value})}
            className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
          <select
            value={profile.timezone}
            onChange={(e) => setProfile({...profile, timezone: e.target.value})}
            className="w-full px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
          >
            <option value="Asia/Riyadh">Asia/Riyadh (GMT+3)</option>
            <option value="UTC">UTC (GMT+0)</option>
            <option value="America/New_York">America/New_York (GMT-5)</option>
            <option value="Europe/London">Europe/London (GMT+0)</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-dark-card border border-dark-border rounded-lg">
            <div>
              <h4 className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
              <p className="text-gray-400 text-sm">
                {key === 'email' && 'Receive notifications via email'}
                {key === 'push' && 'Browser push notifications'}
                {key === 'sms' && 'SMS notifications for critical alerts'}
                {key === 'alerts' && 'Real-time system alerts'}
                {key === 'reports' && 'Weekly and monthly reports'}
                {key === 'insights' && 'AI-generated insights and recommendations'}
              </p>
            </div>
            <button
              onClick={() => setNotifications({...notifications, [key]: !value})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? 'bg-polaris-blue' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Key className="w-5 h-5 text-polaris-blue" />
          <span>Change Password</span>
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 pr-10 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-polaris-blue"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium glow-blue"
          >
            Update Password
          </motion.button>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5 text-polaris-blue" />
          <span>Two-Factor Authentication</span>
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300">Add an extra layer of security to your account</p>
            <p className="text-gray-400 text-sm mt-1">Currently disabled</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-medium hover:bg-green-500/30 transition-colors"
          >
            Enable 2FA
          </motion.button>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-polaris-blue" />
          <span>Session Management</span>
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
            <div>
              <p className="text-white font-medium">Current Session</p>
              <p className="text-gray-400 text-sm">Chrome on Windows • Riyadh, SA</p>
            </div>
            <span className="px-2 py-1 bg-green-400/10 text-green-400 text-xs rounded">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
            <div>
              <p className="text-white font-medium">Mobile App</p>
              <p className="text-gray-400 text-sm">iOS App • Last active 2h ago</p>
            </div>
            <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-white">Connected Services</h3>
          <p className="text-gray-400 text-sm">Manage your data sources and integrations</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium flex items-center space-x-2 glow-blue"
        >
          <Plus className="w-4 h-4" />
          <span>Add Integration</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-polaris-blue/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{integration.icon}</div>
                <div>
                  <h4 className="text-white font-semibold">{integration.name}</h4>
                  <p className="text-gray-400 text-sm">{integration.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                {integration.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Last Sync:</span>
                <span className="text-white">{formatTimeAgo(integration.lastSync)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Data Points:</span>
                <span className="text-white">{integration.dataPoints.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {integration.status === 'connected' && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 bg-polaris-blue/20 border border-polaris-blue/30 rounded-lg text-polaris-blue text-sm font-medium hover:bg-polaris-blue/30 transition-colors flex items-center justify-center space-x-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Sync</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm font-medium hover:bg-dark-card transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Configure</span>
                  </motion.button>
                </>
              )}
              {integration.status === 'disconnected' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium hover:bg-green-500/30 transition-colors"
                >
                  Connect
                </motion.button>
              )}
              {integration.status === 'error' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors flex items-center justify-center space-x-1"
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>Fix Connection</span>
                </motion.button>
              )}
              {integration.status === 'pending' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm font-medium hover:bg-yellow-500/30 transition-colors"
                >
                  Complete Setup
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h4 className="text-white font-semibold mb-4">Theme</h4>
          <div className="space-y-3">
            {['dark', 'light', 'auto'].map((theme) => (
              <label key={theme} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value={theme}
                  checked={appearance.theme === theme}
                  onChange={(e) => setAppearance({...appearance, theme: e.target.value})}
                  className="w-4 h-4 text-polaris-blue"
                />
                <span className="text-gray-300 capitalize">{theme}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h4 className="text-white font-semibold mb-4">Accent Color</h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'polaris-blue', color: '#00D0FF' },
              { name: 'nebula-violet', color: '#4C00FF' },
              { name: 'emerald', color: '#10B981' },
              { name: 'amber', color: '#F59E0B' },
              { name: 'rose', color: '#F43F5E' },
              { name: 'indigo', color: '#6366F1' }
            ].map((color) => (
              <button
                key={color.name}
                onClick={() => setAppearance({...appearance, accentColor: color.name})}
                className={`w-full h-12 rounded-lg border-2 transition-all ${
                  appearance.accentColor === color.name ? 'border-white' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.color }}
              />
            ))}
          </div>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h4 className="text-white font-semibold mb-4">Font Size</h4>
          <div className="space-y-3">
            {['small', 'medium', 'large'].map((size) => (
              <label key={size} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="fontSize"
                  value={size}
                  checked={appearance.fontSize === size}
                  onChange={(e) => setAppearance({...appearance, fontSize: e.target.value})}
                  className="w-4 h-4 text-polaris-blue"
                />
                <span className="text-gray-300 capitalize">{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
          <h4 className="text-white font-semibold mb-4">Interface Options</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Animations</span>
              <button
                onClick={() => setAppearance({...appearance, animations: !appearance.animations})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  appearance.animations ? 'bg-polaris-blue' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    appearance.animations ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Compact Mode</span>
              <button
                onClick={() => setAppearance({...appearance, compactMode: !appearance.compactMode})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  appearance.compactMode ? 'bg-polaris-blue' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    appearance.compactMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Database className="w-5 h-5 text-polaris-blue" />
          <span>Data Management</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-dark-bg border border-dark-border rounded-lg text-center hover:border-polaris-blue/30 transition-all"
          >
            <Download className="w-6 h-6 text-polaris-blue mx-auto mb-2" />
            <p className="text-white font-medium">Export Data</p>
            <p className="text-gray-400 text-xs">Download your data</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-dark-bg border border-dark-border rounded-lg text-center hover:border-polaris-blue/30 transition-all"
          >
            <Upload className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-white font-medium">Import Data</p>
            <p className="text-gray-400 text-xs">Upload data files</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-dark-bg border border-red-500/30 rounded-lg text-center hover:border-red-500/50 transition-all"
          >
            <Trash2 className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <p className="text-white font-medium">Clear Cache</p>
            <p className="text-gray-400 text-xs">Reset stored data</p>
          </motion.button>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Info className="w-5 h-5 text-polaris-blue" />
          <span>System Information</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Version:</span>
              <span className="text-white">2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Update:</span>
              <span className="text-white">June 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Environment:</span>
              <span className="text-white">Production</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Uptime:</span>
              <span className="text-white">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Storage Used:</span>
              <span className="text-white">2.4 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">API Calls:</span>
              <span className="text-white">15.2K today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeCategory) {
      case 'profile': return renderProfileSettings()
      case 'notifications': return renderNotificationSettings()
      case 'security': return renderSecuritySettings()
      case 'integrations': return renderIntegrationsSettings()
      case 'appearance': return renderAppearanceSettings()
      case 'system': return renderSystemSettings()
      default: return renderProfileSettings()
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
            <Settings className="w-8 h-8 text-polaris-blue" />
            <span>Settings</span>
          </h1>
          <p className="text-gray-400 font-manrope">
            Manage your account, preferences, and system configuration
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-mesh-gradient rounded-lg text-white font-medium flex items-center space-x-2 glow-blue"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-dark-card border border-dark-border rounded-xl p-4">
            <nav className="space-y-2">
              {settingsCategories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                      activeCategory === category.id
                        ? 'bg-mesh-gradient text-white glow-blue'
                        : 'text-gray-400 hover:text-white hover:bg-dark-bg'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            {renderContent()}
          </div>
        </motion.div>
      </div>
    </div>
  )
}