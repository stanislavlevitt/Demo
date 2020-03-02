// const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: true
    }
  },
  serial: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0.99,
      isEmpty: true
    }
  },
  brand: {
    type: Sequelize.STRING,
    defaultValue: 'Generic'
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
