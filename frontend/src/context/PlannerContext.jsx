import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { subjectPalette } from '../data/mockData.js'
import { useAuth } from './AuthContext.jsx'

const PlannerContext = createContext(null)
const PLANNER_DATA_KEY = 'planner_data_by_user'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const getLoggedHours = (goal) =>
  goal.loggedSessions.reduce((total, value) => total + Number(value), 0)

const emptyPlannerData = () => ({
  timetableSlots: [],
  goals: [],
  tasks: [],
})

const getStoredPlannerMap = () => {
  const raw = localStorage.getItem(PLANNER_DATA_KEY)
  return raw ? JSON.parse(raw) : {}
}

const getPlannerDataForUser = (userId) => {
  if (!userId) {
    return emptyPlannerData()
  }

  const plannerMap = getStoredPlannerMap()
  return plannerMap[userId] || emptyPlannerData()
}

const persistPlannerDataForUser = (userId, data) => {
  if (!userId) {
    return
  }

  const plannerMap = getStoredPlannerMap()
  plannerMap[userId] = data
  localStorage.setItem(PLANNER_DATA_KEY, JSON.stringify(plannerMap))
}

export function PlannerProvider({ children }) {
  const { user } = useAuth()
  const [timetableSlots, setTimetableSlots] = useState([])
  const [goals, setGoals] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const userData = getPlannerDataForUser(user?.id)
    setTimetableSlots(userData.timetableSlots)
    setGoals(userData.goals)
    setTasks(userData.tasks)
  }, [user?.id])

  useEffect(() => {
    persistPlannerDataForUser(user?.id, {
      timetableSlots,
      goals,
      tasks,
    })
  }, [user?.id, timetableSlots, goals, tasks])

  const addSlot = (slot) => {
    const next = { id: crypto.randomUUID(), ...slot }
    setTimetableSlots((prev) => [...prev, next])
  }

  const updateSlot = (slotId, updates) => {
    setTimetableSlots((prev) =>
      prev.map((slot) => (slot.id === slotId ? { ...slot, ...updates } : slot)),
    )
  }

  const deleteSlot = (slotId) => {
    setTimetableSlots((prev) => prev.filter((slot) => slot.id !== slotId))
  }

  const addGoal = (subject, targetHours) => {
    setGoals((prev) => [
      {
        id: crypto.randomUUID(),
        subject,
        targetHours: Number(targetHours),
        loggedSessions: [],
      },
      ...prev,
    ])
  }

  const logGoalSession = (goalId, hours) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? { ...goal, loggedSessions: [...goal.loggedSessions, Number(hours)] }
          : goal,
      ),
    )
  }

  const createTask = (task) => {
    const next = {
      id: crypto.randomUUID(),
      isCompleted: false,
      status: 'todo',
      ...task,
    }

    setTasks((prev) => [next, ...prev])
    return next
  }

  const updateTask = (taskId, updates) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        const nextTask = { ...task, ...updates }

        if (typeof updates.isCompleted === 'boolean') {
          nextTask.status = updates.isCompleted ? 'done' : task.status === 'done' ? 'todo' : task.status
        }

        if (updates.status) {
          nextTask.isCompleted = updates.status === 'done'
        }

        return nextTask
      }),
    )
  }

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const stats = useMemo(() => {
    const completionMap = tasks.reduce((acc, task) => {
      if (!acc[task.subject]) {
        acc[task.subject] = { total: 0, completed: 0 }
      }

      acc[task.subject].total += 1
      if (task.isCompleted) {
        acc[task.subject].completed += 1
      }
      return acc
    }, {})

    const completionPerSubject = Object.entries(completionMap).map(([subject, value]) => ({
      subject,
      completionRate: value.total ? Math.round((value.completed / value.total) * 100) : 0,
    }))

    const hourMap = timetableSlots.reduce((acc, slot) => {
      const duration = Math.max(toMinutes(slot.endTime) - toMinutes(slot.startTime), 0) / 60
      acc[slot.subject] = (acc[slot.subject] || 0) + duration
      return acc
    }, {})

    const weeklyHoursPerSubject = Object.entries(hourMap).map(([subject, hours]) => ({
      subject,
      hours: Number(hours.toFixed(1)),
    }))

    const dayHoursMap = timetableSlots.reduce((acc, slot) => {
      const duration = Math.max(toMinutes(slot.endTime) - toMinutes(slot.startTime), 0) / 60
      acc[slot.day] = (acc[slot.day] || 0) + duration
      return acc
    }, {})

    const weeklyStudyData = timetableSlots.length
      ? weekDays.map((day) => ({
          day,
          hours: Number((dayHoursMap[day] || 0).toFixed(2)),
        }))
      : []

    const today = new Date()
    const todayLabel = weekDays[today.getDay()]

    const todaysClasses = timetableSlots.filter((slot) => slot.day === todayLabel)

    const dueToday = tasks.filter((task) => {
      const due = new Date(task.dueDate)
      return due.toDateString() === today.toDateString()
    })

    const upcomingTasks = tasks
      .filter((task) => !task.isCompleted)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5)

    return {
      weeklyStudyData,
      weeklyHoursPerSubject,
      completionPerSubject,
      todaysClasses,
      upcomingTasks,
      summary: {
        totalTasks: tasks.length,
        pendingTasks: tasks.filter((task) => !task.isCompleted).length,
        completedTasks: tasks.filter((task) => task.isCompleted).length,
        dueToday: dueToday.length,
      },
    }
  }, [tasks, timetableSlots])

  const value = useMemo(
    () => ({
      subjectPalette,
      timetableSlots,
      goals: goals.map((goal) => ({ ...goal, loggedHours: getLoggedHours(goal) })),
      tasks,
      addSlot,
      updateSlot,
      deleteSlot,
      addGoal,
      logGoalSession,
      createTask,
      updateTask,
      deleteTask,
      stats,
    }),
    [goals, tasks, timetableSlots, stats],
  )

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
}

export const usePlanner = () => {
  const context = useContext(PlannerContext)

  if (!context) {
    throw new Error('usePlanner must be used within PlannerProvider')
  }

  return context
}
