import axios from 'axios'
import {getMemeIdsByIndice, valueOfLastStockTrade, getMemesByIndex} from '.'
import moment from 'moment'

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

export const indiceAgregateStockChart = (state, indiceId) => {
  const indiceMemes = getMemeIdsByIndice(state, indiceId)
  const dailyPrices = state.marketHistory.allIds.reduce((tally, histId) => {
    let historyRow = state.marketHistory.byId[histId]
    if (indiceMemes.includes(historyRow.memeId)) {
      let date = moment(new Date(historyRow.seedDateDay))
        .format('L')
        .toString()
      tally[date] = tally[date] || []
      tally[date].push(historyRow.closingPrice)
    }
    return tally
  }, {})
  return Object.keys(dailyPrices).reduce((result, date) => {
    result.push({
      x: new Date(date),
      y: dailyPrices[date].reduce((total, price, i, arr) => {
        total += price
        return i === arr.length - 1 ? total / arr.length : total
      }, 0)
    })
    return result.sort((a, b) => a.x - b.x)
  }, [])
}

export const allIndicesList = state => {
  return state.indices.allIds.reduce((result, indiceId) => {
    result.push({
      id: indiceId,
      indice: state.indices.byId[indiceId],
      indiceMemes: getMemesByIndex(state, indiceId),
      currentPrice: valueOfLastStockTrade(state, indiceId).price,
      chartData: indiceAgregateStockChart(state, indiceId)
    })
    return result
  }, [])
}
