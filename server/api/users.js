const router = require('express').Router()
const {User} = require('../db/models')
const {adminsOnly, isTrueUser} = require('../GateKeeper')
module.exports = router

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'name', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', adminsOnly, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', isTrueUser, async (req, res, next) => {
  try {
    const specificUser = await User.findByPk(req.params.id)
    await specificUser.update(req.body)
    res.json(specificUser)
  } catch (err) {
    next(err)
  }
})

router.put('/status/:id', adminsOnly, async (req, res, next) => {
  try {
    const specificUser = await User.findByPk(req.params.id)
    await specificUser.update(req.body)
    res.json(specificUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send('The User has been deleted')
  } catch (error) {
    next(error)
  }
})
