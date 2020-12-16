import User, { UserDocument } from '../models/User'

function create(user: UserDocument): Promise<UserDocument> {
  return user.save()
}

async function findById(userId: string): Promise<UserDocument> {
  const user = await User.findById(userId)
    .exec()
  if (!user) {
    throw new Error(`User ${userId} not found`)
  }
  return user
}

function findAll(): Promise<UserDocument[]> {
  return User.find().sort({ name: 1 }).exec()
}

async function update(
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument> {
  const user = await User.findById(userId)
    .exec()
  if (!user) {
    throw new Error(`User ${userId} not found`)
  }
  if (update.username) {
    user.username = update.username
  }
  if (update.email) {
    user.email = update.email
  }
  return user.save()
}

function deleteUser(userId: string): Promise<UserDocument | null> {
  return User.findByIdAndDelete(userId).exec()
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteUser,
}
