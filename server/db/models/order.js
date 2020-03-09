// const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    validate: {
      notEmpty: true
    }
  },
  purchaseDate: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Order
