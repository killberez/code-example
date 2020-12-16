import mongoose, { Document, Schema } from 'mongoose'
import validator from 'validator'

import { RestaurantDocument } from './Restaurant'

export type Google = {
  id: string;
  token: string;
  name: string;
}
export type UserDocument = Document & {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  google: Google;
  isAdmin: boolean;
  isBan: boolean;
  restaurantSuggestions: RestaurantDocument[] | [];
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 6,
    maxlength: 255,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 255,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
  },
  avatar: {
    type: String,
  },
  google: {
    id: String,
    name: String,
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
  },
  isBan: {
    type: Boolean,
  },
  restaurantSuggestions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
})

export default mongoose.model<UserDocument>('User', userSchema)