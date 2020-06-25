// const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const CashFlows = db.define('cash_flows', {
  date: {
    type: Sequelize.DATEONLY
  },
  return: {
    type: Sequelize.DECIMAL(),
    allowNull: false,
    validate: {
      min: 0.0,
      isNumeric: true
    }
  }
})

module.exports = CashFlows
