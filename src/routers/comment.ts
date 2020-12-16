import express from 'express'
import { postComment, findAll } from '../controllers/comment'

const router = express.Router()
//api/v1/comments
router.get('/', findAll)
router.post('/', postComment)

export default router