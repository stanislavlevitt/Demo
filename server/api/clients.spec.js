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
    const clientDesc = 'Client Description Test'

    beforeEach(() => {
      return Clients.create({
        name: 'Client 9',
        description: 'Client Description Test'
      })
    })

    it('GET /api/clients', async () => {
      const res = await request(app)
        .get('/api/clients')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal(clientDesc)
    })
  }) // end describe('/api/clients')
}) // end describe('Clients routes')
