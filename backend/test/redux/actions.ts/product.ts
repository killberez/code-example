import {
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    ProductActions,
    Product,
    ADD_PRODUCTS,
    AddProductsAction,
  } from '../../types'
  
  export function addProducts(products: Product[]): AddProductsAction {
    return {
      type: ADD_PRODUCTS,
      payload: {
        products,
      },
    }
  }
  
  export function addProduct(product: Product): ProductActions {
    return {
      type: ADD_PRODUCT,
      payload: {
        product,
      },
    }
  }
  
  export function removeProduct(product: Product): ProductActions {
    return {
      type: REMOVE_PRODUCT,
      payload: {
        product,
      },
    }
  }
  