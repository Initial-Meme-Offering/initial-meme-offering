import axios from 'axios'
import {addOffer, updateMemeStocks} from '../store'

// ACTION TYPES
const GET_MEME_ORDERS = 'GET_MEME_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'

//INITIAL STATE
const defaultMemeOrders = {
  byId: {
    0: {
      id: 0,
      offerType: '',
      status: '',
      quantity: 0,
      price: 0,
      memeId: 0,
      userId: 0
    }
  },
  allIds: []
}

//ACTION CREATORS
const gotMemeOrders = orders => ({
  type: GET_MEME_ORDERS,
  orders
})

const updateOrder = order => ({
  type: UPDATE_ORDER,
  order
})

export const getMemeOrders = memeId => dispatch => {
  axios
    .get(`/api/offers/${memeId}`)
    .then(({data}) => dispatch(gotMemeOrders(data)))
    .catch(error => console.error(error))
}

export const respondToOffer = (offerId, userId) => dispatch => {
  axios
    .post(`/api/offers/complete/${offerId}`, {userId})
    .then(({data}) => {
      const {completedOrder, newOrder} = data
      dispatch(updateOrder(completedOrder))
      dispatch(addOffer(newOrder))
      dispatch(updateMemeStocks([newOrder.memeId, newOrder.quantity, newOrder.offerType, newOrder.userId]))
    })
    .catch(error => console.error(error))
}

//REDUCER
export default function(state = defaultMemeOrders, action) {
  switch (action.type) {
    case GET_MEME_ORDERS:
      return {
        byId: action.orders.reduce((result, order) => {
          result[order.id] = order
          return result
        }, {}),
        allIds: action.orders.map(order => order.id)
      }
    case UPDATE_ORDER:
      return {
        allIds: state.allIds,
        byId: {...state.byId, [action.order.id]: {...action.order}}
      }
    default:
      return state
  }
}

//SELECTORS
export const buyOffersByMeme = (state, {memeId, userId}) => {
  return Object.values(state.memeOrders.byId).reduce((result, offer) => {
    if (
      offer.offerType === 'buy' &&
      offer.status !== 'Completed' &&
      offer.memeId === Number(memeId) &&
      offer.userId !== userId
    )
      result.push({
        ...offer
      })
    return result
  }, [])
}

export const sellOffersByMeme = (state, {memeId, userId}) => {
  return Object.values(state.memeOrders.byId).reduce((result, offer) => {
    if (
      offer.offerType === 'sell' &&
      offer.status !== 'Completed' &&
      offer.memeId === Number(memeId) &&
      offer.userId !== userId
    )
      result.push({
        ...offer
      })
    return result
  }, [])
}
