import axios from 'axios'

// ACTION TYPES
const GET_MEME_ORDERS = 'GET_MEME_ORDERS'

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

export const getMemeOrders = memeId => dispatch => {
  axios
    .get(`/api/offers/${memeId}`)
    .then(({data}) => dispatch(gotMemeOrders(data)))
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
    default:
      return state
  }
}

//SELECTORS

