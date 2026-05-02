import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  BellDot,
  CalendarClock,
  ChartNoAxesCombined,
  CircleCheckBig,
  ListTodo,
  Sparkles,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from '../components/DashboardCard.jsx'
import GlassCard from '../components/GlassCard.jsx'
import ProgressChart from '../components/ProgressChart.jsx'
import SubjectBadge from '../components/SubjectBadge.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useStats } from '../hooks/useStats.js'
import { useTypewriter } from '../hooks/useTypewriter.js'

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { stats } = useStats()
  const typed = useTypewriter(`Good Morning, ${user?.name || 'Student'} ✨`, 35)

  const summary = stats?.summary || { totalTasks: 0, pendingTasks: 0, completedTasks: 0, dueToday: 0 }
  const todayString = new Date().toISOString().slice(0, 10)

  return (
    <section className="space-y-5">
      <GlassCard className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
              <Sparkles size={13} /> Today&apos;s Overview
            </p>
            <h1 className="text-3xl font-extrabold leading-tight pb-1 md:text-5xl text-gradient">{typed}</h1>
          </div>
          <p className="text-sm text-slate-300">Stay sharp. Stay consistent. Own your study streak.</p>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          label="Total Tasks"
          value={summary.totalTasks}
          icon={ListTodo}
          glow="bg-violet-500/60 shadow-[0_0_22px_rgba(124,58,237,0.55)]"
          onClick={() => navigate('/tasks')}
        />
        <DashboardCard
          label="Pending Tasks"
          value={summary.pendingTasks}
          icon={BellDot}
          glow="bg-cyan-500/60 shadow-[0_0_22px_rgba(34,211,238,0.55)]"
          onClick={() => navigate('/tasks?status=pending')}
        />
        <DashboardCard
          label="Completed"
          value={summary.completedTasks}
          icon={CircleCheckBig}
          glow="bg-emerald-500/60 shadow-[0_0_22px_rgba(16,185,129,0.55)]"
          onClick={() => navigate('/tasks?status=completed')}
        />
        <DashboardCard
          label="Due Today"
          value={summary.dueToday}
          icon={CalendarClock}
          glow="bg-amber-500/60 shadow-[0_0_22px_rgba(245,158,11,0.55)]"
          onClick={() => navigate(`/tasks?dueDate=${todayString}`)}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <GlassCard className="col-span-2 p-5">
          <h3 className="mb-4 inline-flex items-center gap-2 text-lg font-bold text-white">
            <ChartNoAxesCombined size={18} className="text-cyan-300" /> Weekly Study Curve
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.weeklyStudyData || []}>
                <defs>
                  <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.18)" />
                <XAxis dataKey="day" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(148,163,184,.3)', borderRadius: 12 }}
                  labelStyle={{ color: '#f8fafc' }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#22D3EE"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#studyGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <ProgressChart data={stats?.weeklyHoursPerSubject || []} />
      </div>

      <GlassCard className="p-5">
        <h3 className="mb-4 text-lg font-bold text-white">Today&apos;s Timetable</h3>
        <div className="scrollbar-thin flex gap-3 overflow-x-auto pb-1">
          {(stats?.todaysClasses || []).length ? (
            stats.todaysClasses.map((slot) => (
              <div
                key={slot.id}
                className="min-w-[220px] rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
              >
                <SubjectBadge subject={slot.subject} />
                <p className="mt-3 text-sm text-slate-300">
                  {slot.startTime} - {slot.endTime}
                </p>
                <p className="text-sm text-cyan-200">{slot.location}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-300">No classes scheduled today.</p>
          )}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <h3 className="mb-4 text-lg font-bold text-white">Upcoming Tasks</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {(stats?.upcomingTasks || []).map((task) => (
            <div key={task.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    task.priority === 'high'
                      ? 'bg-red-400'
                      : task.priority === 'medium'
                        ? 'bg-amber-300'
                        : 'bg-emerald-400'
                  }`}
                />
                <span className="text-xs uppercase tracking-wider text-slate-300">{task.priority}</span>
              </div>
              <p className="font-semibold text-white">{task.title}</p>
              <p className="text-xs text-slate-400">Due {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  )
}

export default Dashboard
