import Product from '../../src/models/Product'
import ProductService from '../../src/services/product'
import * as dbHelper from '../db-helper'

const nonExistingProductId = '5f841b7481898e42ac9999a7'

async function createProduct() {
  const product = new Product({
    name: 'Mac',
    description: 'laptop',
    categories: ['ultrabook', 'apple'],
    variants: ['256gb', '512gb'],
    sizes: ['16', '13'],
    items: 5,
    price: 1999,
  })
  return await ProductService.create(product)
}

describe('product service', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a movie', async () => {
    const product = await createProduct()
    expect(product).toHaveProperty('_id')
    expect(product).toHaveProperty('name', 'Mac')
    expect(product).toHaveProperty('price', 1999)
  })

  it('should update an existing movie', async () => {
    const product = await createProduct()
    const update = {
      name: 'Asus',
      price: 2999,
    }
    const updated = await ProductService.update(product._id, update)
    expect(updated).toHaveProperty('_id', product._id)
    expect(updated).toHaveProperty('name', 'Asus')
    expect(updated).toHaveProperty('price', 2999)
  })

  it('should delete an existing product', async () => {
    expect.assertions(1)
    const product = await createProduct()
    await ProductService.deleteProduct(product._id)
    return ProductService.findById(product._id).catch((e) => {
      expect(e.message).toBe(`Product ${product._id} not found`)
    })
  })

  it('should found an existing product by id', async () => {
    const product = await createProduct()
    const found = await ProductService.findById(product._id)
    expect(found.name).toEqual(product.name)
    expect(found._id).toEqual(product._id)
  })

  it('should found all existings products', async () => {
    const product1 = await createProduct()
    const product2 = await createProduct()

    const found = await ProductService.findAll()
    expect(found[0]._id).toEqual(product1._id)
    expect(found[1]._id).toEqual(product2._id)
    expect(found.length).toBe(2)
  })

  it('should not get a non-existing product', async () => {
    expect.assertions(1)
    return ProductService.findById(nonExistingProductId).catch((e) => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} not found`)
    })
  })
})
