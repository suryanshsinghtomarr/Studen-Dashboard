import { usePlanner } from '../context/PlannerContext.jsx'

export const useStats = () => {
  const { stats } = usePlanner()

  return {
    stats,
    loading: false,
    error: '',
    fetchStats: () => {},
  }
}
