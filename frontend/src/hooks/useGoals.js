import { useCallback, useEffect, useState } from 'react'
import api from '../api/axios.js'

export const useGoals = () => {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchGoals = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const { data } = await api.get('/goals')
      setGoals(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load goals')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGoals()
  }, [fetchGoals])

  const createGoal = async (payload) => {
    const { data } = await api.post('/goals', payload)
    setGoals((prev) => [data, ...prev])
    return data
  }

  const logSession = async (goalId, payload) => {
    const { data } = await api.post(`/goals/${goalId}/log`, payload)
    setGoals((prev) => prev.map((goal) => (goal._id === goalId ? data : goal)))
    return data
  }

  return {
    goals,
    loading,
    error,
    fetchGoals,
    createGoal,
    logSession,
  }
}
