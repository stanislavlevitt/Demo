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

// router.get('/checkout', async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: {
//         userId: req.session.passport.user,
//         status: false
//       },
//       include: [{model: Product}]
//     })
//     res.json(order)
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.session.passport.user,
        status: false
      }
    })
    await order.update({
      status: true,
      purchaseDate: Date.now()
    })
    await order.save()
    await Order.create({userId: req.session.passport.user})
    res.send(order)
  } catch (error) {
    next(error)
  }
})
