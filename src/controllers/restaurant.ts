/**TEST
 * 
 * TEST
 * 
 */
import { Request, Response, NextFunction } from 'express'

import Restaurant from '../models/Restaurant'
import RestaurantService from '../services/restaurant'
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

// GET /restaurants/:restaurantId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await RestaurantService.findById(req.params.restaurantId))
  } catch (error) {
    next(new NotFoundError('Restaurant not found', error))
  }
}

// GET /restaurants
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await RestaurantService.findAll())
  } catch (error) {
    next(new NotFoundError('Restaurants not found', error))
  }
}

// POST /restaurants
export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      address,
      coords,
      openingHours,
      menu,
      images,
      isDeliverable,
      deliveryCost,
      phoneNumber,
      website,
    } = req.body
    const restaurant = new Restaurant({
      name,
      address,
      coords,
      openingHours,
      menu,
      images,
      isDeliverable,
      deliveryCost,
      phoneNumber,
      website,
    })
    await RestaurantService.create(restaurant)
    res.json(restaurant)
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(new InternalServerError('Internal Server Error', error))
    }
  }
}
