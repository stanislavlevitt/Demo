'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Codye',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      name: 'Murphy',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      name: 'Dan',
      email: 'dan@email.com',
      password: '1234535'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'MacBookPro 13-inch',
      type: 'Mac',
      price: 1500,
      imageUrl: 'https://www.adorama.com/images/Large/acmv962lla13.jpg',
      quantity: 40
    }),
    Product.create({
      name: 'MacBookPro Air',
      type: 'Mac',
      price: 1099,
      imageUrl: 'https://www.adorama.com/images/Large/acmvfh2lla.jpg',
      quantity: 70
    })
  ])

  // const orders = await Promise.all([
  //   Order.create({status: true, productId: 1, userId: 1}),
  //   Order.create({status: true, productId: 1, userId: 2})
  // ])

  // await users[0].addProduct(1)
  // await users[1].addProduct(1)
  // await users[2].addProduct(2)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
