const router = require('express').Router()
const {Order, Itemized} = require('../db/models')
const {Product} = require('../db/models')
const {isTrueUser, isAdminOrTrueUser} = require('../GateKeeper')
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
        userId: req.user.id,
        status: false
      },
      include: [{model: Product}]
    })
    const itemsFromOrder = await Itemized.findAll({
      where: {
        orderId: order.id
      }
    })
    let sum = 0
    itemsFromOrder.forEach(el => (sum += el.dataValues.totalPrice))
    order.totalPrice = sum
    await order.save()
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', isAdminOrTrueUser, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
        status: true
      },
      include: [{model: Product}]
    })

    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isTrueUser, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false
      }
    })
    const current = new Date(Date.now())
    const currentDate = current.toDateString()
    await order.update({
      status: true,
      purchaseDate: currentDate
    })
    await order.save()
    await Order.create({userId: req.user.id})
    res.send(order)
  } catch (error) {
    next(error)
  }
})
