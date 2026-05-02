function TaskFilter({ filters, subjects, onChange }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <select
        value={filters.subject}
        onChange={(event) => onChange('subject', event.target.value)}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
      >
        <option value="" className="bg-slate-900">All Subjects</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject} className="bg-slate-900">
            {subject}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={filters.dueDate}
        onChange={(event) => onChange('dueDate', event.target.value)}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
      />

      <select
        value={filters.status}
        onChange={(event) => onChange('status', event.target.value)}
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
      >
        <option value="" className="bg-slate-900">All Status</option>
        <option value="pending" className="bg-slate-900">Pending</option>
        <option value="completed" className="bg-slate-900">Completed</option>
      </select>
    </div>
  )
}

export default TaskFilter
