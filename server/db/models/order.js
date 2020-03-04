// const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  // orderNum : {
  //   type: Sequelize.INTEGER
  //   allowNull
  // }

  // status is TRUE if purchased, false if in cart not purchased
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  purchaseDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },

  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Order
