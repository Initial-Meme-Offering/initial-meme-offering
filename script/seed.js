'use strict'

const db = require('../server/db')
const {
  User,
  Meme,
  MemeStock,
  Indice,
  Offer,
  Transaction,
  UserComment
} = require('../server/db/models')
const {memesdata, usersdata, usercommentsdata} = require('./seedData1')
const {
  offersdata,
  offersdata1,
  offersdata2,
  offersdata3,
  offersdata4,
  offersdata5,
  offersdata6,
  offersdata7,
  offersdata8,
  offersdata9,
  offersdata10
} = require('./seedData2')
const {memestocksdata, transactionsdata, indicesdata} = require('./seedData3')

transactionsdata.sort((transaction1, transaction2) => {
  const date1 = new Date(transaction1.seedDate)
  const date2 = new Date(transaction2.seedDate)
  return date2 - date1
})

const shuffle = () => 0.5 - Math.random()

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  async function seedMemes() {
    for(let i = 0; i < memesdata.length; i++){
      await Meme.create(memesdata[i])
    }
  }
  await seedMemes()
  console.log('Memes seeded')

  async function seedUsers() {
    for(let i = 0; i < usersdata.length; i++){
      await User.create(usersdata[i])
    }
  }

  await seedUsers()
  console.log('Users seeded')
  async function seedComments() {
    for(let i = 0; i < usercommentsdata.length; i++){
      await UserComment.create(usercommentsdata[i])
    }
  }
  await seedComments()
  console.log('Comments seeded')

  async function seedOffers() {
    for(let i = 0; i < offersdata.length; i++){
      await Offer.create(offersdata[i])
    }
  }
  await seedOffers()
  console.log('Offers seeded')

  async function seedTransactions() {
    for(let i = 0; i < transactionsdata.length; i++){
      await Transaction.create(transactionsdata[i])
    }
  }
  await seedTransactions()
  console.log('Transactions seeded')

  async function seedMemeStocks() {
    for(let i = 0; i < memestocksdata.length; i++){
      await MemeStock.create(memestocksdata[i])
    }
  }
  await seedMemeStocks()
  console.log('Meme Stocks seeded')

  async function seedIndices() {
    for(let i = 0; i < indicesdata.length; i++){
      await Indice.create(indicesdata[i])
    }
  }
  await seedIndices()
  console.log('Indices seeded')

  const transactions = await Transaction.findAll()
  const indices = await Indice.findAll()
  const memes = await Meme.findAll()
  const usercomments = await UserComment.findAll()
  const offers = await Offer.findAll()
  const users = await User.findAll()

  async function seedMemeIndices() {
    for (let i = 0; i < memes.length; i++) {
      const randomIndices = indices.sort(shuffle).slice(0, 2)
      await memes[i].setIndices(randomIndices)
    }
    return memes
  }

  await seedMemeIndices()
  console.log('Meme Indices seeded')

  async function seedOfferTransactions() {
    for (let i = 0; i < transactions.length; i++) {
      const randomOffers = offers.sort(shuffle).slice(0, 2)
      await transactions[i].setOffers(randomOffers)
    }
    return transactions
  }

  await seedOfferTransactions()
  console.log('Offer Transactions seeded')

  async function seedUserComments() {
    for (let i = 0; i < usercomments.length; i++) {
      const randomUser = users.sort(shuffle)[0]
      const randomMeme = memes.sort(shuffle)[0]
      await usercomments[i].setUser(randomUser)
      await usercomments[i].setMeme(randomMeme)
    }
  }
  await seedUserComments()
  console.log('User Comments seeded')

  await db.sync()
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
