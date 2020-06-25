const router = require('express').Router()
module.exports = router

router.use('/clients', require('./clients'))
router.use('/funds', require('./funds'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
