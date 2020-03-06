// const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Itemized = db.define('itemized', {
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
  }
})

module.exports = Itemized
