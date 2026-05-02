function ProgressBar({ value }) {
  const safeValue = Math.max(0, Math.min(100, value))

  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${safeValue}%` }} />
    </div>
  )
}

export default ProgressBar
