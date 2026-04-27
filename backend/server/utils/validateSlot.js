import TimetableSlot from '../models/TimetableSlot.js'

const parseTimeToMinutes = (value) => {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

const isValidTime = (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value)

const validateSlot = async ({ userId, day, startTime, endTime, excludeId = null }) => {
  if (!isValidTime(startTime) || !isValidTime(endTime)) {
    return {
      valid: false,
      message: 'Time must be in HH:MM format',
    }
  }

  const startMinutes = parseTimeToMinutes(startTime)
  const endMinutes = parseTimeToMinutes(endTime)

  if (startMinutes >= endMinutes) {
    return {
      valid: false,
      message: 'End time must be after start time',
    }
  }

  const query = {
    userId,
    day,
  }

  if (excludeId) {
    query._id = { $ne: excludeId }
  }

  const existingSlots = await TimetableSlot.find(query)

  const hasConflict = existingSlots.some((slot) => {
    const existingStart = parseTimeToMinutes(slot.startTime)
    const existingEnd = parseTimeToMinutes(slot.endTime)

    return startMinutes < existingEnd && endMinutes > existingStart
  })

  if (hasConflict) {
    return {
      valid: false,
      message: 'Time slot conflicts with existing timetable slot',
    }
  }

  return { valid: true }
}

export default validateSlot
