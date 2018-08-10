import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_MEMESTOCKS = 'GET_MEMESTOCKS'

//INITIAL STATE
const defaultMemeStocks = {
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
const gotMemeStocks = memeStocks => ({
  type: GET_MEMESTOCKS,
  memeStocks
})

//THUNK CREATORS
export const getMemeStocks = () => dispatch => {
  axios
    .get('/api/memeStocks')
    .then(({data}) => dispatch(gotMemeStocks(data)))
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
    default:
      return state
  }
}
