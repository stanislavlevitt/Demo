const router = require('express').Router()
const {CashFlows, Investments} = require('../db/models')
module.exports = router

router.get('/:investmentId', async (req, res, next) => {
  try {
    const cashFlow = await CashFlows.findAll({
      where: {
        investmentId: req.params.investmentId
      },
      include: [
        {
          model: Investments
        }
      ]
    })
    res.json(cashFlow)
  } catch (err) {
    next(err)
  }
})
