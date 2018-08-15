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
const gotMemeStocks = memeStocks => ({
  type: GET_MEMESTOCKS,
  memeStocks
})

const gotMemeStocksByUser = memeStocks => ({
  type: GET_MEMESTOCKS_BY_USER,
  memeStocks
})

//THUNK CREATORS
export const getMemeStocks = () => dispatch => {
  axios
    .get('/api/memeStocks')
    .then(({data}) => dispatch(gotMemeStocks(data)))
    .catch(error => console.error(error))
}

export const getMemeStocksByUser = userId => dispatch => {
  axios
    .get(`/api/memeStocks/${userId}`)
    .then(({data}) => dispatch(gotMemeStocksByUser(data)))
    .catch(error => console.error(error))
}

//REDUCER
export default function(state = defaultMemeStocks, action) {
  switch (action.type) {
    case GET_MEMESTOCKS:
      return {
        byId: action.memeStocks.reduce((result, memeStock) => {
          result[memeStock.id] = memeStock
          return result
        }, {}),
        allIds: action.memeStocks.map(memeStock => memeStock.id)
      }
    case GET_MEMESTOCKS_BY_USER:
      return {
        byId: {
          ...state.byId,
          ...action.memeStocks.reduce((result, memeStock) => {
            result[memeStock.id] = memeStock
            return result
          }, {})
        },
        allIds: action.memeStocks.map(memeStock => memeStock.id)
      }
    default:
      return state
  }
}

//SELECTORS

//***THIS FUNCTION CHEATS BY ASSUMING ONLY ONE USER'S WORTH OF MEMESTOCK IN THE STORE AT A TIME, WE'LL NEED TO UPDATE DEPENDING ON HOW THINGS PROGRESS */
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
