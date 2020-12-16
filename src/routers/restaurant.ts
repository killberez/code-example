import express from 'express'

import { findById, findAll } from '../controllers/restaurant'
import {
  createRestaurant,
} from '../controllers/restaurant'

const router = express.Router()

// Every path we define here will get /api/v1/restaurants prefix
router.get('/', findAll)
router.get('/:restaurantId', findById)
router.post('/', createRestaurant)

export default router
