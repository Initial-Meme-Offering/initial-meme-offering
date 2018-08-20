import React from 'react'
import {OfferForm, MarketChart} from '../components'
import {connect} from 'react-redux'
import {
  valueOfLastStockTrade,
  getSingleStockChart,
  getMemeOrders
} from '../store'
import {SingleMemeHeader, SingleMemeOrder} from './single-meme-renders'

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
    const {meme, lineChartData, memeOrders, user} = this.props
    const allIds = memeOrders.allIds
    const byId = memeOrders.byId
    const {tabActive} = this.state

    return !meme ? (
      'Loading...'
    ) : (
      <div>
        <section className="section is-small">
          <SingleMemeHeader name={meme.name} />
          <div className="columns">
            <div className="column is-half">
              <div className="card is-small">
                <div className="card-image">
                  <figure className="image is-48by48">
                    <img src={meme.imageUrl} alt="Placeholder image" />
                  </figure>
                </div>
              </div>
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
          </div>
          {allIds.map(id => {
            return (byId[id].offerType === tabActive && byId[id].userId !== user.id ? (
              <SingleMemeOrder
                memeId={meme.id}
                orderType={tabActive}
                order={byId[id]}
                key={id}
              />
            ) : (
              ''
            ))
          })}
        </section>
      </div>
    )
  }
}

const mapState = (state, {match}) => {
  return {
    user: state.user,
    meme: state.memes.byId[match.params.memeId],
    memeOrders: state.memeOrders,
    lastTrade: valueOfLastStockTrade(state, match.params.memeId),
    lineChartData: getSingleStockChart(state, match.params.memeId)
  }
}

const mapDispatch = dispatch => ({
  getOrders: memeId => dispatch(getMemeOrders(memeId))
})

export default connect(mapState, mapDispatch)(SingleMeme)
