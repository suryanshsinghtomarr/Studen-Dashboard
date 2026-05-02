const parseTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export const computeWeeklyHours = (slots = []) => {
  const subjectMinutes = {}

  for (const slot of slots) {
    const minutes = Math.max(parseTime(slot.endTime) - parseTime(slot.startTime), 0)
    subjectMinutes[slot.subject] = (subjectMinutes[slot.subject] || 0) + minutes
  }

  return Object.entries(subjectMinutes).map(([subject, minutes]) => ({
    subject,
    hours: Number((minutes / 60).toFixed(2)),
  }))
}

export const completionRatePerSubject = (tasks = []) => {
  const grouped = {}

  for (const task of tasks) {
    const isDone = task.status ? task.status === 'done' : task.isCompleted

    if (!grouped[task.subject]) {
      grouped[task.subject] = { total: 0, completed: 0 }
    }

    grouped[task.subject].total += 1

    if (isDone) {
      grouped[task.subject].completed += 1
    }
  }

  return Object.entries(grouped).map(([subject, value]) => ({
    subject,
    total: value.total,
    completed: value.completed,
    completionRate: value.total ? Math.round((value.completed / value.total) * 100) : 0,
  }))
}
