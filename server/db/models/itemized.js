// const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Itemized = db.define('itemized', {
  // orderNum : {
  //   type: Sequelize.INTEGER
  //   allowNull
  // }

  // status is TRUE if purchased, false if in cart not purchased
  purchasePrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isNumeric: true
    }
  },

  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  totalPrice: {
    type: Sequelize.INTEGER
  },

  productName: {
    type: Sequelize.STRING
  }
})

module.exports = Itemized
