import axios from 'axios'

//ACTION TYPES
const GET_MEME_INDICES = 'GET_MEME_INDICES'

//INITIAL STATE
const defaultMemeIndices = {
  byId: {
    0: {
      indiceId: 0,
      memeId: 0
    }
  },
  allIds: []
}

//ACTION CREATORS
const gotMemeIndices = memeIndices => ({
  type: GET_MEME_INDICES,
  memeIndices
})

//THUNK CREATORS
export const getMemeIndices = () => dispatch => {
  axios
    .get('/api/memeIndices')
    .then(({data}) => dispatch(gotMemeIndices(data)))
    .catch(error => console.error(error))
}

//REDUCER
export default function(state = defaultMemeIndices, action) {
  switch (action.type) {
    case GET_MEME_INDICES:
      return {
        byId: action.memeIndices.reduce((result, memeIndice) => {
          result[memeIndice.id] = memeIndice
          return result
        }, {}),
        allIds: action.memeIndices.map(memeIndice => memeIndice.id)
      }
    default:
      return state
  }
}

//SELECTORS
export const getMemesByIndex = (state, indiceId) => {
  return state.memeIndices.allIds.reduce((result, memeIndexId) => {
    if (state.memeIndices.byId[memeIndexId].indiceId == indiceId)
      result.push(state.memes.byId[state.memeIndices.byId[memeIndexId].memeId])
    return result
  }, [])
}

export const getMemeIdsByIndice = (state, indiceId) => {
  return Object.values(state.memeIndices.byId).reduce((result, row) => {
    if (row.indiceId == indiceId) result.push(row.memeId)
    return result
  }, [])
}
