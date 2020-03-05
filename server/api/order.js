const router = require('express').Router()
const {Order, Itemized} = require('../db/models')
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
      }
    })
    // const itemsFromOrder = await Itemized.findAll({
    //   where: {
    //     orderId: order.id
    //   }
    // })
    await order.update({
      status: true,
      purchaseDate: Date.now()
    })
    await order.save()
    console.log('ORDER', order)
    console.log('ORDER DOT ID', order.id)
    res.send()
  } catch (error) {
    next(error)
  }
})
