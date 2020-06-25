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

router.put('/', async (req, res, next) => {
  try {
    await CashFlows.update(
      {
        date: req.body.date,
        return: req.body.rate
      },
      {
        where: {
          id: req.body.cashId
        }
      }
    )

    await Investments.update(
      {
        date: req.body.date,
        amount: parseFloat(req.body.amount)
      },
      {
        where: {
          id: req.body.investmentId
        }
      }
    )

    res.json({
      message: 'Update successfully',
      status: 200
    })
  } catch (err) {
    next(err)
  }
})
