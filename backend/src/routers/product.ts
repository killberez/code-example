import express from 'express'
import {
  createProduct,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
} from '../controllers/product'

const router = express.Router()

router.post('/', createProduct)
router.get('/', findAll)
router.get('/:productId', findById)
router.patch('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
