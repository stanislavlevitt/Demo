const router = require('express').Router()
const {Order} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        status: false
      },
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.get('/checkout', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        status: false
      },
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        status: false
      },
      include: [
        {
          model: Product
        }
      ]
    })
    await order.update({
      status: true
    })
    await order.save()
    res.send()
  } catch (error) {
    next(error)
  }
})
