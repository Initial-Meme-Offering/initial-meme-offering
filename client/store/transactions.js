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

// export const getSingleStockChart = (state, memeId) => {
//   return Object.values(state.memeStocks.byId).reduce((result, memeStock) => {
//     if(memeStock.memeId == memeId)
//     result.push({x: memeStock.})
//   }

// }
