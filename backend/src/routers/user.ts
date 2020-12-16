import express from 'express'
import {
  createUser,
  loginUser,
  updateUser,
  banUser,
  unbanUser,
  resetPassword,
  setPassword,
  // userOrder,
  createOrder,
  getOrders,
} from '../controllers/user'

const router = express.Router()

router.post('/signup', createUser)
router.post('/signin', loginUser)
router.patch('/:userId', updateUser)
router.post('/:userId/resetpassword', resetPassword)
router.patch('/:userId/setpassword', setPassword)
router.post('/:userId/ban', banUser)
router.post('/:userId/order', createOrder)
router.get('/:userId/orders', getOrders)

export default router
