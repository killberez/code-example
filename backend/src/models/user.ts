import mongoose, { Document, Schema } from 'mongoose'
import Order, { OrderDocument, OrderSchema } from './Order'

export type UserDocument = Document & {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  ban: boolean;
  googleId: string;
  orders: OrderDocument[];
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  ban: Boolean,
  googleId: String,
  orders: [OrderSchema],
  
})

export default mongoose.model<UserDocument>('User', userSchema)
