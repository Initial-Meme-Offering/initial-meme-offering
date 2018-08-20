import React from 'react'
import {OfferForm, MarketChart} from '../components'
import {connect} from 'react-redux'
import {
  valueOfLastStockTrade,
  getSingleStockChart,
  getMemeOrders,
  buyOffersByMeme,
  sellOffersByMeme
} from '../store'
import SmallStockCard from './stock-card-small'
import {SingleMemeHeader, SingleMemeBuyList, SingleMemeSellList} from './single-meme-renders'

class SingleMeme extends React.Component {
  constructor() {
    super()
    this.state = {
      tabActive: 'buy'
    }
  }

  componentDidMount() {
    const memeId = this.props.match.params.memeId
    this.props.getOrders(memeId)
  }

  handleTabClick = orderType => {
    this.setState({tabActive: orderType})
  }

  render() {
    const {meme, lineChartData, buyOrders, sellOrders, user, memeStocks} = this.props
    const {tabActive} = this.state
    return !meme ? (
      'Loading...'
    ) : (
      <div>
        <section className="section is-small">
          <SingleMemeHeader name={meme.name} />
          <div className="columns">
            <div className="column is-half">
              <SmallStockCard meme={meme} />
            </div>
            <div className="column is-half">
              <MarketChart
                data={lineChartData}
                title={`${meme.name} Simple Moving Average`}
                x={lineChartData.x}
                y={lineChartData.y}
              />
              <OfferForm {...this.props} />
            </div>
          </div>
          <div className="tabs">
            <ul>
              <li
                className={tabActive === 'buy' ? 'is-active' : ''}
                onClick={() => {
                  this.handleTabClick('buy')
                }}
              >
                <a>Buy</a>
              </li>
              <li
                className={tabActive === 'sell' ? 'is-active' : ''}
                onClick={() => {
                  this.handleTabClick('sell')
                }}
              >
                <a>Sell</a>
              </li>
              
            </ul>
            {memeStocks && memeStocks[meme.id] ? <p className="tag is-large is-info">Total Shares Owned: {memeStocks[meme.id].quantity}</p> : ''}
          </div>
          {tabActive === 'sell' ? (
            <SingleMemeSellList orders={buyOrders} user={user} memeId={meme.id}/>
          ) : (
            <SingleMemeBuyList orders={sellOrders} user={user} />
          )}
        </section>
      </div>
    )
  }
}

const mapState = (state, {match}) => {
  return {
    user: state.user,
    meme: state.memes.byId[match.params.memeId],
    memeStocks: state.memeStocks.byId,
    buyOrders: buyOffersByMeme(state, {
      memeId: match.params.memeId,
      userId: state.user.id
    }),
    sellOrders: sellOffersByMeme(state, {
      memeId: match.params.memeId,
      userId: state.user.id
    }),
    lastTrade: valueOfLastStockTrade(state, match.params.memeId),
    lineChartData: getSingleStockChart(state, match.params.memeId)
  }
}

const mapDispatch = dispatch => ({
  getOrders: memeId => dispatch(getMemeOrders(memeId))
})

export default connect(mapState, mapDispatch)(SingleMeme)
