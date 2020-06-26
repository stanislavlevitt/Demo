const router = require('express').Router()
const {Investments} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const investments = await Investments.findAll()
    res.json(investments)
  } catch (err) {
    next(err)
  }
})

router.get('/:clientId/:fundId', async (req, res, next) => {
  try {
    const investments = await Investments.findAll({
      where: {
        clientId: req.params.clientId,
        fundId: req.params.fundId
      }
    })
    res.json(investments)
  } catch (err) {
    next(err)
  }
})
