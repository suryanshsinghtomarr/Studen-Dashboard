export const subjectPalette = {
  Mathematics: 'from-violet-500 to-indigo-500',
  Physics: 'from-cyan-500 to-blue-500',
  Chemistry: 'from-emerald-500 to-teal-500',
  Biology: 'from-pink-500 to-fuchsia-500',
  English: 'from-amber-500 to-orange-500',
  History: 'from-rose-500 to-red-500',
}

export const mockTimetable = [
  {
    id: 's1',
    subject: 'Mathematics',
    day: 'Mon',
    startTime: '08:00',
    endTime: '09:30',
    location: 'Room A-12',
    color: '#7C3AED',
  },
  {
    id: 's2',
    subject: 'Physics',
    day: 'Tue',
    startTime: '10:00',
    endTime: '11:00',
    location: 'Lab 3',
    color: '#22D3EE',
  },
  {
    id: 's3',
    subject: 'English',
    day: 'Wed',
    startTime: '13:00',
    endTime: '14:00',
    location: 'Hall 2',
    color: '#F59E0B',
  },
  {
    id: 's4',
    subject: 'Chemistry',
    day: 'Thu',
    startTime: '09:00',
    endTime: '10:30',
    location: 'Lab 1',
    color: '#10B981',
  },
  {
    id: 's5',
    subject: 'Biology',
    day: 'Fri',
    startTime: '15:00',
    endTime: '16:00',
    location: 'Room C-07',
    color: '#EC4899',
  },
]

export const mockGoals = [
  {
    id: 'g1',
    subject: 'Mathematics',
    targetHours: 20,
    loggedSessions: [2, 1.5, 3],
  },
  {
    id: 'g2',
    subject: 'Physics',
    targetHours: 16,
    loggedSessions: [2.5, 2],
  },
  {
    id: 'g3',
    subject: 'Chemistry',
    targetHours: 12,
    loggedSessions: [4, 3, 2, 3],
  },
]

export const mockTasks = [
  {
    id: 't1',
    title: 'Solve 25 calculus problems',
    subject: 'Mathematics',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    priority: 'high',
    status: 'todo',
    isCompleted: false,
  },
  {
    id: 't2',
    title: 'Prepare optics notes',
    subject: 'Physics',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    priority: 'medium',
    status: 'in-progress',
    isCompleted: false,
  },
  {
    id: 't3',
    title: 'Revise periodic trends',
    subject: 'Chemistry',
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    priority: 'high',
    status: 'done',
    isCompleted: true,
  },
]

export const weeklyStudyData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.2 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 4.1 },
  { day: 'Fri', hours: 3.6 },
  { day: 'Sat', hours: 2.9 },
  { day: 'Sun', hours: 1.7 },
]
