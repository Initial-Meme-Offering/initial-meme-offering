import axios from 'axios'

// ACTION TYPES
const GET_MEME_ORDERS = 'GET_MEME_ORDERS'
const REMOVE_ORDER = 'REMOVE_ORDER'

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

const removeOrder = order => ({
  type: REMOVE_ORDER,
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
      dispatch(removeOrder(data))
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
    case REMOVE_ORDER:
      return state
    default:
      return state
  }
}

//SELECTORS
export const buyOffersByMeme = state => {
  return Object.values(state.memeOrders.byId).reduce((result, offer) => {
    if (
      offer.offerType === 'buy' &&
      offer.status !== 'Completed'
    )
      result.push({
        meme: state.memes.byId[offer.memeId],
        ...offer
      })
    return result
  }, [])
}

export const sellOffersByMeme = state => {
  return Object.values(state.memeOrders.byId).reduce((result, offer) => {
    if (
      offer.offerType === 'sell' &&
      offer.status !== 'Completed'
    )
      result.push({
        meme: state.memes.byId[offer.memeId],
        ...offer
      })
    return result
  }, [])
}