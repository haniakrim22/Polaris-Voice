import { supabase, dbHelpers, Database } from './supabase'

// Types for API responses
export type ApiResponse<T> = {
  data: T | null
  error: string | null
  loading: boolean
}

// Dashboard data aggregation
export const dashboardService = {
  async getDashboardData() {
    try {
      const [kpis, recentAlerts, vocStats, voeStats] = await Promise.all([
        dbHelpers.getKPIs(),
        supabase.from('alerts').select('*').eq('status', 'active').order('created_at', { ascending: false }).limit(5),
        supabase.from('voc_feedback').select('sentiment, score').order('created_at', { ascending: false }).limit(100),
        supabase.from('voe_feedback').select('sentiment, engagement_score').order('created_at', { ascending: false }).limit(100)
      ])

      // Calculate VoC statistics
      const vocData = vocStats.data || []
      const vocSentimentStats = {
        positive: vocData.filter(f => f.sentiment === 'positive').length,
        neutral: vocData.filter(f => f.sentiment === 'neutral').length,
        negative: vocData.filter(f => f.sentiment === 'negative').length,
        averageScore: vocData.length > 0 ? vocData.reduce((sum, f) => sum + f.score, 0) / vocData.length : 0
      }

      // Calculate VoE statistics
      const voeData = voeStats.data || []
      const voeSentimentStats = {
        positive: voeData.filter(f => f.sentiment === 'positive').length,
        neutral: voeData.filter(f => f.sentiment === 'neutral').length,
        negative: voeData.filter(f => f.sentiment === 'negative').length,
        averageEngagement: voeData.length > 0 ? voeData.reduce((sum, f) => sum + f.engagement_score, 0) / voeData.length : 0
      }

      return {
        kpis: kpis || [],
        alerts: recentAlerts.data || [],
        vocStats: vocSentimentStats,
        voeStats: voeSentimentStats
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      throw error
    }
  },

  async getKPITrends(timeRange: '7d' | '30d' | '90d' = '30d') {
    try {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      // For demo purposes, generate mock trend data
      // In a real app, you'd have historical KPI data
      const trendData = []
      for (let i = days; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        trendData.push({
          date: date.toISOString().split('T')[0],
          revenue: 450000 + Math.random() * 100000,
          customers: 1200 + Math.random() * 200,
          nps: 70 + Math.random() * 10,
          retention: 94 + Math.random() * 3
        })
      }

      return trendData
    } catch (error) {
      console.error('Error fetching KPI trends:', error)
      throw error
    }
  }
}

// VoC service
export const vocService = {
  async getFeedback(filters?: { sentiment?: string; timeRange?: string; limit?: number }) {
    try {
      let query = supabase.from('voc_feedback').select('*')

      if (filters?.sentiment && filters.sentiment !== 'all') {
        query = query.eq('sentiment', filters.sentiment)
      }

      if (filters?.timeRange && filters.timeRange !== 'all') {
        const days = parseInt(filters.timeRange)
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)
        query = query.gte('created_at', startDate.toISOString())
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(filters?.limit || 50)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching VoC feedback:', error)
      throw error
    }
  },

  async getSentimentTrends(timeRange: '7d' | '30d' | '90d' = '30d') {
    try {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const { data, error } = await supabase
        .from('voc_feedback')
        .select('sentiment, created_at')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true })

      if (error) throw error

      // Group by date and sentiment
      const trendData: { [key: string]: { positive: number; neutral: number; negative: number } } = {}
      
      data?.forEach(feedback => {
        const date = feedback.created_at.split('T')[0]
        if (!trendData[date]) {
          trendData[date] = { positive: 0, neutral: 0, negative: 0 }
        }
        trendData[date][feedback.sentiment as keyof typeof trendData[string]]++
      })

      return Object.entries(trendData).map(([date, sentiments]) => ({
        date,
        ...sentiments
      }))
    } catch (error) {
      console.error('Error fetching sentiment trends:', error)
      throw error
    }
  },

  async getCategoryBreakdown() {
    try {
      const { data, error } = await supabase
        .from('voc_feedback')
        .select('category, sentiment')
        .order('created_at', { ascending: false })
        .limit(500)

      if (error) throw error

      const categoryStats: { [key: string]: { total: number; positive: number; negative: number } } = {}
      
      data?.forEach(feedback => {
        if (!categoryStats[feedback.category]) {
          categoryStats[feedback.category] = { total: 0, positive: 0, negative: 0 }
        }
        categoryStats[feedback.category].total++
        if (feedback.sentiment === 'positive') categoryStats[feedback.category].positive++
        if (feedback.sentiment === 'negative') categoryStats[feedback.category].negative++
      })

      return Object.entries(categoryStats).map(([category, stats]) => ({
        category,
        total: stats.total,
        positive: stats.positive,
        negative: stats.negative,
        sentiment: stats.positive > stats.negative ? 'positive' : stats.negative > stats.positive ? 'negative' : 'neutral'
      }))
    } catch (error) {
      console.error('Error fetching category breakdown:', error)
      throw error
    }
  }
}

// VoE service
export const voeService = {
  async getFeedback(filters?: { department?: string; sentiment?: string; timeRange?: string; limit?: number }) {
    try {
      let query = supabase.from('voe_feedback').select('*')

      if (filters?.department && filters.department !== 'all') {
        query = query.eq('department', filters.department)
      }

      if (filters?.sentiment && filters.sentiment !== 'all') {
        query = query.eq('sentiment', filters.sentiment)
      }

      if (filters?.timeRange && filters.timeRange !== 'all') {
        const days = parseInt(filters.timeRange)
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)
        query = query.gte('created_at', startDate.toISOString())
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(filters?.limit || 50)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching VoE feedback:', error)
      throw error
    }
  },

  async getDepartmentAnalytics() {
    try {
      const { data, error } = await supabase
        .from('voe_feedback')
        .select('department, sentiment, engagement_score')
        .order('created_at', { ascending: false })
        .limit(1000)

      if (error) throw error

      const deptStats: { [key: string]: { total: number; avgEngagement: number; positive: number; negative: number } } = {}
      
      data?.forEach(feedback => {
        if (!deptStats[feedback.department]) {
          deptStats[feedback.department] = { total: 0, avgEngagement: 0, positive: 0, negative: 0 }
        }
        deptStats[feedback.department].total++
        deptStats[feedback.department].avgEngagement += feedback.engagement_score
        if (feedback.sentiment === 'positive') deptStats[feedback.department].positive++
        if (feedback.sentiment === 'negative') deptStats[feedback.department].negative++
      })

      return Object.entries(deptStats).map(([department, stats]) => ({
        department,
        totalFeedback: stats.total,
        avgEngagement: stats.total > 0 ? stats.avgEngagement / stats.total : 0,
        positiveRatio: stats.total > 0 ? (stats.positive / stats.total) * 100 : 0,
        negativeRatio: stats.total > 0 ? (stats.negative / stats.total) * 100 : 0,
        trend: Math.random() > 0.5 ? 'up' : 'down' // Mock trend data
      }))
    } catch (error) {
      console.error('Error fetching department analytics:', error)
      throw error
    }
  }
}

// Survey service
export const surveyService = {
  async getSurveys(filters?: { status?: string; type?: string }) {
    try {
      let query = supabase.from('surveys').select('*')

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }

      if (filters?.type && filters.type !== 'all') {
        query = query.eq('type', filters.type)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching surveys:', error)
      throw error
    }
  },

  async getSurveyAnalytics() {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const totalResponses = data?.reduce((sum, survey) => sum + survey.responses, 0) || 0
      const avgCompletionRate = data?.length ? data.reduce((sum, survey) => sum + survey.completion_rate, 0) / data.length : 0
      const avgTime = 4.2 // Mock data
      const avgRating = 4.1 // Mock data

      return {
        totalResponses,
        avgCompletionRate,
        avgTime,
        avgRating,
        surveys: data || []
      }
    } catch (error) {
      console.error('Error fetching survey analytics:', error)
      throw error
    }
  }
}

// Alert service
export const alertService = {
  async getAlerts(filters?: { type?: string; status?: string; priority?: string }) {
    try {
      let query = supabase.from('alerts').select('*')

      if (filters?.type && filters.type !== 'all') {
        query = query.eq('type', filters.type)
      }

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }

      if (filters?.priority && filters.priority !== 'all') {
        query = query.eq('priority', filters.priority)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching alerts:', error)
      throw error
    }
  },

  async updateAlertStatus(id: string, status: 'active' | 'acknowledged' | 'resolved') {
    try {
      return await dbHelpers.updateAlertStatus(id, status)
    } catch (error) {
      console.error('Error updating alert status:', error)
      throw error
    }
  },

  async getAlertTrends(days: number = 7) {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const { data, error } = await supabase
        .from('alerts')
        .select('type, created_at')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true })

      if (error) throw error

      // Group by date and type
      const trendData: { [key: string]: { critical: number; warning: number; info: number } } = {}
      
      data?.forEach(alert => {
        const date = alert.created_at.split('T')[0]
        if (!trendData[date]) {
          trendData[date] = { critical: 0, warning: 0, info: 0 }
        }
        trendData[date][alert.type as keyof typeof trendData[string]]++
      })

      return Object.entries(trendData).map(([date, types]) => ({
        date,
        ...types
      }))
    } catch (error) {
      console.error('Error fetching alert trends:', error)
      throw error
    }
  }
}

// Report service
export const reportService = {
  async getReports(filters?: { category?: string; status?: string; search?: string }) {
    try {
      let query = supabase.from('reports').select('*')

      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category)
      }

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching reports:', error)
      throw error
    }
  },

  async getReportAnalytics() {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('category, status, created_at')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Calculate category distribution
      const categoryStats: { [key: string]: number } = {}
      data?.forEach(report => {
        categoryStats[report.category] = (categoryStats[report.category] || 0) + 1
      })

      const categoryDistribution = Object.entries(categoryStats).map(([category, count]) => ({
        category,
        count,
        percentage: data?.length ? (count / data.length) * 100 : 0
      }))

      return {
        totalReports: data?.length || 0,
        categoryDistribution,
        reports: data || []
      }
    } catch (error) {
      console.error('Error fetching report analytics:', error)
      throw error
    }
  }
}

// Real-time data hooks
export const realtimeService = {
  subscribeToAlerts(callback: (alert: any) => void) {
    return supabase
      .channel('new-alerts')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'alerts' 
      }, (payload) => {
        callback(payload.new)
      })
      .subscribe()
  },

  subscribeToKPIUpdates(callback: (kpi: any) => void) {
    return supabase
      .channel('kpi-updates')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'kpis' 
      }, (payload) => {
        callback(payload.new)
      })
      .subscribe()
  },

  subscribeToNewFeedback(callback: (feedback: any) => void) {
    return supabase
      .channel('new-feedback')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'voc_feedback' 
      }, (payload) => {
        callback(payload.new)
      })
      .subscribe()
  }
}