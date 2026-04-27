import { Router } from 'express'
import {
  addSlot,
  deleteSlot,
  getSlots,
  updateSlot,
} from '../controllers/timetableController.js'

const router = Router()

router.get('/', getSlots)
router.post('/', addSlot)
router.put('/:id', updateSlot)
router.delete('/:id', deleteSlot)

export default router
