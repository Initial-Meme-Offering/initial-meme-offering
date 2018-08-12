import axios from 'axios'
import history from '../history'

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
