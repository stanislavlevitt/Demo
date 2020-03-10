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

module.exports = {
  adminsOnly,
  isTrueUser
}
