import { useEffect, useState } from 'react'

const initialState = {
  subject: '',
  day: 'Mon',
  startTime: '09:00',
  endTime: '10:00',
  color: '#2563eb',
}

function SlotModal({ isOpen, initialData, onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (initialData) {
      setFormData({
        subject: initialData.subject,
        day: initialData.day,
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        color: initialData.color || '#2563eb',
      })
    } else {
      setFormData(initialState)
    }
  }, [initialData])

  if (!isOpen) {
    return null
  }

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="modal-overlay" role="presentation">
      <section className="modal-card">
        <h2>{initialData ? 'Edit Slot' : 'Add Slot'}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />
          <select name="day" value={formData.day} onChange={handleChange}>
            <option value="Mon">Mon</option>
            <option value="Tue">Tue</option>
            <option value="Wed">Wed</option>
            <option value="Thu">Thu</option>
            <option value="Fri">Fri</option>
            <option value="Sat">Sat</option>
            <option value="Sun">Sun</option>
          </select>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default SlotModal
