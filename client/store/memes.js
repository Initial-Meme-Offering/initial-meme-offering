import axios from 'axios'
import {
  getTrendingStocks,
  valueOfLastStockTrade,
  getSingleStockChart,
  percentChange
} from '.'

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
  console.log(state.memes.byId)
  return state.memes.allIds.reduce((result, memeId) => {
    if (!state.memes.byId[memeId].isIndex) {
      result.push(state.memes.byId[memeId])
    }
    return result
  }, [])
}

export const memesListBySearch = (state, search) => {
  return state.memes.allIds.reduce((result, id) => {
    let meme = state.memes.byId[id]
    if (!search && !state.memes.byId[id].isIndex) {
      result.push(meme)
    } else if (
      !state.memes.byId[id].isIndex &&
      (meme.name.toLowerCase().includes(search.toLowerCase()) ||
        meme.symbol.toLowerCase().includes(search.toLowerCase()))
    ) {
      result.push(meme)
    }
    return result
  }, [])
}

export const trendingMemesList = state => {
  const memeIds = getTrendingStocks(state)
  return memeIds.reduce((result, memeId) => {
    if (!state.memes.byId[memeId].isIndex) {
      result.push({
        id: memeId,
        meme: state.memes.byId[memeId],
        currentPrice: valueOfLastStockTrade(state, memeId).price,
        chartData: getSingleStockChart(state, memeId),
        percentChange: percentChange(state, memeId)
      })
    }
    return result
  }, [])
}
