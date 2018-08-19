import axios from 'axios'
import {createSelector} from 'reselect'

//ACTION TYPES
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

//INITIAL STATE
const defaultTransactions = {
  byId: {
    0: {
      id: 0,
      quantity: 0,
      price: 0,
      seedDate: 0,
      buyUserId: 0,
      sellUserId: 0,
      memeId: 0
    }
  },
  allIds: []
}

//ACTION CREATORS
const gotTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

//THUNK CREATORS
export const getTransactions = () => dispatch => {
  axios
    .get('/api/transactions')
    .then(({data}) => dispatch(gotTransactions(data)))
    .catch(error => console.error(error))
}

//REDUCER
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        byId: action.transactions.reduce((result, trans) => {
          result[trans.id] = trans
          return result
        }, {}),
        allIds: action.transactions.map(trans => trans.id)
      }
    default:
      return state
  }
}

//SELECTORS
export const getTotalMarketChart = state => {
  return state.transactions.allIds.reduce((result, transId) => {
    result.push({
      x: new Date(state.transactions.byId[transId].seedDate),
      y: state.transactions.byId[transId].price
    })
    return result
  }, [])
}

export const getSingleStockChart = (state, memeId) => {
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


export const getTrendingStocks = state => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)
  const counts = Object.values(state.transactions.byId).reduce(
    (tally, trans) => {
      let date = new Date(trans.seedDate)
      if (date > oneMonthAgo) {
        tally[trans.memeId] = (tally[trans.memeId] || 0) + 1
      }
      return tally
    },
    {}
  )
  return Object.keys(counts)
    .sort((a, b) => counts[a] < counts[b])
    .slice(0, 5)
}

// export const valueOfLastStockTrade = (state, memeId) => {
//   // const len = state.transactions.allIds.length
//   for (let i = len; i >= 1; i--) {
//     if (state.transactions.byId[i].memeId == memeId) {
//       return state.transactions.byId[i]
//     }
//   }
//   return -1
// }

export const valueOfLastStockTrade = (transactions, memeId) => {
  const len = transactions.allIds.length
  for (let i = len; i >= 1; i--) {
    if (transactions.byId[i].memeId == memeId) {
      return transactions.byId[i]
    }
  }
  return -1
}

export const valueOfSecondLastStockTrade = (transactions, memeId) => {
  const lastStockTrade = valueOfLastStockTrade(transactions, memeId)
  return transactions.byId[lastStockTrade.id - 1]
}
