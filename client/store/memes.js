import axios from 'axios'

//ACTION TYPES
const GET_MEMES = 'GET_MEMES'

//INITIAL STATE
const defaultMemes = {
  byId: {
    0: {
      id: 0,
      name: 'Loading...',
      desc: '',
      imageUrl: '',
      status: 'released',
      totalStock: null
    }
  },
  allIds: []
}

//ACTION CREATORS
const gotMemes = memes => ({
  type: GET_MEMES,
  memes
})

//THUNK CREATORS
export const getMemes = () => dispatch => {
  axios
    .get('/api/memes')
    .then(({data}) => dispatch(gotMemes(data)))
    .catch(error => console.error(error))
}

//REDUCER
export default function(state = defaultMemes, action) {
  switch (action.type) {
    case GET_MEMES:
      return {
        byId: action.memes.reduce((result, meme) => {
          result[meme.id] = meme
          return result
        }, {}),
        allIds: action.memes.map(meme => meme.id)
      }
    default:
      return state
  }
}

//SELECTORS
export const allMemesList = state => {
  return state.memes.allIds.reduce((result, memeId) => {
    result.push(state.memes.byId[memeId])
    return result
  }, [])
}

export const memesListBySearch = (state, search) => {
  return state.memes.allIds.reduce((result, id) => {
    let meme = state.memes.byId[id]
    if (
      meme.name.toLowerCase().includes(search.toLowerCase()) ||
      meme.symbol.includes(search.toLowerCase())
    )
      result.push(meme)
    return result
  }, [])
}

export const getProductsBySearch = (productsState, productName) => {
  return productsState.allIds.reduce((result, id) => {
    if (
      productsState.byId[id].title
        .toLowerCase()
        .indexOf(productName.toLowerCase()) >= 0 ||
      productsState.byId[id].description.indexOf(productName.toLowerCase()) >= 0
    )
      result.push(productsState.byId[id])
    return result
  }, [])
}
