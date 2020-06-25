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
    console.log('Client ID', req.params.clientId)
    console.log('Fund ID', req.params.fundId)
    console.log('investments', investments)
    res.json(investments)
  } catch (err) {
    next(err)
  }
})
