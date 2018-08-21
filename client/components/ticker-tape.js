import React, {Component} from 'react'
import {connect} from 'react-redux'
import {valueOfLastStockTrade, percentChange} from '../store'

class TickerTape extends Component {
  render() {
    const {meme, lastTradePrice, percentChange} = this.props
    console.log('ticker tape meme', meme)
    console.log('ticker tape price', lastTradePrice)
    console.log('ticker tape percent', percentChange)

    const colorOfPercent = () => {
      if (percentChange >= 0) {
        return (
          <h1 className="green-background meme-market-data white">
            +{percentChange}%
          </h1>
        )
      }
      return (
        <h1 className="red-background meme-market-data white">
          {percentChange}%
        </h1>
      )
    }

    return (
      <div id="ticker-card" className="card">
        <div className="card-content">
          {/* <figure className="image is-4by3"> */}
          <div className="content">{`${meme.symbol} ${lastTradePrice}`}</div>
          <div className="content">{colorOfPercent()}</div>
          {/* </figure> */}
        </div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  lastTradePrice: valueOfLastStockTrade(state, ownProps.meme.id).price,
  percentChange: percentChange(state, ownProps.meme.id)
})

export default connect(mapState)(TickerTape)
