import { CalendarClock, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import SubjectBadge from './SubjectBadge.jsx'

const priorityDot = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-emerald-400',
}

function TaskItem({ task, onToggleComplete, onDelete, onMoveStatus }) {
  const overdue = !task.isCompleted && new Date(task.dueDate) < new Date()

  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      className={`rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md ${
        overdue ? 'border-red-400/50 shadow-[0_0_25px_rgba(239,68,68,0.35)]' : ''
      } ${task.isCompleted ? 'opacity-60' : ''}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="space-y-2">
          <SubjectBadge subject={task.subject} />
          <h4 className={`font-semibold text-white ${task.isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </h4>
        </div>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg border border-red-400/40 bg-red-500/10 p-2 text-red-300 transition hover:scale-105"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-slate-900/60 px-2 py-1 text-xs text-slate-300">
          <CalendarClock size={13} />
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-slate-300">
          <span className={`h-2.5 w-2.5 rounded-full ${priorityDot[task.priority] || 'bg-emerald-400'}`} />
          {task.priority}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onToggleComplete(task, !task.isCompleted)}
          className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 px-3 py-1.5 text-xs font-semibold text-white"
        >
          {task.isCompleted ? 'Mark Pending' : 'Mark Done'}
        </button>
        {onMoveStatus ? (
          <>
            <button
              type="button"
              onClick={() => onMoveStatus(task.id, 'todo')}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-slate-200"
            >
              To Do
            </button>
            <button
              type="button"
              onClick={() => onMoveStatus(task.id, 'in-progress')}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-slate-200"
            >
              In Progress
            </button>
            <button
              type="button"
              onClick={() => onMoveStatus(task.id, 'done')}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-slate-200"
            >
              Done
            </button>
          </>
        ) : null}
      </div>
    </motion.article>
  )
}

export default TaskItem
