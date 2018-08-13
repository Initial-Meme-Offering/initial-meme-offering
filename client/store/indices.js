import axios from 'axios'

//ACTION TYPES
const GET_INDICES = 'GET_INDICES'

//INITIAL STATE
const defaultIndices = {
  byId: {
    0: {
      id: 0,
      name: ''
    }
  },
  allIds: []
}

//ACTION CREATORS
const gotIndices = indices => ({
  type: GET_INDICES,
  indices
})

//THUNK CREATORS
export const getIndices = () => dispatch => {
  axios
    .get('/api/indices')
    .then(({data}) => dispatch(gotIndices(data)))
    .catch(error => console.error(error))
}

//REDUCER
export default function(state = defaultIndices, action) {
  switch (action.type) {
    case GET_INDICES:
      return {
        byId: action.indices.reduce((result, indice) => {
          result[indice.id] = indice
          return result
        }, {}),
        allIds: action.indices.map(indice => indice.id)
      }
    default:
      return state
  }
}
