const router = require('express').Router()
const {Funds, Clients} = require('../db/models')
module.exports = router

router.get('/:clientId', async (req, res, next) => {
  try {
    const client = await Clients.findByPk(req.params.clientId)
    const {permission} = client.dataValues
    const funds = await Funds.findAll()
    const filteredFunds = Funds.filterPermission(funds, permission)
    res.json(filteredFunds)
  } catch (err) {
    next(err)
  }
})
