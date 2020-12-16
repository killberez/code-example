import { Request, Response, NextFunction } from 'express'

import Comment from '../models/Comment'
import CommentService from '../services/comment'
import Restaurant from '../models/Restaurant'
import User from '../models/User'
import { NotFoundError } from '../helpers/apiError'

// POST a comment
export const postComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurantById = await Restaurant.findById(req.body.restaurant)
    const commenterById = await User.findById(req.body.commenter)
    let restaurantId = ''
    let commenterId = ''
    if (restaurantById && commenterById) {
      restaurantId = restaurantById._id
      commenterId = commenterById._id

      const comment = new Comment({
        restaurant: restaurantId,
        commenter: commenterId,
        message:req.body.message,
        commentedDate: new Date(),
      })
      const makeComment = await CommentService.comment(comment)
      makeComment.save()
      res.json(comment)
    }
  } catch (error) {
    next(new NotFoundError('Comment not found', error))
  }
}

// GET all comments for a restaurant byId
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CommentService.findAll())
  } catch (error) {
    next(new NotFoundError('Comment not found', error))
  }
}