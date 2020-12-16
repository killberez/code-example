import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { AppState } from '../types'
import createRootReducer from './reducers.ts'

const initState: AppState = {
  product: {
    inCart: [],
  },
  ui: {
    dialogOpen: {},
  },
  products: [],
}

export default function makeStore(initialState = initState) {
  const middlewares = [thunk]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
