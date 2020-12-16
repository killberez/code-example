import {Request, Response, NextFunction} from 'express'
import { BadRequestError } from '../helpers/apiError'
import { InternalServerError } from '../helpers/apiError'
import { NotFoundError } from '../helpers/apiError'

import User from '../models/User'
import UserService from '../services/user'

export const findAll = async (
    req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        res.json(await UserService.findAll())
    } catch (error) {
        next(new NotFoundError('Users not found', error))
    }
}

export const findById = async (
    req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
    res.json(await UserService.findById(req.params.userId))
} catch (error) {
    next(new NotFoundError('User not found', error))
    }
}

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const update = req.body
      const userId = req.params.userId
      const updatedUser = await UserService.update(userId, update)
      res.json(updatedUser)
    } catch (error) {
      next(new NotFoundError('User not found', error))
    }
  }

  export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await UserService.deleteUser(req.params.userId)
      res.status(204).end()
    } catch (error) {
      next(new NotFoundError('User not found', error))
    }
  }

  export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
  
      const user = new User(req.body)
  
      await UserService.create(user)
      res.json(user)
    } catch (error) {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Invalid Request', error))
      } else {
        next(new InternalServerError('Internal Server Error', error))
      }
    }
  }