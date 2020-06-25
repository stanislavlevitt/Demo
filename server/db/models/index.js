const Clients = require('./clients')
const Funds = require('./Funds')
const Investments = require('./investments')
const CashFlows = require('./cashFlows')

Investments.hasMany(CashFlows)
CashFlows.belongsTo(Investments)

Clients.hasMany(Investments)
Investments.belongsTo(Clients)

Funds.hasMany(Investments)
Investments.belongsTo(Funds)

module.exports = {
  Clients,
  Funds,
  Investments,
  CashFlows
}
