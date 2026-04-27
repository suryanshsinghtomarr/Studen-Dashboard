import mongoose from 'mongoose'

const timetableSlotSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    day: {
      type: String,
      required: true,
      enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      index: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#2563eb',
    },
  },
  {
    timestamps: true,
  },
)

const TimetableSlot = mongoose.model('TimetableSlot', timetableSlotSchema)

export default TimetableSlot
