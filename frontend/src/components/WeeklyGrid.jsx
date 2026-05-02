const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function WeeklyGrid({ slots, onEdit, onDelete }) {
  return (
    <section className="weekly-grid">
      {weekDays.map((day) => {
        const daySlots = slots
          .filter((slot) => slot.day === day)
          .sort((a, b) => a.startTime.localeCompare(b.startTime))

        return (
          <div key={day} className="day-column">
            <h3>{day}</h3>
            {daySlots.length === 0 ? (
              <p className="muted-text">No slots</p>
            ) : (
              daySlots.map((slot) => (
                <article
                  key={slot._id}
                  className="slot-card"
                  style={{ borderLeftColor: slot.color }}
                >
                  <strong>{slot.subject}</strong>
                  <p>
                    {slot.startTime} - {slot.endTime}
                  </p>
                  <div className="slot-actions">
                    <button type="button" onClick={() => onEdit(slot)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => onDelete(slot._id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        )
      })}
    </section>
  )
}

export default WeeklyGrid
