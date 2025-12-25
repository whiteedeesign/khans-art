import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Master {
  id: string
  name: string
  specialization: string
  experience_years: number
  photo_url: string | null
  bio: string | null
  is_active: boolean
  rating: number
}

export function useMasters() {
  const [masters, setMasters] = useState<Master[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMasters()
  }, [])

  async function fetchMasters() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('masters')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      setMasters(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }

  return { masters, loading, error, refetch: fetchMasters }
}
