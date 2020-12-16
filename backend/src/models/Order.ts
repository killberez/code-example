import mongoose, { Document, Schema } from 'mongoose'
import { ProductDocument } from './Product'

export type OrderDocument = Document & {
  products: ProductDocument[];
}

export const OrderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
})

export default mongoose.model<OrderDocument>('Order', OrderSchema)
