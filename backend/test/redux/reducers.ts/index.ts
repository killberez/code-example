import { combineReducers } from 'redux'

import product from './product'
import ui from './ui'
import products from './products'

const createRootReducer = () =>
  combineReducers({
    product,
    ui,
    products,
  })

export default createRootReducer
