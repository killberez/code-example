import Restaurant, { RestaurantDocument } from '../models/Restaurant'

async function findById(restaurantId: string): Promise<RestaurantDocument> {
  const restaurant = await Restaurant.findById(restaurantId).exec() // .exec() will return a true Promise
  if (!restaurant) {
    throw new Error(`Restaurant ${restaurantId} not found`)
  }
  return restaurant
}

function findAll(): Promise<RestaurantDocument[]> {
  return Restaurant.find().sort({ name: 1 }).exec() // Return a Promise
}

function create(restaurant: RestaurantDocument): Promise<RestaurantDocument> {
  return restaurant.save()
}

export default {
  findById,
  findAll,
  create,
}




