'use strict'

const db = require('../server/db')
const {
  User,
  Meme,
  MemeStock,
  Offer,
  Transaction,
  MarketHistory
} = require('../server/db/models')
const {memesdata, usersdata} = require('./seedData1')
const {indicesdata} = require('./seedData3')

const shuffle = () => 0.5 - Math.random()
//will be used to add 5 minute intervals of time to dates added to the database for current transaction data
//want to mutate the original date in this instance

function dateChange(date, interval, units) {
  switch (interval) {
    case 'year':
      date.setFullYear(date.getFullYear() + units)
      break
    case 'quarter':
      date.setMonth(date.getMonth() + 3 * units)
      break
    case 'month':
      date.setMonth(date.getMonth() + units)
      break
    case 'week':
      date.setDate(date.getDate() + 7 * units)
      break
    case 'day':
      date.setDate(date.getDate() + units)
      break
    case 'hour':
      date.setTime(date.getTime() + units * 3600000)
      break
    case 'minute':
      date.setTime(date.getTime() + units * 60000)
      break
    case 'second':
      date.setTime(date.getTime() + units * 1000)
      break
    default:
      date = undefined
      break
  }
  return date
}

function dateAdd(date, interval, units) {
  var ret = new Date(date) //don't change original date
  var checkRollover = function() {
    if (ret.getDate() != date.getDate()) ret.setDate(0)
  }
  switch (interval) {
    case 'year':
      ret.setFullYear(ret.getFullYear() + units)
      checkRollover()
      break
    case 'quarter':
      ret.setMonth(ret.getMonth() + 3 * units)
      checkRollover()
      break
    case 'month':
      ret.setMonth(ret.getMonth() + units)
      checkRollover()
      break
    case 'week':
      ret.setDate(ret.getDate() + 7 * units)
      break
    case 'day':
      ret.setDate(ret.getDate() + units)
      break
    case 'hour':
      ret.setTime(ret.getTime() + units * 3600000)
      break
    case 'minute':
      ret.setTime(ret.getTime() + units * 60000)
      break
    case 'second':
      ret.setTime(ret.getTime() + units * 1000)
      break
    default:
      ret = undefined
      break
  }
  return ret
}

function randomPlusMinus() {
  return Math.random() * 2 - 1
}

function randomNumOffers() {
  return Math.floor(Math.random() * 100)
}

function randomQuantity() {
  return Math.floor(Math.random() * 200)
}

function randomUser() {
  return Math.floor(Math.random() * 50) + 1
}

//returns an array of generated data points to simulate stock activity
function getRandomData(numPoints, center, min, max, cycles) {
  var result = []
  //   var phase = Math.random() * Math.PI
  var y = center

  cycles.forEach(function(thisCycle) {
    thisCycle.phase = Math.random() * Math.PI
    thisCycle.increment = Math.PI / thisCycle.length
  })

  for (var i = 0; i < numPoints; i++) {
    cycles.forEach(function(thisCycle) {
      thisCycle.phase += thisCycle.increment * randomPlusMinus()
      y +=
        Math.sin(thisCycle.phase) *
          (thisCycle.variance / thisCycle.length) *
          (randomPlusMinus() * thisCycle.noise) +
        thisCycle.trend / thisCycle.length
    })
    if (min) y = Math.max(y, min)
    if (max) y = Math.min(y, max)
    result.push(y)
  }

  return result
}

async function preSeed() {
  await db.sync({force: true})
  console.log('db synced!')

  async function seedMemes() {
    for (let i = 0; i < memesdata.length; i++) {
      await Meme.create(memesdata[i])
    }
  }

  await seedMemes()
  console.log('Memes seeded')

  async function seedUsers() {
    for (let i = 0; i < usersdata.length; i++) {
      await User.create(usersdata[i])
    }
  }

  await seedUsers()
  console.log('Users seeded')
  async function seedMemeStocks() {
    for (let i = 1; i <= memesdata.length; i++) {
      for (let j = 1; j <= usersdata.length; j++) {
        await MemeStock.create({quantity: 4000, memeId: i, userId: j})
      }
    }
  }

  await seedMemeStocks()
  console.log('Meme Stocks seeded')

  const indices = await Meme.findAll({
    where: {
      isIndex: true
    }
  })
  const allMemes = await Meme.findAll({
    where: {
      isIndex: false
    }
  })
  const memes = allMemes.slice(0, 5)

  async function seedMemeIndices() {
    for (let i = 0; i < memes.length; i++) {
      const randomIndices = indices.sort(shuffle).slice(0, 2)
      await memes[i].setIndices(randomIndices)
    }
  }

  await seedMemeIndices()
  console.log('Meme Indices seeded')
}

async function generateTransactionData(dataVariances, memeIndex, memes) {
  const [center, min, max, highVar, medVar, lowVar] = dataVariances
  let today = new Date()
  today.getUTCDate()
  today.setUTCHours(12)
  let now = new Date()
  now.getUTCDate()
  let minutesDiff = Math.abs(now - today) / 36e5 * 12

  let data = getRandomData(minutesDiff, center, min, max, [
    {length: 7, variance: highVar, noise: 1, trend: 0},
    {length: 365, variance: medVar, noise: 1, trend: 0},
    {length: 700, variance: lowVar, noise: 0, trend: 100}
  ])

  for (let minutes = 0; minutes < data.length; minutes++) {
    await Transaction.create({
      quantity: 1,
      price: data[minutes],
      seedDate: today,
      memeId: memes[memeIndex].id
    })
    dateChange(today, 'minute', 5)
  }
}

async function generateMarketHistoryData(dataVariances, memeIndex, memes) {
  const [center, min, max, highVar, medVar, lowVar] = dataVariances
  let today = new Date()
  let yearAgoDate = dateAdd(today, 'year', -1)
  let data = getRandomData(365, center, min, max, [
    {length: 7, variance: highVar, noise: 1, trend: 0},
    {length: 365, variance: medVar, noise: 1, trend: 0},
    {length: 700, variance: lowVar, noise: 0, trend: 100}
  ])
  for (let day = 0; day < data.length; day++) {
    await MarketHistory.create({
      closingPrice: data[day],
      seedDateDay: yearAgoDate,
      memeId: memes[memeIndex].id
    })
    dateChange(yearAgoDate, 'day', 1)
  }
}

async function seedOffers(dataVariances, memeIndex, memes) {
  const offersLength = randomNumOffers()
  const [center, min, max, highVar, medVar, lowVar] = dataVariances
  let data = getRandomData(offersLength, center, min, max, [
    {length: 7, variance: highVar, noise: 1, trend: 0},
    {length: 365, variance: medVar, noise: 1, trend: 0},
    {length: 700, variance: lowVar, noise: 0, trend: 100}
  ])
  for (let i = 0; i < offersLength; i++) {
    const offerType = randomPlusMinus() < 0 ? 'sell' : 'buy'
    await Offer.create({
      offerType,
      status: 'Pending',
      quantity: randomQuantity(),
      price: data[i],
      userId: randomUser(),
      memeId: memes[memeIndex].id
    })
  }
}

async function seed() {
  //get previous data loaded
  const allMemes = await Meme.findAll({
    where: {
      isIndex: false
    }
  })
  const memes = allMemes.slice(0, 5)

  async function seedMarketData() {
    for (let memeIndex = 0; memeIndex < memes.length; memeIndex++) {
      let highVar = Math.floor(Math.random() * 51) + 50 //between 50 and 100
      let medVar = Math.floor(Math.random() * 21) + 20 //between 20 and 40
      let lowVar = Math.floor(Math.random() * 4) + 1 //between 1 and 4

      let center = Math.floor(Math.random() * 421) + 80
      let min = center - 0.6 * center
      let max = center + 0.25 * center
      const dataVariances = [center, min, max, highVar, medVar, lowVar]

      await generateMarketHistoryData(dataVariances, memeIndex, memes)
      await generateTransactionData(dataVariances, memeIndex, memes)
      await seedOffers(dataVariances, memeIndex, memes)
    }
  }

  await seedMarketData()
  console.log('Market data seeded')

  await db.sync()
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await preSeed()
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
