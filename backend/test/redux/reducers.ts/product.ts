import {
    ProductState,
    ProductActions,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
  } from '../../types'
  
  export default function product(
    state: ProductState = {
      inCart: [],
    },
    action: ProductActions
  ): ProductState {
    switch (action.type) {
    case ADD_PRODUCT: {
      const { product } = action.payload
      if (state.inCart.find((c) => c.name === product.name)) {
        return state
      }
      // Always return new state (e.g, new object) if changed
      return { ...state, inCart: [...state.inCart, product] }
    }
  
    case REMOVE_PRODUCT: {
      const { product } = action.payload
      const index = state.inCart.findIndex((c) => c.name === product.name)
      if (index >= 0) {
        state.inCart.splice(index, 1)
        return { ...state, inCart: [...state.inCart] }
      }
      return state
    }
  
    default:
      return state
    }
  }
  