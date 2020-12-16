import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string;
  description: string;
  categories: string[];
  variants: string[];
  sizes: string[];
  items: number;
  price: number;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  description: String,
  categories: [String],
  variants: [String],
  sizes: [String],
  items: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
