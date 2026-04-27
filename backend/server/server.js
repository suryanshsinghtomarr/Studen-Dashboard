import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import { verifyToken } from './middleware/authMiddleware.js'
import authRoutes from './routes/authRoutes.js'
import goalRoutes from './routes/goalRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import timetableRoutes from './routes/timetableRoutes.js'

dotenv.config({ override: true })

connectDB()

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.status(200).json({ message: 'Server is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/timetable', verifyToken, timetableRoutes)
app.use('/api/goals', verifyToken, goalRoutes)
app.use('/api/tasks', verifyToken, taskRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
