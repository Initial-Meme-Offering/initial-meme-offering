import axios from 'axios'

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

export const userTotalStockChart = (state, memeId) => {
  return state.transactions.allIds.reduce((result, transId) => {
    if (state.transactions.byId[transId].memeId == memeId) {
      result.push({
        x: new Date(state.transactions.byId[transId].seedDate),
        y: state.transactions.byId[transId].price
      })
    }
    return result
  }, [])
}

// export const getUserMemeStocksListItem = state => {
//   const hash = Object.values(state.memeStocks.byId).reduce(
//     (tally, memeStock) => {
//       if (state.memes.byId[memeStock.memeId]) {
//         let memeId = memeStock.memeId
//         tally[memeId] = (tally[memeId] || 0) + memeStock.quantity
//       }
//       return tally
//     },
//     {}
//   )
//   return Object.keys(hash).map(memeId => ({
//     id: memeId,
//     meme: state.memes.byId[memeId],
//     quantity: hash[memeId],
//     currentPrice: valueOfLastStockTrade(state, memeId),
//     lastPurchasePrice: lastPurchasePriceByUser(state, memeId)
//   }))
// }
