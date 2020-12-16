import { Request, Response, NextFunction } from 'express'

import User from '../models/user'
import Product from '../models/Product'
import userService from '../services/user'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'
import { RequestError } from 'request-promise/errors'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new User(req.body)

    await userService.create(user)
    res.json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw Error()
    const user = await userService.find(email, password)
    res.json(user.email)
  } catch (error) {
    next(new BadRequestError('Invalid email or password', error))
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
    const updatedUser = await userService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const banUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const banedUser = await userService.banUser(userId)
    res.json(banedUser)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const unbanUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const unbanedUser = await userService.unbanUser(userId)
    res.json(unbanedUser)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const resetedPassword = await userService.reset(userId)
    res.json(resetedPassword)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const setPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await userService.set(userId, update)
    res.json(updatedUser)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = req.body
    const userId = req.params.userId
    console.log(req.params)
    const createdOrder = await userService.createOrder(userId, order)
    res.json(createdOrder)
  } catch (error) {
    next(new NotFoundError('User not found', error))
  }
}

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const orders = await userService.getOrders(userId)
    res.json(orders)
  } catch (error) {
    next(new NotFoundError('Users not found', error))
  }
}

// export const userOrder = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const update = req.body
//     const userId = req.params.userId
//     const updatedUserOrder = await userService.order(userId, update)
//     res.json(updatedUserOrder)
//   } catch (error) {
//     next(new NotFoundError('User not found', error))
//   }
// }
// export const deleteProduct = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await ProductService.deleteProduct(req.params.productId)
//     res.status(204).end()
//   } catch (error) {
//     next(new NotFoundError('Product not found', error))
//   }
// }

// export const findById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     res.json(await ProductService.findById(req.params.productId))
//   } catch (error) {
//     next(new NotFoundError('product not found', error))
//   }
// }
