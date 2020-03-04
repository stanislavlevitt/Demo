const router = require('express').Router()
const {Itemized} = require('../db/models')
const {Order} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await Itemized.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.session.passport.user
      }
    })
    const currentItem = await Itemized.findOne({
      where: {
        productId: req.body.product.id,
        orderId: order.id
      }
    })

    if (currentItem !== null) {
      currentItem.quantity = currentItem.quantity + req.body.itemQty
      await currentItem.save()
      res.send(currentItem)
    } else {
      const newItem = {
        quantity: req.body.itemQty,
        purchasePrice: req.body.product.price,
        productId: req.body.product.id,
        orderId: order.id
      }
      const item = await Itemized.create(newItem)
      res.send(item)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/order', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.session.passport.user
      }
    })
    const items = await Itemized.findAll({
      where: {
        orderId: order.id
      }
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})
