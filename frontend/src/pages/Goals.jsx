import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import GlassCard from '../components/GlassCard.jsx'
import GlowButton from '../components/GlowButton.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import SubjectBadge from '../components/SubjectBadge.jsx'
import { usePlanner } from '../context/PlannerContext.jsx'

function Goals() {
  const { goals, addGoal, logGoalSession } = usePlanner()
  const [subject, setSubject] = useState('')
  const [targetHours, setTargetHours] = useState('')

  const handleCreateGoal = (event) => {
    event.preventDefault()

    addGoal(subject, Number(targetHours))
    setSubject('')
    setTargetHours('')
  }

  const handleLogSession = (goalId) => {
    const value = window.prompt('Log session hours', '1.5')
    if (!value) {
      return
    }

    const parsed = Number(value)
    if (Number.isNaN(parsed) || parsed <= 0) {
      return
    }

    logGoalSession(goalId, parsed)
  }

  return (
    <section className="space-y-5">
      <GlassCard className="p-6">
        <h1 className="mb-4 text-3xl font-extrabold text-white">Study Goals</h1>
        <form className="grid gap-3 md:grid-cols-[1fr_220px_auto]" onSubmit={handleCreateGoal}>
          <input
            placeholder="Subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-slate-100"
            required
          />
          <input
            type="number"
            min="1"
            step="0.5"
            placeholder="Target Hours"
            value={targetHours}
            onChange={(event) => setTargetHours(event.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-slate-100"
            required
          />
          <GlowButton type="submit" className="ripple-btn">Add Goal</GlowButton>
        </form>
      </GlassCard>

      <div className="grid gap-4 lg:grid-cols-2">
        {goals.map((goal) => {
          const progress = goal.targetHours
            ? (goal.loggedHours / goal.targetHours) * 100
            : 0
          const completed = progress >= 100

          return (
            <GlassCard key={goal.id} className="relative p-5">
              {completed ? (
                <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/25 px-2 py-1 text-xs font-semibold text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,.5)]">
                  <CheckCircle2 size={14} /> Complete
                </span>
              ) : null}

              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-white">{goal.subject}</h3>
                <SubjectBadge subject={goal.subject} />
              </div>

              <div className="mb-4 flex items-center gap-4">
                <ProgressRing value={progress} />
                <div>
                  <p className="text-sm text-slate-300">Logged Hours</p>
                  <p className="text-2xl font-extrabold text-white">{goal.loggedHours.toFixed(1)}h</p>
                  <p className="text-sm text-slate-400">of {goal.targetHours}h target</p>
                </div>
              </div>

              <GlowButton
                type="button"
                className="ripple-btn w-full"
                onClick={() => handleLogSession(goal.id)}
              >
                Log Session
              </GlowButton>
            </GlassCard>
          )
        })}
      </div>
    </section>
  )
}

export default Goals
