import React from 'react'
import {OrderForm, MarketChart} from '../components'
import {connect} from 'react-redux'
import {valueOfLastStockTrade, getSingleStockChart} from '../store'
import {SingleMemeHeader, SingleMemeOrder} from './single-meme-renders'

class SingleMeme extends React.Component {
  constructor() {
    super()
    this.state = {
      tabActive: 'buy'
    }
  }

  handleTabClick = orderType => {
    this.setState({tabActive: orderType})
  }

  render() {
    const {meme, lineChartData} = this.props
    const {tabActive} = this.state
    // const lastDate = moment(lastTrade.seedDate).format('LLL')
    return !meme ? (
      'Loading...'
    ) : (
      <div>
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
            <OrderForm {...this.props} />
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
        <SingleMemeOrder orderType={tabActive} meme={meme} />
      </div>
    )
  }
}

const mapState = (state, {match}) => {
  return {
    user: state.user,
    meme: state.memes.byId[match.params.memeId],
    lastTrade: valueOfLastStockTrade(state, match.params.memeId),
    lineChartData: getSingleStockChart(state, match.params.memeId),
  }
}

const mapDispatch = dispatch => ({
  postOffer: newOffer => dispatch(postOffer(newOffer))
})

export default connect(mapState, mapDispatch)(SingleMeme)
