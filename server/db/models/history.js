const Sequelize = require('sequelize')
const db = require('../db')

const History = db.define('History', {
  price: {
    type: Sequelize.DECIMAL()
  }
})

module.export = History
