import axios from 'axios'

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

//Returns an array of {x: date, y: price} items for one stock
export const getSingleStockChart = (state, memeId) => {
  return Object.values(state.transactions.byId).reduce((result, trans) => {
    if (trans.memeId == memeId) result.push({x: trans.seedDate, y: trans.price})
    return result.sort()
  }, [])
}

//Returns three memeIds for stocks ordered by most activity in the past month
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
    .slice(0, 3)
}
