/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Clients = db.model('clients')

describe('Clients routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/clients/', () => {
    const codysDescription = 'Cody Client Description Test'

    beforeEach(() => {
      return Clients.create({
        name: 'Cody',
        description: 'Cody Client Description Test'
      })
    })

    it('GET /api/clients', async () => {
      const res = await request(app)
        .get('/api/clients')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal(codysDescription)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
