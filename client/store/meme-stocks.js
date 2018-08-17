import axios from 'axios'

//ACTION TYPES
const GET_MEMESTOCKS_BY_USER = 'GET_MEMESTOCKS_BY_USER'

//INITIAL STATE
const defaultMemeStocks = {
  byId: {
    0: {
      id: 0,
      quantity: 0,
      userId: 0,
      memeId: 0
    }
  },
  allIds: []
}

//ACTION CREATORS
const gotMemeStocksByUser = memeStocks => ({
  type: GET_MEMESTOCKS_BY_USER,
  memeStocks
})

//THUNK CREATORS
export const getMemeStocksByUser = userId => dispatch => {
  axios
    .get(`/api/memeStocks/${userId}`)
    .then(({data}) => dispatch(gotMemeStocksByUser(data)))
    .catch(error => console.error(error))
}

//REDUCER
export default function(state = defaultMemeStocks, action) {
  switch (action.type) {
    case GET_MEMESTOCKS_BY_USER:
      return {
        byId: action.memeStocks.reduce((result, memeStock) => {
          result[memeStock.memeId] = memeStock
          return result
        }, {}),
        allIds: action.memeStocks.map(memeStock => memeStock.memeId)
      }
    default:
      return state
  }
}

//SELECTORS
export const getUserPieChart = state => {
  const hash = Object.values(state.memeStocks.byId).reduce(
    (tally, memeStock) => {
      if (state.memes.byId[memeStock.memeId]) {
        let memeName = state.memes.byId[memeStock.memeId].name
        tally[memeName] = (tally[memeName] || 0) + 1
      }
      return tally
    },
    {}
  )
  return Object.keys(hash).map(name => ({
    x: name,
    y: hash[name]
  }))
}
