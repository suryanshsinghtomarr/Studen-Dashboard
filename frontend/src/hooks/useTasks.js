import { useMemo } from 'react'
import { usePlanner } from '../context/PlannerContext.jsx'

export const useTasks = (filters) => {
  const { tasks, createTask, updateTask, deleteTask } = usePlanner()

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSubject = !filters?.subject || task.subject === filters.subject
      const matchesStatus =
        !filters?.status ||
        (filters.status === 'completed' && task.isCompleted) ||
        (filters.status === 'pending' && !task.isCompleted)
      const matchesDueDate =
        !filters?.dueDate ||
        new Date(task.dueDate).toDateString() === new Date(filters.dueDate).toDateString()

      return matchesSubject && matchesStatus && matchesDueDate
    })
  }, [tasks, filters])

  return {
    tasks: filteredTasks,
    loading: false,
    error: '',
    fetchTasks: () => {},
    createTask,
    updateTask,
    deleteTask,
  }
}
