import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Service {
  id: string
  category_id: string
  name: string
  description: string
  price: number
  duration_minutes: number
  is_active: boolean
  image_url: string | null
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setServices(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }

  return { services, loading, error, refetch: fetchServices }
}
