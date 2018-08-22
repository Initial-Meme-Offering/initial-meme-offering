import axios from 'axios'
import {userStockQuantitiesByMemeId} from '../store'
import moment from 'moment'

//ACTION TYPES
const GET_HISTORY = 'GET_HISTORY'

//INITIAL STATE
const defaultMarketHistory = {
  byId: {
    0: {
      id: 0,
      closingPrice: 0,
      seedDateDay: 0,
      memeId: 0
    }
  },
  allIds: []
}

//ACTION CREATORS
const gotMarketHistory = history => ({
  type: GET_HISTORY,
  history
})

//THUNK CREATORS
export const getMarketHistory = () => dispatch => {
  axios
    .get('/api/markethistory')
    .then(({data}) => dispatch(gotMarketHistory(data)))
    .catch(error => console.error(error))
}

//REDUCER
export default function(state = defaultMarketHistory, action) {
  switch (action.type) {
    case GET_HISTORY:
      return {
        byId: action.history.reduce((result, hist) => {
          result[hist.id] = hist
          return result
        }, {}),
        allIds: action.history.map(hist => hist.id)
      }
    default:
      return state
  }
}

//SELECTORS

export const getTrendingMemes = state => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)
  const counts = Object.values(state.marketHistory.byId).reduce(
    (tally, hist) => {
      let date = new Date(hist.seedDateDay)
      if (date > oneMonthAgo) {
        tally[hist.memeId] = (tally[hist.memeId] || 0) + 1
      }
      return tally
    },
    {}
  )
  return Object.keys(counts)
    .sort((a, b) => counts[a] < counts[b])
    .slice(0, 5)
}

// Displays all points from all matching stocks
export const userTotalStockChart = state => {
  const userStocks = userStockQuantitiesByMemeId(state)
  return state.marketHistory.allIds.reduce((result, histId) => {
    const historyMemeId = state.marketHistory.byId[histId].memeId
    if (userStocks[historyMemeId])
      result.push({
        x: new Date(state.marketHistory.byId[histId].seedDateDay),
        y: +state.marketHistory.byId[histId].closingPrice,
        meme: historyMemeId
      })
    return result
  }, [])
}

export const getSingleStockChart = (state, memeId) => {
  const todaysData = state.transactions.allIds.reduce((result, transId) => {
    if (state.transactions.byId[transId].memeId == memeId)
      result.push({
        x: new Date(state.transactions.byId[transId].seedDate),
        y: state.transactions.byId[transId].price
      })
    return result
  }, [])
  const historicalData = state.marketHistory.allIds.reduce((result, histId) => {
    if (state.marketHistory.byId[histId].memeId == memeId)
      result.push({
        x: new Date(state.marketHistory.byId[histId].seedDateDay),
        y: state.marketHistory.byId[histId].closingPrice
      })
    return result
  }, [])
  return {today: todaysData, historical: historicalData, x: 'x', y: 'y'}
}

// Displays daily average from all matching stocks
export const userAgregateBlahStockChart = state => {
  const userStocks = userStockQuantitiesByMemeId(state)
  const dailyPrices = state.marketHistory.allIds.reduce((tally, histId) => {
    let historyRow = state.marketHistory.byId[histId]
    if (userStocks[historyRow.memeId]) {
      let date = moment(new Date(historyRow.seedDateDay))
        .format('L')
        .toString()
      tally[date] = tally[date] || []
      tally[date].push(historyRow.closingPrice)
    }
    return tally
  }, {})
  return Object.keys(dailyPrices).reduce((result, date) => {
    result.push({
      x: new Date(date),
      y: dailyPrices[date].reduce((total, price, i, arr) => {
        total += price
        return i === arr.length - 1 ? total / arr.length : total
      }, 0)
    })
    return result.sort((a, b) => a.x - b.x)
  }, [])
}

export const userAgregateStockChart = state => {
  const userStocks = userStockQuantitiesByMemeId(state)
  const dailyPrices = state.marketHistory.allIds.reduce((tally, histId) => {
    let historyRow = state.marketHistory.byId[histId]
    if (userStocks[historyRow.memeId]) {
      let date = moment(new Date(historyRow.seedDateDay))
        .format('L')
        .toString()
      tally[date] = tally[date] || []
      tally[date].push(historyRow.closingPrice)
    }
    return tally
  }, {})
  const dailyAverages = Object.keys(dailyPrices).reduce((result, date) => {
    result.push({
      x: new Date(date),
      y: dailyPrices[date].reduce((total, price, i, arr) => {
        total += price
        return i === arr.length - 1 ? total / arr.length : total
      }, 0)
    })
    return result.sort((a, b) => a.x - b.x)
  }, [])

  const todaysPrices = state.transactions.allIds.reduce((tally, transId) => {
    let transRow = state.transactions.byId[transId]
    if (userStocks[transRow.memeId]) {
      tally[transRow.memeId] = tally[transRow.memeId] || []
      tally[transRow.memeId].push(transRow.price)
    }
    return tally
  }, {})
  const averages = prices => {
    const memeIds = Object.keys(prices)
    const length = prices[memeIds[0]].length
    const result = []
    for (let i = 0; i < length; i++) {
      let sum = 0
      for (let j = 0; j < memeIds.length; j++) {
        if (prices[memeIds[j]][i]) {
          let price = prices[memeIds[j]][i]
          sum += price
        }
      }
      result.push(sum / memeIds.length)
    }
    return result
  }
  const todaysAverages = averages(todaysPrices)
  const todaysDates = Object.values(state.transactions.byId).reduce(
    (result, transRow) => {
      if (transRow.memeId == 1) {
        result.push({
          x: new Date(transRow.seedDate),
          y: 0
        })
      }
      return result
    },
    []
  )
  const todaysWithDates = todaysDates.map((dateObj, i) => {
    if (todaysAverages[i]) {
      return {...dateObj, y: todaysAverages[i]}
    }
  })
  return {today: todaysWithDates, historical: dailyAverages, x: 'x', y: 'y'}
}
