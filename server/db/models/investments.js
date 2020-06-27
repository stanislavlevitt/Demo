const Sequelize = require('sequelize')
const db = require('../db')

const Investments = db.define('investments', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATEONLY
  },
  amount: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
      isNumeric: true
    }
  }
})

module.exports = Investments
