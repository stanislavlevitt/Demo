/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Client = db.model('clients')

describe('Client model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    it('requires `name`', async () => {
      const client = Client.build()

      try {
        await client.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires `name` to not be an empty string', async () => {
      const client = Client.build({
        name: ''
      })

      try {
        await client.validate()
        throw Error(
          'validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })
  })
}) // end describe('Client model')
