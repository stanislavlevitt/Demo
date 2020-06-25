const router = require('express').Router()
module.exports = router

router.use('/clients', require('./clients'))
router.use('/funds', require('./funds'))
router.use('/investments', require('./investments'))
router.use('/cashFlow', require('./cashFlow'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
