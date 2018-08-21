import axios from 'axios'

// ACTION TYPES
const GET_OFFERS = 'GET_OFFERS'
const ADD_OFFER = 'ADD_OFFER'

//INITIAL STATE
const defaultOffers = {
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
const gotOffers = offers => ({
  type: GET_OFFERS,
  offers
})

export const addOffer = offer => ({
  type: ADD_OFFER,
  offer
})

export const getOffers = () => dispatch => {
  axios
    .get(`/api/offers`)
    .then(({data}) => dispatch(gotOffers(data)))
    .catch(error => console.error(error))
}

export const postOffer = newOffer => dispatch => {
  axios
    .post('/api/offers', newOffer)
    .then(({data}) => {
      dispatch(addOffer(data))
    })
    .catch(error => console.error(error))
}

//REDUCER
export default function(state = defaultOffers, action) {
  switch (action.type) {
    case GET_OFFERS:
      return {
        byId: action.offers.reduce((result, offer) => {
          result[offer.id] = offer
          return result
        }, {}),
        allIds: action.offers.map(offer => offer.id)
      }
    case ADD_OFFER:
      return {
        byId: {...state.byId, [action.offer.id]: action.offer},
        allIds: [...state.allIds, action.offer.id]
      }
    default:
      return state
  }
}

//SELECTORS

// This selector eager loads the whole meme object along with the offer
export const offersByUser = (state, userId) => {
  return Object.values(state.offers.byId).reduce((result, offer) => {
    if (offer.userId == userId)
      result.push({
        meme: state.memes.byId[offer.memeId],
        ...offer
      })
    return result
  }, [])
}

export const buyOffersByUser = state => {
  console.log('in buyOffersByUser')
  return Object.values(state.offers.byId).reduce((result, offer) => {
    if (
      offer.userId == state.user.id &&
      offer.offerType === 'buy' &&
      offer.status !== 'Complete'
    )
      result.push({
        meme: state.memes.byId[offer.memeId],
        ...offer
      })
    return result
  }, [])
}

export const sellOffersByUser = state => {
  return Object.values(state.offers.byId).reduce((result, offer) => {
    if (
      offer.userId == state.user.id &&
      offer.offerType === 'sell' &&
      offer.status !== 'Complete'
    )
      result.push({
        meme: state.memes.byId[offer.memeId],
        ...offer
      })
    return result
  }, [])
}

export const completedOffersByUser = state => {
  return Object.values(state.offers.byId).reduce((result, offer) => {
    if (offer.userId == state.user.id && offer.status === 'Complete')
      result.push({
        meme: state.memes.byId[offer.memeId],
        ...offer
      })
    return result
  }, [])
}

export const lastPurchasePriceByUser = (state, memeId) => {
  const len = state.offers.allIds.length
  for (let i = len; i >= 1; i--) {
    if (
      state.offers.byId[i].memeId == memeId &&
      state.offers.byId[i].userId == state.user.id &&
      state.offers.byId[i].status === 'Complete'
    ) {
      return state.offers.byId[i].price
    }
  }
  return -1
}
