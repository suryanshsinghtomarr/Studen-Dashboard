import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const labels = {
  dashboard: 'Dashboard',
  timetable: 'Timetable',
  goals: 'Goals',
  tasks: 'Tasks',
}

function Topbar({ user, onOpenMobileMenu }) {
  const location = useLocation()
  const segment = location.pathname.split('/').filter(Boolean).at(-1) || 'dashboard'
  const current = labels[segment] || 'Dashboard'

  return (
    <header className="sticky top-0 z-20 px-3 pt-4 md:px-6">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0f172a]/70 px-3 py-3 backdrop-blur-xl md:px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-100 md:hidden"
            onClick={onOpenMobileMenu}
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Planner / {current}</p>
            <h2 className="text-lg font-extrabold text-white md:text-xl">{current}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 md:flex">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-bold text-slate-900">
              {(user?.name || 'S')[0]?.toUpperCase()}
            </div>
            <span className="text-sm text-slate-200">{user?.name || 'Student'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
