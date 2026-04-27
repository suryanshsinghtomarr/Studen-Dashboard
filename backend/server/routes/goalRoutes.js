import { Router } from 'express'
import { createGoal, getGoals, logSession } from '../controllers/goalController.js'

const router = Router()

router.get('/', getGoals)
router.post('/', createGoal)
router.post('/:id/log', logSession)

export default router
