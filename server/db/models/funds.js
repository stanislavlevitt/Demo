const Sequelize = require('sequelize')
const db = require('../db')

const Funds = db.define('funds', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.ENUM('HF', 'PL', 'VC', 'RE', 'PC')
  },
  inception: {
    type: Sequelize.DATEONLY
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

const cleanup = fund => {
  const {name, inception, description, id, type} = fund.dataValues
  const newName = '*'.repeat(name.length)
  const newInception = '*'.repeat(inception.length)
  const newDescription = '*'.repeat(description.length)

  return {
    name: newName,
    inception: newInception,
    description: newDescription,
    id,
    type
  }
}

Funds.filterPermission = function(funds, permission) {
  switch (permission) {
    case 'All':
      return funds
    case 'PPF':
      return funds.map(fund => {
        if (fund.dataValues.type === 'PL' || fund.dataValues.type === 'PC') {
          return fund
        } else {
          return cleanup(fund)
        }
      })
    case 'PF':
      return funds.map(fund => {
        if (fund.dataValues.type === 'VC' || fund.dataValues.type === 'RE') {
          return fund
        } else {
          return cleanup(fund)
        }
      })
    default:
      break
  }
}

Funds.allowedFormFunds = function(funds, permission) {
  switch (permission) {
    case 'All':
      return funds
    case 'PPF':
      return funds.filter(fund => {
        if (fund.dataValues.type === 'PL' || fund.dataValues.type === 'PC') {
          return fund
        }
      })
    case 'PF':
      return funds.filter(fund => {
        if (fund.dataValues.type === 'VC' || fund.dataValues.type === 'RE') {
          return fund
        }
      })
    default:
      break
  }
}

module.exports = Funds
