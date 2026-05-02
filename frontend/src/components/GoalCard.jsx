import ProgressBar from './ProgressBar.jsx'

function GoalCard({ goal, onLogSession }) {
  const progress = goal.targetHours
    ? (goal.loggedHours / goal.targetHours) * 100
    : 0

  const handleLog = () => {
    const value = window.prompt('Enter study hours (e.g. 1.5):', '1')

    if (!value) {
      return
    }

    const durationHours = Number(value)
    if (Number.isNaN(durationHours) || durationHours <= 0) {
      return
    }

    onLogSession(goal._id, durationHours)
  }

  return (
    <article className="goal-card">
      <div className="goal-header">
        <h3>{goal.subject}</h3>
        <span>
          {goal.loggedHours.toFixed(1)}h / {goal.targetHours}h
        </span>
      </div>
      <ProgressBar value={progress} />
      <button type="button" onClick={handleLog}>
        Log Session
      </button>
    </article>
  )
}

export default GoalCard
