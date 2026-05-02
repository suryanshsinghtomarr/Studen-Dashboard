import { useCallback, useEffect, useState } from 'react'
import api from '../api/axios.js'

export const useTimetable = () => {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchSlots = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const { data } = await api.get('/timetable')
      setSlots(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load timetable')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSlots()
  }, [fetchSlots])

  const createSlot = async (payload) => {
    const { data } = await api.post('/timetable', payload)
    setSlots((prev) => [...prev, data])
    return data
  }

  const updateSlot = async (id, payload) => {
    const { data } = await api.put(`/timetable/${id}`, payload)
    setSlots((prev) => prev.map((slot) => (slot._id === id ? data : slot)))
    return data
  }

  const deleteSlot = async (id) => {
    await api.delete(`/timetable/${id}`)
    setSlots((prev) => prev.filter((slot) => slot._id !== id))
  }

  return {
    slots,
    loading,
    error,
    fetchSlots,
    createSlot,
    updateSlot,
    deleteSlot,
  }
}
