const Sequelize = require('sequelize')
const db = require('../db')

const Clients = db.define('clients', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  permission: {
    type: Sequelize.ENUM('All', 'PPF', 'PF')
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Clients
