import { Edit3, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import GlassCard from '../components/GlassCard.jsx'
import GlowButton from '../components/GlowButton.jsx'
import Modal from '../components/Modal.jsx'
import SubjectBadge from '../components/SubjectBadge.jsx'
import { usePlanner } from '../context/PlannerContext.jsx'

function Timetable() {
  const { timetableSlots, addSlot, updateSlot, deleteSlot } = usePlanner()
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    subject: '',
    day: 'Mon',
    startTime: '08:00',
    endTime: '09:00',
    location: '',
    color: '#7C3AED',
  })

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const grouped = useMemo(
    () =>
      weekDays.reduce((acc, day) => {
        acc[day] = timetableSlots
          .filter((slot) => slot.day === day)
          .sort((a, b) => a.startTime.localeCompare(b.startTime))
        return acc
      }, {}),
    [timetableSlots],
  )

  const resetForm = () => {
    setForm({
      subject: '',
      day: 'Mon',
      startTime: '08:00',
      endTime: '09:00',
      location: '',
      color: '#7C3AED',
    })
  }

  const openCreate = () => {
    setEditingId(null)
    resetForm()
    setIsOpen(true)
  }

  const openEdit = (slot) => {
    setEditingId(slot.id)
    setForm({
      subject: slot.subject,
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      location: slot.location,
      color: slot.color,
    })
    setIsOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (editingId) {
      updateSlot(editingId, form)
    } else {
      addSlot(form)
    }

    setIsOpen(false)
    setEditingId(null)
    resetForm()
  }

  const handleDelete = (id) => {
    deleteSlot(id)
  }

  return (
    <section className="space-y-4">
      <GlassCard className="p-5">
        <h1 className="text-3xl font-extrabold text-white">Weekly Timetable</h1>
        <p className="mt-2 text-sm text-slate-300">Plan your week with premium clarity and focus.</p>
      </GlassCard>

      <div className="grid gap-3 xl:grid-cols-7">
        {weekDays.map((day) => (
          <GlassCard key={day} className="min-h-[250px] p-3">
            <h3 className="mb-3 text-center text-sm font-bold uppercase tracking-widest text-cyan-200">{day}</h3>
            <div className="space-y-2">
              {grouped[day].map((slot) => (
                <div
                  key={slot.id}
                  className="group rounded-2xl border border-white/10 bg-gradient-to-r p-3 transition hover:scale-[1.03] hover:border-cyan-300/60 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${slot.color}77, ${slot.color}33)`,
                  }}
                >
                  <div className="mb-2 flex items-center justify-between gap-1">
                    <SubjectBadge subject={slot.subject} />
                    <div className="hidden gap-1 group-hover:flex">
                      <button
                        type="button"
                        onClick={() => openEdit(slot)}
                        className="rounded-md bg-slate-950/45 p-1 text-slate-100"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(slot.id)}
                        className="rounded-md bg-red-500/45 p-1 text-white"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-white">
                    {slot.startTime} - {slot.endTime}
                  </p>
                  <p className="text-xs text-cyan-100">{slot.location}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <button
        type="button"
        onClick={openCreate}
        className="fixed bottom-6 right-6 z-20 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-[0_15px_35px_rgba(99,102,241,0.45)] transition hover:scale-110"
      >
        <Plus size={24} />
      </button>

      <Modal open={isOpen} title={editingId ? 'Edit Slot' : 'Add Slot'} onClose={() => setIsOpen(false)}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              placeholder="Subject"
              value={form.subject}
              onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100"
              required
            />
            <input
              placeholder="Location"
              value={form.location}
              onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100"
              required
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {weekDays.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, day }))}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  form.day === day
                    ? 'bg-violet-500 text-white shadow-[0_0_14px_rgba(124,58,237,.5)]'
                    : 'border border-white/10 bg-white/5 text-slate-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <input
              type="time"
              value={form.startTime}
              onChange={(event) => setForm((prev) => ({ ...prev, startTime: event.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100"
            />
            <input
              type="time"
              value={form.endTime}
              onChange={(event) => setForm((prev) => ({ ...prev, endTime: event.target.value }))}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-slate-100"
            />
            <input
              type="color"
              value={form.color}
              onChange={(event) => setForm((prev) => ({ ...prev, color: event.target.value }))}
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 p-1"
            />
          </div>

          <GlowButton type="submit" className="w-full">
            {editingId ? 'Update Slot' : 'Create Slot'}
          </GlowButton>
        </form>
      </Modal>
    </section>
  )
}

export default Timetable
