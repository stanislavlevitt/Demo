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
  type: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/productDefault.png'
  },
  price: {
    type: Sequelize.DECIMAL(),
    allowNull: false,
    validate: {
      min: 0.99
    }
  }
})

module.exports = Product
