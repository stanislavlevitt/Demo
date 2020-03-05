'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const Codye = await User.create({
    name: 'Codye',
    email: 'cody@email.com',
    password: '123'
  })
  const Murphy = await User.create({
    name: 'Murphy',
    email: 'murphy@email.com',
    password: '123'
  })
  const Dan = await User.create({
    name: 'Dan',
    email: 'dan@email.com',
    password: '1234535'
  })
  const stas = await User.create({
    name: 'stas',
    email: 'stas@stas.com',
    password: 'stas',
    isAdmin: true
  })

  await Order.create({userId: stas.id})
  await Order.create({userId: Dan.id})
  await Order.create({userId: Murphy.id})
  await Order.create({userId: Codye.id})

  const products = await Promise.all([
    Product.create({
      name: 'MacBookPro 13-inch',
      type: 'Laptop',
      price: 1500,
      imageUrl: 'https://www.adorama.com/images/Large/acmv962lla13.jpg',
      quantity: 40
    }),
    Product.create({
      name: 'MacBookPro Air',
      type: 'Laptop',
      price: 1099,
      imageUrl: 'https://www.adorama.com/images/Large/acmvfh2lla.jpg',
      quantity: 70
    }),
    Product.create({
      name: 'MacBookPro 16-inch',
      type: 'Laptop',
      price: 2399,
      imageUrl:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16touch-silver-select-201911?wid=1808&hei=1686&fmt=jpeg&qlt=80&.v=1572825196932',
      quantity: 10
    }),
    Product.create({
      name: 'iPad Pro',
      type: 'Tablet',
      price: 799,
      imageUrl:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-silver-201810_GEO_US?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1576264060419',
      quantity: 100
    }),
    Product.create({
      name: 'iPad Air',
      type: 'Tablet',
      price: 499,
      imageUrl:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-gold-201911?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1573800135063',
      quantity: 500
    }),
    Product.create({
      name: 'iPad mini',
      type: 'Tablet',
      price: 399,
      imageUrl:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-wifi-silver-201911?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1573825370078',
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

  //console.log(`seeded ${users.length} users`)
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
