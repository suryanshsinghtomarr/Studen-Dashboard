import mongoose from 'mongoose'

const loggedSessionSchema = new mongoose.Schema(
  {
    durationHours: {
      type: Number,
      required: true,
      min: 0.25,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
)

const studyGoalSchema = new mongoose.Schema(
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
    targetHours: {
      type: Number,
      required: true,
      min: 1,
    },
    loggedSessions: {
      type: [loggedSessionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

const StudyGoal = mongoose.model('StudyGoal', studyGoalSchema)

export default StudyGoal
