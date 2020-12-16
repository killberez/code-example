import express from 'express'
import compression from 'compression'
import session from 'express-session'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import mongo from 'connect-mongo'
import flash from 'express-flash'
import path from 'path'
import mongoose from 'mongoose'
import passport from 'passport'
import bluebird from 'bluebird'

import cors from 'cors'
import { MONGODB_URI, SESSION_SECRET } from './util/secrets'
import userRouter from './routers/user'
import movieRouter from './routers/movie'
import authRouter from './routers/auth'
import productRouter from './routers/product'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

const app = express()
const mongoUrl = MONGODB_URI

mongoose.Promise = bluebird
mongoose
  .connect(
    'mongodb+srv://TarasLiushUser:Zaebars1488@cluster0.tgra4.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('db conected')
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

// Express configuration
// app.set('port', process.env.PORT || 8080)
app.set('port', 8080)

// Use common 3rd-party middlewares
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Use movie router
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
// Custom API error handler
app.use(apiErrorHandler)

export default app

// 1. Add price to product
// 2. Create new order model
// 3. Setup relations between users/orders and orders/products
// 4. Wrigth tests
// 5. Fix problems
