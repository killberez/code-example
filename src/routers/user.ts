import express from 'express'
import {
  findAll,
  findById,
  updateUser,
  deleteUser,
  createUser,
} from '../controllers/users'

const router = express.Router()

router.get('/', findAll)
router.get('/:userId', findById)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)
router.post('/', createUser)

export default router
