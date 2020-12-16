import { Product, AddProductsAction, ADD_PRODUCTS } from '../../types'

export default function products(
  state: Product[] = [],
  action: AddProductsAction
) {
  switch (action.type) {
  case ADD_PRODUCTS:
    const { products } = action.payload
    return products
  default:
    return state
  }
}
