const router = require('express').Router()
const {Product} = require('../db/models')
const {adminsOnly} = require('../GateKeeper')
module.exports = router

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const newCreatedProduct = await Product.create(req.body)
    res.json(newCreatedProduct)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})
router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const Newproduct = await Product.findByPk(req.params.id)
    Newproduct.update(req.body)
    res.json(Newproduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send('The Product has been deleted')
  } catch (error) {
    next(error)
  }
})
