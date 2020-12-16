import mongoose, { Document, Schema } from 'mongoose'

import { UserDocument } from './User'
import { RestaurantDocument } from './Restaurant'

export type CommentDocument = Document & {
  commenter: UserDocument;
  restaurant: RestaurantDocument;
  message: string;
}

const commentSchema = new mongoose.Schema({
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
export default mongoose.model<CommentDocument>('Comment', commentSchema)
