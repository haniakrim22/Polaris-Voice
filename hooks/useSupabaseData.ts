'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  dashboardService, 
  vocService, 
  voeService, 
  surveyService, 
  alertService, 
  reportService,
  realtimeService
} from '@/lib/data-service'

// Generic hook for data fetching with loading and error states
export function useSupabaseData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// Dashboard data hook
export function useDashboardData() {
  return useSupabaseData(() => dashboardService.getDashboardData())
}

// KPI trends hook
export function useKPITrends(timeRange: '7d' | '30d' | '90d' = '30d') {
  return useSupabaseData(
    () => dashboardService.getKPITrends(timeRange),
    [timeRange]
  )
}

// VoC hooks
export function useVoCFeedback(filters?: {
  sentiment?: string
  timeRange?: string
  limit?: number
}) {
  return useSupabaseData(
    () => vocService.getFeedback(filters),
    [filters?.sentiment, filters?.timeRange, filters?.limit]
  )
}

export function useVoCSentimentTrends(timeRange: '7d' | '30d' | '90d' = '30d') {
  return useSupabaseData(
    () => vocService.getSentimentTrends(timeRange),
    [timeRange]
  )
}

export function useVoCCategoryBreakdown() {
  return useSupabaseData(() => vocService.getCategoryBreakdown())
}

// VoE hooks
export function useVoEFeedback(filters?: {
  department?: string
  sentiment?: string
  timeRange?: string
  limit?: number
}) {
  return useSupabaseData(
    () => voeService.getFeedback(filters),
    [filters?.department, filters?.sentiment, filters?.timeRange, filters?.limit]
  )
}

export function useVoEDepartmentAnalytics() {
  return useSupabaseData(() => voeService.getDepartmentAnalytics())
}

// Survey hooks
export function useSurveys(filters?: { status?: string; type?: string }) {
  return useSupabaseData(
    () => surveyService.getSurveys(filters),
    [filters?.status, filters?.type]
  )
}

export function useSurveyAnalytics() {
  return useSupabaseData(() => surveyService.getSurveyAnalytics())
}

// Alert hooks
export function useAlerts(filters?: {
  type?: string
  status?: string
  priority?: string
}) {
  return useSupabaseData(
    () => alertService.getAlerts(filters),
    [filters?.type, filters?.status, filters?.priority]
  )
}

export function useAlertTrends(days: number = 7) {
  return useSupabaseData(
    () => alertService.getAlertTrends(days),
    [days]
  )
}

// Report hooks
export function useReports(filters?: {
  category?: string
  status?: string
  search?: string
}) {
  return useSupabaseData(
    () => reportService.getReports(filters),
    [filters?.category, filters?.status, filters?.search]
  )
}

export function useReportAnalytics() {
  return useSupabaseData(() => reportService.getReportAnalytics())
}

// Real-time hooks
export function useRealtimeAlerts() {
  const [alerts, setAlerts] = useState<any[]>([])
  const [newAlert, setNewAlert] = useState<any>(null)

  useEffect(() => {
    const subscription = realtimeService.subscribeToAlerts((alert) => {
      setNewAlert(alert)
      setAlerts(prev => [alert, ...prev])
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { alerts, newAlert }
}

export function useRealtimeKPIs() {
  const [updatedKPI, setUpdatedKPI] = useState<any>(null)

  useEffect(() => {
    const subscription = realtimeService.subscribeToKPIUpdates((kpi) => {
      setUpdatedKPI(kpi)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { updatedKPI }
}

export function useRealtimeFeedback() {
  const [newFeedback, setNewFeedback] = useState<any>(null)

  useEffect(() => {
    const subscription = realtimeService.subscribeToNewFeedback((feedback) => {
      setNewFeedback(feedback)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { newFeedback }
}

// Mutation hooks for data updates
export function useAlertMutation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateAlertStatus = async (id: string, status: 'active' | 'acknowledged' | 'resolved') => {
    try {
      setLoading(true)
      setError(null)
      await alertService.updateAlertStatus(id, status)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update alert')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { updateAlertStatus, loading, error }
}

// Custom hook for paginated data
export function usePaginatedData<T>(
  fetchFunction: (page: number, limit: number) => Promise<T[]>,
  initialLimit: number = 20
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [limit] = useState(initialLimit)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    try {
      setLoading(true)
      setError(null)
      const newData = await fetchFunction(page, limit)
      
      if (newData.length < limit) {
        setHasMore(false)
      }
      
      setData(prev => page === 1 ? newData : [...prev, ...newData])
      setPage(prev => prev + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [fetchFunction, page, limit, loading, hasMore])

  const reset = useCallback(() => {
    setData([])
    setPage(1)
    setHasMore(true)
    setError(null)
  }, [])

  useEffect(() => {
    loadMore()
  }, [])

  return { data, loading, error, loadMore, hasMore, reset }
}

// Hook for search functionality
export function useSearch<T>(
  searchFunction: (query: string) => Promise<T[]>,
  debounceMs: number = 300
) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true)
        setError(null)
        const searchResults = await searchFunction(query)
        setResults(searchResults)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
      } finally {
        setLoading(false)
      }
    }, debounceMs)

    return () => clearTimeout(timeoutId)
  }, [query, searchFunction, debounceMs])

  return { query, setQuery, results, loading, error }
}

// Hook for optimistic updates
export function useOptimisticUpdate<T>(
  initialData: T[],
  updateFunction: (id: string, updates: Partial<T>) => Promise<T>
) {
  const [data, setData] = useState<T[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateItem = async (id: string, updates: Partial<T>) => {
    // Optimistic update
    setData(prev => prev.map(item => 
      (item as any).id === id ? { ...item, ...updates } : item
    ))

    try {
      setLoading(true)
      setError(null)
      const updatedItem = await updateFunction(id, updates)
      
      // Update with server response
      setData(prev => prev.map(item => 
        (item as any).id === id ? updatedItem : item
      ))
    } catch (err) {
      // Revert optimistic update on error
      setData(prev => prev.map(item => 
        (item as any).id === id ? { ...item, ...Object.keys(updates).reduce((acc, key) => {
          delete (acc as any)[key]
          return acc
        }, { ...item }) } : item
      ))
      setError(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  return { data, updateItem, loading, error }
}