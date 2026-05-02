import {
  CalendarDays,
  CheckSquare,
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  LogOut,
  Target,
  X,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import GlassCard from './GlassCard.jsx'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/timetable', label: 'Timetable', icon: CalendarDays },
  { to: '/goals', label: 'Goals', icon: Target },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
]

function Sidebar({ user, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/login')
  }

  const handleLogin = () => {
    setMobileOpen(false)
    navigate('/login')
  }

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-[#020617]/70 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu backdrop"
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen p-4 transition-transform duration-300 md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <GlassCard
          className={`relative flex h-full flex-col overflow-hidden bg-[#0f172a]/80 p-4 transition-all duration-300 ${
            collapsed ? 'w-[92px]' : 'w-[270px]'
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            {!collapsed ? (
              <div>
                <p className="text-sm text-cyan-300">Student Planner</p>
                <h2 className="text-xl font-extrabold tracking-tight">FocusFlow</h2>
              </div>
            ) : null}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                className="hidden rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:scale-105 hover:bg-white/10 md:block"
              >
                {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 md:hidden"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                        isActive
                          ? 'bg-gradient-to-r from-violet-600/80 to-indigo-500/80 text-white shadow-[0_0_20px_rgba(124,58,237,0.45)]'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                      {!collapsed ? <span className="font-medium">{item.label}</span> : null}
                      {isActive ? <span className="absolute left-0 h-7 w-1 rounded-r bg-violet-300" /> : null}
                    </motion.div>
                  )}
                </NavLink>
              )
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-white/10 p-3 shadow-[0_10px_30px_rgba(8,15,32,0.35)]">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold text-slate-950 shadow-[0_0_18px_rgba(99,102,241,0.45)]">
                {(user?.name || 'S').slice(0, 1).toUpperCase()}
              </div>
              {!collapsed ? (
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">Student workspace</p>
                </div>
              ) : null}
            </div>

            {!collapsed ? (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Signed in
              </div>
            ) : null}

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/35 bg-violet-500/10 px-3 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/20 hover:text-white ${
                  collapsed ? 'px-2' : ''
                }`}
                title="Logout"
              >
                <LogOut size={16} />
                {!collapsed ? <span>Logout</span> : null}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLogin}
                className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/35 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20 ${
                  collapsed ? 'px-2' : ''
                }`}
                title="Login"
              >
                <LogOut size={16} />
                {!collapsed ? <span>Login</span> : null}
              </button>
            )}
          </div>
        </GlassCard>
      </aside>
    </>
  )
}

export default Sidebar
