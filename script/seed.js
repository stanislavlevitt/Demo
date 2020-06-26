'use strict'

const db = require('../server/db')
const {Clients, Funds, Investments, CashFlows} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const clients = await Promise.all([
    Clients.create({
      name: 'Client 1',
      description: 'description for client 1',
      permission: 'All'
    }),
    Clients.create({
      name: 'Client 2',
      description: 'description for client 2',
      permission: 'PPF'
    }),
    Clients.create({
      name: 'Client 3',
      description: 'description for client 3',
      permission: 'PF'
    })
  ])

  const funds = await Promise.all([
    Funds.create({
      name: 'Fund1',
      type: 'HF',
      inception: '2018-06-22',
      description: 'description for Fund1'
    }),
    Funds.create({
      name: 'Fund2',
      type: 'PL',
      inception: '2019-06-23',
      description: 'description for Fund2'
    }),
    Funds.create({
      name: 'Fund3',
      type: 'VC',
      inception: '2020-06-24',
      description: 'description for Fund3'
    }),
    Funds.create({
      name: 'Fund4',
      type: 'RE',
      inception: '2017-06-21',
      description: 'description for Fund4'
    }),
    Funds.create({
      name: 'Fund5',
      type: 'PC',
      inception: '2016-06-20',
      description: 'description for Fund5'
    }),
    Funds.create({
      name: 'Fund6',
      type: 'HF',
      inception: '2015-06-19',
      description: 'description for Fund6'
    })
  ])

  const investments = await Promise.all([
    Investments.create({
      name: 'investment1, Fund 1, HF',
      date: 'Fri Jun 22 2018 11:02:01',
      amount: 1000.0,
      clientId: 1,
      fundId: 1
    }),
    Investments.create({
      name: 'investment2, Fund 2 PL',
      date: 'Sun Jun 23 2019 10:09:05',
      amount: 950.5,
      clientId: 2,
      fundId: 2
    }),
    Investments.create({
      name: 'investment3, Fund 5 PC',
      date: 'Sun Jun 23 2019 10:09:05',
      amount: 950.5,
      clientId: 2,
      fundId: 5
    }),
    Investments.create({
      name: 'investment4, Fund3 VC',
      date: 'Wed Jun 24 2020 09:19:35',
      amount: 860.89,
      clientId: 3,
      fundId: 3
    }),
    Investments.create({
      name: 'investment5, Fund 4 RE',
      date: 'Wed Jun 24 2020 09:19:35',
      amount: 860.89,
      clientId: 3,
      fundId: 1
    })
  ])

  const cashFlow = await Promise.all([
    CashFlows.create({
      investmentId: 1,
      date: 'Fri Jun 22 2018 11:02:01',
      return: 0.05
    }),
    CashFlows.create({
      investmentId: 2,
      date: 'Sun Jun 23 2019 10:09:05',
      return: 0.15
    }),
    CashFlows.create({
      investmentId: 3,
      date: 'Sun Jun 23 2019 10:09:05',
      return: 0.15
    }),
    CashFlows.create({
      investmentId: 4,
      date: 'Wed Jun 24 2020 09:19:35',
      return: 0.1
    }),
    CashFlows.create({
      investmentId: 5,
      date: 'Wed Jun 24 2020 09:19:35',
      return: 0.1
    })
  ])

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
