/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Product = db.model('product')
const agent = require('supertest')(app)

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@gbook.com'

    beforeEach(() => {
      return User.create({
        name: 'Cody',
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

describe('Product routes', () => {
  let productStock

  const products = [
    {
      name: 'Mac 15',
      price: 1000
    },
    {
      name: 'Mac Cheese Grater',
      price: 27000
    }
  ]

  beforeEach(async () => {
    const newProducts = await Product.bulkCreate(products)
    productStock = newProducts.map(product => product.dataValues)
  })

  describe('GET `/api/products`', () => {
    it('serves up all Products', async () => {
      const response = await agent.get('/api/products').expect(200)
      expect(response.body).to.have.length(2)
      expect(response.body[0].name).to.equal(productStock[0].name)
    })
  })

  describe('GET `/api/products/:id`', () => {
    it('serves up a single Product by its `id`', async () => {
      const response = await agent.get('/api/products/2').expect(200)
      expect(response.body.name).to.equal('Mac Cheese Grater')
    })
  })

  describe('DELETE `/api/products/:id`', () => {
    it('deletes a single Product by its `id`', async () => {
      const response = await agent.delete('/api/products/2').expect(200)
      expect(response.body).to.deep.equal({})
    })
  })
})
