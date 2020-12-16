import { OrderDocument } from '../models/Order'
import User, { UserDocument } from '../models/user'

function create(user: UserDocument): Promise<UserDocument> {
  return user.save()
}

function find(email: string, password: string): Promise<UserDocument> {
  return User.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${email} not found`)
      }
      if (user.password !== password) {
        throw new Error('Wrong password')
      }
      return user
    })
}

function update(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`user ${userId} not found`)
      }

      if (update.firstName) {
        user.firstName = update.firstName
      }
      if (update.lastName) {
        user.lastName = update.lastName
      }
      if (update.email) {
        user.email = update.email
      }

      return user.save()
    })
}

function banUser(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`user ${userId} not found`)
      }
      user.ban = true

      return user.save()
    })
}

function unbanUser(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`user ${userId} not found`)
      }
      user.ban = false
      return user.save()
    })
}

function reset(userId: string): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`user ${userId} not found`)
      }

      user.password = '' // generate random string!

      return user.save()
    })
}

function set(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`user ${userId} not found`)
      }

      if (update.password) {
        user.password = update.password
      }

      return user.save()
    })
}

function createOrder(
  userId: string,
  order: OrderDocument
): Promise<UserDocument> {
  return User.findById(userId)
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`user ${userId} not found`)
      }

      user.orders = user.orders.concat(order)
      console.log(user)
      console.log(order)
      return user.save()
    })
}

async function getOrders(userId: string): Promise<OrderDocument[]> {
  const user = await User.findById(userId).populate('orders.products').exec()
  if (!user) {
    throw new Error(`user ${userId} not found`)
  }
  return user.orders
  // .exec()
  // .then((user) => {
  //   if (!user) {
  //     throw new Error(`user ${userId} not found`)
  //   }

  //   user.orders = user.orders.concat(order)
  //   console.log(user)
  //   console.log(order)
  //   return user.save()
  // })
}
// function order(
//   userId: string,
//   update: Partial<UserDocument>
// ): Promise<UserDocument> {
//   return User.findById(userId)
//     .exec()
//     .then((user) => {
//       if (!user) {
//         throw new Error(`user ${userId} not found`)
//       }
//       if (update.orders) {
//         user.orders = update.orders
//       }
//       console.log(update.orders)
//       return user.save()
//     })
// }

// function findAll(): Promise<ProductDocument[]> {
//   return Product.find().exec() // Return a Promise
// }

// function deleteProduct(productId: string): Promise<ProductDocument | null> {
//   return Product.findByIdAndDelete(productId).exec()
// }

export default {
  create,
  find,
  update,
  banUser,
  unbanUser,
  reset,
  set,
  createOrder,
  getOrders,
  //   deleteProduct,
}
