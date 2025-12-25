import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Booking {
  id: string
  client_name: string
  client_phone: string
  client_email: string | null
  service_id: string
  master_id: string
  booking_date: string
  booking_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes: string | null
  created_at: string
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  async function fetchBookings() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: true })

      if (error) throw error
      setBookings(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки')
    } finally {
      setLoading(false)
    }
  }

  async function createBooking(booking: Omit<Booking, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single()

    if (error) throw error
    setBookings([...bookings, data])
    return data
  }

  return { bookings, loading, error, refetch: fetchBookings, createBooking }
}
