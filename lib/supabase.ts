import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          department: string
          role: string
          company: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          department: string
          role: string
          company: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          department?: string
          role?: string
          company?: string
          created_at?: string
          updated_at?: string
        }
      }
      kpis: {
        Row: {
          id: string
          name: string
          value: number
          target: number
          change: number
          status: 'on-track' | 'at-risk' | 'critical'
          department: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          value: number
          target: number
          change: number
          status: 'on-track' | 'at-risk' | 'critical'
          department: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          value?: number
          target?: number
          change?: number
          status?: 'on-track' | 'at-risk' | 'critical'
          department?: string
          created_at?: string
          updated_at?: string
        }
      }
      voc_feedback: {
        Row: {
          id: string
          customer: string
          sentiment: 'positive' | 'neutral' | 'negative'
          score: number
          category: string
          feedback: string
          source: string
          impact: 'high' | 'medium' | 'low'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer: string
          sentiment: 'positive' | 'neutral' | 'negative'
          score: number
          category: string
          feedback: string
          source: string
          impact: 'high' | 'medium' | 'low'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer?: string
          sentiment?: 'positive' | 'neutral' | 'negative'
          score?: number
          category?: string
          feedback?: string
          source?: string
          impact?: 'high' | 'medium' | 'low'
          created_at?: string
          updated_at?: string
        }
      }
      voe_feedback: {
        Row: {
          id: string
          employee: string
          department: string
          sentiment: 'positive' | 'neutral' | 'negative'
          engagement_score: number
          feedback: string
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employee: string
          department: string
          sentiment: 'positive' | 'neutral' | 'negative'
          engagement_score: number
          feedback: string
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employee?: string
          department?: string
          sentiment?: 'positive' | 'neutral' | 'negative'
          engagement_score?: number
          feedback?: string
          category?: string
          created_at?: string
          updated_at?: string
        }
      }
      surveys: {
        Row: {
          id: string
          title: string
          description: string
          status: 'draft' | 'active' | 'completed' | 'archived'
          type: 'customer' | 'employee' | 'product' | 'service'
          responses: number
          completion_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          status: 'draft' | 'active' | 'completed' | 'archived'
          type: 'customer' | 'employee' | 'product' | 'service'
          responses?: number
          completion_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: 'draft' | 'active' | 'completed' | 'archived'
          type?: 'customer' | 'employee' | 'product' | 'service'
          responses?: number
          completion_rate?: number
          created_at?: string
          updated_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          title: string
          message: string
          type: 'critical' | 'warning' | 'info'
          status: 'active' | 'acknowledged' | 'resolved'
          priority: 'high' | 'medium' | 'low'
          source: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          message: string
          type: 'critical' | 'warning' | 'info'
          status?: 'active' | 'acknowledged' | 'resolved'
          priority: 'high' | 'medium' | 'low'
          source: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          message?: string
          type?: 'critical' | 'warning' | 'info'
          status?: 'active' | 'acknowledged' | 'resolved'
          priority?: 'high' | 'medium' | 'low'
          source?: string
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          title: string
          description: string
          category: 'executive' | 'operational' | 'financial' | 'customer' | 'employee'
          status: 'draft' | 'published' | 'archived'
          author: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: 'executive' | 'operational' | 'financial' | 'customer' | 'employee'
          status?: 'draft' | 'published' | 'archived'
          author: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: 'executive' | 'operational' | 'financial' | 'customer' | 'employee'
          status?: 'draft' | 'published' | 'archived'
          author?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper functions for common database operations
export const dbHelpers = {
  // KPI operations
  async getKPIs() {
    const { data, error } = await supabase
      .from('kpis')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateKPI(id: string, updates: Database['public']['Tables']['kpis']['Update']) {
    const { data, error } = await supabase
      .from('kpis')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data
  },

  // VoC operations
  async getVoCFeedback(limit = 50) {
    const { data, error } = await supabase
      .from('voc_feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async createVoCFeedback(feedback: Database['public']['Tables']['voc_feedback']['Insert']) {
    const { data, error } = await supabase
      .from('voc_feedback')
      .insert(feedback)
      .select()
    
    if (error) throw error
    return data
  },

  // VoE operations
  async getVoEFeedback(limit = 50) {
    const { data, error } = await supabase
      .from('voe_feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async createVoEFeedback(feedback: Database['public']['Tables']['voe_feedback']['Insert']) {
    const { data, error } = await supabase
      .from('voe_feedback')
      .insert(feedback)
      .select()
    
    if (error) throw error
    return data
  },

  // Survey operations
  async getSurveys() {
    const { data, error } = await supabase
      .from('surveys')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createSurvey(survey: Database['public']['Tables']['surveys']['Insert']) {
    const { data, error } = await supabase
      .from('surveys')
      .insert(survey)
      .select()
    
    if (error) throw error
    return data
  },

  // Alert operations
  async getAlerts() {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createAlert(alert: Database['public']['Tables']['alerts']['Insert']) {
    const { data, error } = await supabase
      .from('alerts')
      .insert(alert)
      .select()
    
    if (error) throw error
    return data
  },

  async updateAlertStatus(id: string, status: 'active' | 'acknowledged' | 'resolved') {
    const { data, error } = await supabase
      .from('alerts')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data
  },

  // Report operations
  async getReports() {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createReport(report: Database['public']['Tables']['reports']['Insert']) {
    const { data, error } = await supabase
      .from('reports')
      .insert(report)
      .select()
    
    if (error) throw error
    return data
  },

  // User operations
  async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async createUser(user: Database['public']['Tables']['users']['Insert']) {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
    
    if (error) throw error
    return data
  },

  async updateUser(id: string, updates: Database['public']['Tables']['users']['Update']) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data
  }
}

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to KPI changes
  subscribeToKPIs(callback: (payload: any) => void) {
    return supabase
      .channel('kpis')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'kpis' }, callback)
      .subscribe()
  },

  // Subscribe to new alerts
  subscribeToAlerts(callback: (payload: any) => void) {
    return supabase
      .channel('alerts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'alerts' }, callback)
      .subscribe()
  },

  // Subscribe to VoC feedback
  subscribeToVoCFeedback(callback: (payload: any) => void) {
    return supabase
      .channel('voc_feedback')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'voc_feedback' }, callback)
      .subscribe()
  },

  // Subscribe to VoE feedback
  subscribeToVoEFeedback(callback: (payload: any) => void) {
    return supabase
      .channel('voe_feedback')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'voe_feedback' }, callback)
      .subscribe()
  }
}