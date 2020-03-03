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
  // type: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   validate: {
  //     isEmpty: true
  //   }
  // },

  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      isNumeric: true
    }
  },
  // brand: {
  //   type: Sequelize.STRING,
  //   defaultValue: 'Generic'
  // },
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

module.exports = Product
