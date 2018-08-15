import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import memes from './memes'
import memeStocks from './meme-stocks'
import transactions from './transactions'
import indices from './indices'
import memeIndices from './meme-indices'
import marketHistory from './market-history'
import offers from './offers'
import {reducer as formReducer} from 'redux-form'

const reducer = combineReducers({
  user,
  memes,
  memeStocks,
  transactions,
  indices,
  memeIndices,
  marketHistory,
  offers,
  form: formReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './memes'
export * from './meme-stocks'
export * from './transactions'
export * from './indices'
export * from './meme-indices'
export * from './market-history'
export * from './offers'
