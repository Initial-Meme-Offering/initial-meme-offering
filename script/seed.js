'use strict'

const db = require('../server/db')
const {User, Meme, MemeStock, Indice, Offer, Transaction, UserComment} = require('../server/db/models')
const {memesdata, usersdata, usercommentsdata} = require('./seedData1')
const {offersdata} = require('./seedData2')
const {memestocksdata, transactionsdata, indicesdata} = require('./seedData3')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const memesPromise = Meme.bulkCreate(memesdata, {returning: true})
  const usersPromise = User.bulkCreate(usersdata, {returning: true})
  const usercommentsPromise = UserComment.bulkCreate(usercommentsdata, {returning: true})
  const offersPromise = Offer.bulkCreate(offersdata, {returning: true})
  const memestockPromise = MemeStock.bulkCreate(memestocksdata, {returning: true})
  const transactionsPromise = Transaction.bulkCreate(transactionsdata, {returning: true})
  const indicesPromise = Indice.bulkCreate(indicesdata, {returning: true})
  
  await Promise.all([
    memesPromise,
    usersPromise,
    usercommentsPromise,
    offersPromise,
    memestockPromise,
    transactionsPromise,
    indicesPromise
  ])

  const transactions = await Transaction.findAll()
  const indices = await Indice.findAll()
  const memes = await Meme.findAll()


  async function seedMemeIndices() {
    for (let i = 0; i < memes.length; i++) {
      const randomIndices = indices.sort(shuffle).slice(0, 2)
      await memes[i].setIndices(randomIndices)
    }
    return memes
  }
  
  seedMemeIndices()

  async function seedOfferTransactions() {
    for(let i = 0; i < transactions.length; i++) {
      const randomOffers = offersdata.sort(shuffle).slice(0, 2)
      await transactions[i].setOffers(randomOffers)
    }
    return transactions
  }
  seedOfferTransactions()

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
