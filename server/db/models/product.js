// const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(),
    allowNull: false,
    validate: {
      min: 0,
      isNumeric: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

Product.beforeValidate(product => {
  if (
    product.name.includes('<') ||
    product.name.includes('>') ||
    product.imageUrl.includes('<') ||
    product.imageUrl.includes('>')
  ) {
    product.name = ''
    product.imageUrl = ''
  }
})

module.exports = Product
