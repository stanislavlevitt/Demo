'use strict'

const db = require('../server/db')
const {Clients, Funds, Investments, CashFlows} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //Start of Client Seeds
  const Client1 = await Clients.create({
    name: 'Client 1',
    description: 'description for client 1',
    permission: 'All'
  })
  const Client2 = await Clients.create({
    name: 'Client 2',
    description: 'description for client 2',
    permission: 'PPF'
  })
  const Client3 = await Clients.create({
    name: 'Client 3',
    description: 'description for client 3',
    permission: 'PF'
  })
  // End of Client Seeds
  // Start of Fund Seeds
  const Fund1 = await Funds.create({
    name: 'Fund 1',
    type: 'HF',
    inception: '2018-06-22',
    description: 'description for Fund 1'
  })
  const Fund2 = await Funds.create({
    name: 'Fund 2',
    type: 'PL',
    inception: '2019-06-23',
    description: 'description for Fund 2'
  })
  const Fund3 = await Funds.create({
    name: 'Fund 3',
    type: 'VC',
    inception: '2020-06-24',
    description: 'description for Fund 3'
  })
  const Fund4 = await Funds.create({
    name: 'Fund 4',
    type: 'RE',
    inception: '2017-06-21',
    description: 'description for Fund 4'
  })
  const Fund5 = await Funds.create({
    name: 'Fund 5',
    type: 'PC',
    inception: '2016-06-20',
    description: 'description for Fund 5'
  })
  // End of Funds Seeds
  // Start of Investment Seeds
  const Investments1 = await Investments.create({
    name: 'investment1, Fund 1, HF',
    date: 'Fri Jun 22 2018 11:02:01',
    amount: 1000.0,
    clientId: Client1.id,
    fundId: Fund1.id
  })
  const Investments2 = await Investments.create({
    name: 'investment2, Fund 2 PL',
    date: 'Sun Jun 23 2019 10:09:05',
    amount: 950.5,
    clientId: Client2.id,
    fundId: Fund2.id
  })
  const Investments3 = await Investments.create({
    name: 'investment3, Fund 5 PC',
    date: 'Sun Jun 23 2019 10:09:05',
    amount: 900.0,
    clientId: Client2.id,
    fundId: Fund5.id
  })
  const Investments4 = await Investments.create({
    name: 'investment4, Fund3 VC',
    date: 'Wed Jun 24 2020 09:19:35',
    amount: 560.23,
    clientId: Client3.id,
    fundId: Fund3.id
  })
  const Investments5 = await Investments.create({
    name: 'investment5, Fund 4 RE',
    date: 'Wed Jun 24 2020 09:19:35',
    amount: 860.89,
    clientId: Client3.id,
    fundId: Fund4.id
  })
  // End of Investment Seeds
  //Start of CashFlow Seeds

  const cashFlow = await Promise.all([
    CashFlows.create({
      investmentId: Investments1.id,
      date: 'Fri Jun 22 2018 11:02:01',
      return: 0.05
    }),
    CashFlows.create({
      investmentId: Investments2.id,
      date: 'Sun Jun 23 2019 10:09:05',
      return: 0.15
    }),
    CashFlows.create({
      investmentId: Investments3.id,
      date: 'Sun Jun 23 2019 10:09:05',
      return: 0.15
    }),
    CashFlows.create({
      investmentId: Investments4.id,
      date: 'Wed Jun 24 2020 09:19:35',
      return: 0.1
    }),
    CashFlows.create({
      investmentId: Investments5.id,
      date: 'Wed Jun 24 2020 09:19:35',
      return: 0.1
    })
  ])

  const clients = [Client1, Client2, Clients]
  const funds = [Fund1, Fund2, Fund3, Fund4, Fund5]
  const investments = [
    Investments1,
    Investments2,
    Investments3,
    Investments4,
    Investments5
  ]
  console.log(`seeded ${clients.length} clients`)
  console.log(`seeded ${funds.length} funds`)
  console.log(`seeded ${investments.length} investments`)
  console.log(`seeded ${cashFlow.length} CashFlow`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
