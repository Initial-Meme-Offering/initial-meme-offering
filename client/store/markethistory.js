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
    .get('api/markethistory')
    .then(({data}) => dispatch(gotMarketHistory(data)))
    .catch(error => console.error(error))
}
