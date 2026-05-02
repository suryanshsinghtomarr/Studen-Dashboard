import { ArrowUpRight } from 'lucide-react'
import GlassCard from './GlassCard.jsx'

function DashboardCard({ label, value, icon: Icon, glow, onClick }) {
  const interactiveClasses = onClick
    ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
    : ''

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full bg-transparent p-0 text-left ${interactiveClasses}`}
      disabled={!onClick}
    >
      <GlassCard className="group p-4 transition hover:scale-[1.02]">
        <div className="mb-3 flex items-center justify-between">
          <div className={`grid h-10 w-10 place-items-center rounded-xl ${glow}`}>
            <Icon size={18} className="text-white" />
          </div>
          <ArrowUpRight size={17} className="text-emerald-300" />
        </div>
        <p className="text-sm text-slate-300">{label}</p>
        <p className="mt-1 text-3xl font-extrabold text-white">{value}</p>
      </GlassCard>
    </button>
  )
}

export default DashboardCard
