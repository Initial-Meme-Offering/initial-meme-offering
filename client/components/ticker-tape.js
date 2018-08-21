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
        return <h1 id="ticker-change-green">+{percentChange}%</h1>
      }
      return <h1 id="ticker-change-red">{percentChange}%</h1>
    }

    return (
      <div id="ticker-box" className="box">
        <article id="ticker-card" className="is-centered">
          <div className="columns is-centered">
            <div className="column is-one-third">
              <figure>
                <p className="image is-128x128">
                  <br />
                  <br />
                  <img src={`${meme.imageUrl}`} />
                </p>
              </figure>
            </div>
            <div className="column is-two-thirds">
              <div id="ticker-card">
                <div className="content">
                  <br />
                  <div id="ticker-title">{`${
                    meme.symbol
                  } $${lastTradePrice}`}</div>
                  <div id="ticker-change">{colorOfPercent()}</div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  lastTradePrice: valueOfLastStockTrade(state, ownProps.meme.id).price,
  percentChange: percentChange(state, ownProps.meme.id)
})

export default connect(mapState)(TickerTape)
