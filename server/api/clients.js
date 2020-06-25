const router = require('express').Router()
const {Clients} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const clients = await Clients.findAll({
      attributes: ['id', 'name']
    })
    res.json(clients)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const client = await Clients.findByPk(req.params.id)
    res.json(client)
  } catch (err) {
    next(err)
  }
})
