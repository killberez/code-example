import request from 'supertest'

import app from '../../src/app'
import * as dbHelper from '../db-helper'
import Product, { ProductDocument } from '../../src/models/Product'

const nonExistingProductId = '5e57b77b5744fa0b461c7906'

async function createProduct(override?: Partial<ProductDocument>) {
  let product = {
    name: 'Mac',
    description: 'laptop',
    categories: ['ultrabook', 'apple'],
    variants: ['256gb', '512gb'],
    sizes: ['16', '13'],
    items: 5,
    price: 1999,
  }

  if (override) {
    product = { ...product, ...override }
  }

  return await request(app).post('/api/v1/products').send(product)
}

describe('product controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a product', async () => {
    const res = await createProduct()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.name).toBe('Mac')
  })

  it('should not create a product with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'Mac',
        description: 'laptop',
        categories: ['ultrabook', 'apple'],
        variants: ['256gb', '512gb'],
        sizes: ['16', '13'],
        items: 'five',
        price: 'two',
      })
    expect(res.status).toBe(400)
  })

  it('should get back an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    res = await request(app).get(`/api/v1/products/${productId}`)

    expect(res.body._id)
  })

  it('should not get back a non-existing product', async () => {
    const res = await request(app).get(
      `/api/v1/products/${nonExistingProductId}`
    )
    expect(res.status).toBe(404)
  })

  it('should get back all product', async () => {
    const res1 = await createProduct({
      name: 'Mac',
      price: 1999,
    })
    const res2 = await createProduct({
      name: 'Asus',
      price: 2999,
    })

    const res3 = await request(app).get('/api/v1/products')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing product', async () => {
    let res = await createProduct()
    expect(res.status).toBe(200)

    const productId = res.body._id
    const update = {
      name: 'Macс',
      price: 999,
    }

    res = await request(app).patch(`/api/v1/products/${productId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.name).toEqual('Macс')
    expect(res.body.price).toEqual(999)
  })
})
