import axios from 'axios'
import {
  valueOfLastStockTrade,
  lastPurchasePriceByUser,
  getSingleStockChart
} from '../store'

//ACTION TYPES
const GET_MEMESTOCKS_BY_USER = 'GET_MEMESTOCKS_BY_USER'
const UPDATE_MEMESTOCKS_BY_USER = 'UPDATE_MEMESTOCKS_BY_USER'

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

export const updateMemeStocks = ([memeId, quantity, offerType, userId]) => ({
  type: UPDATE_MEMESTOCKS_BY_USER,
  memeId,
  quantity,
  offerType,
  userId
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
    case UPDATE_MEMESTOCKS_BY_USER:
      return {
        byId: {
          ...state.byId,
          [action.memeId]: {
            ...state.byId[action.memeId],
            memeId: action.memeId,
            userId: action.userId,
            quantity:
              state.byId[action.memeId] 
                ? action.offerType === 'sell'
                  ? state.byId[action.memeId].quantity - action.quantity
                  : state.byId[action.memeId].quantity + action.quantity
                : action.quantity
          }
        },
        allIds: [...state.allIds]
      }
    default:
      return state
  }
}

//SELECTORS
export const userStockQuantitiesByMemeId = state => {
  return Object.values(state.memeStocks.byId).reduce((tally, memeStock) => {
    tally[memeStock.memeId] =
      (tally[memeStock.memeId] || 0) + memeStock.quantity
    return tally
  }, {})
}

export const getUserPieChart = state => {
  const quantities = userStockQuantitiesByMemeId(state)
  return Object.keys(quantities).map(memeId => {
    if (state.memes.byId[memeId])
      return {
        x: state.memes.byId[memeId].symbol,
        y: quantities[memeId]
      }
  })
}

export const getUserMemeStocksListItem = state => {
  const quantities = userStockQuantitiesByMemeId(state)
  return Object.keys(quantities).map(memeId => ({
    id: memeId,
    meme: state.memes.byId[memeId],
    quantity: quantities[memeId],
    currentPrice: valueOfLastStockTrade(state, memeId).price,
    lastPurchasePrice: lastPurchasePriceByUser(state, memeId),
    chartData: getSingleStockChart(state, memeId)
  }))
}
