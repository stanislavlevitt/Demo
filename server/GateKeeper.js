const adminsOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('Not allowed!')
    err.status = 401
    return next(err)
  }
  next()
}

const isTrueUser = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    const err = new Error('Not allowed!')
    err.status = 401
    return next(err)
  }
  next()
}

const isAdminOrTrueUser = (req, res, next) => {
  console.log(req.user.id, Number(req.params.id))
  console.log(req.user.isAdmin)
  if (!req.user.isAdmin && req.user.id !== Number(req.params.id)) {
    const err = new Error('Not allowed!')
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = {
  adminsOnly,
  isTrueUser,
  isAdminOrTrueUser
}
