import Product, { ProductDocument } from '../models/Product'

function create(product: ProductDocument): Promise<ProductDocument> {
  return product.save()
}

function findById(productId: string): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        throw new Error(`Product ${productId} not found`)
      }
      return product
    })
}

function findAll(): Promise<ProductDocument[]> {
  return Product.find().exec() // Return a Promise
}

function update(
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument> {
  return Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        throw new Error(`product ${productId} not found`)
      }

      if (update.name) {
        product.name = update.name
      }
      if (update.description) {
        product.description = update.description
      }
      if (update.categories) {
        product.categories = product.categories
      }
      if (update.variants) {
        product.variants = update.variants
      }
      if (update.sizes) {
        product.sizes = update.sizes
      }
      if (update.price) {
        product.price = update.price
      }
      if (update.items) {
        product.items = update.items
      }
      return product.save()
    })
}

function deleteProduct(productId: string): Promise<ProductDocument | null> {
  return Product.findByIdAndDelete(productId).exec()
}

export default {
  create,
  findAll,
  findById,
  update,
  deleteProduct,
}
