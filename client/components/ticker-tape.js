import React, {Component} from 'react'
import {connect} from 'react-redux'
import {valueOfLastStockTrade, percentChange} from '../store'

class TickerTape extends Component {
  render() {
    const {meme, lastTradePrice, percentChange} = this.props

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
            <div className="column">
              <div id="ticker-card">
                <div className="content">
                  <br />
                  <br />
                  <br />

                  <div id="ticker-title" className="is-size-1">{`${
                    meme.symbol
                  } $${lastTradePrice}`}</div>
                  <br />
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
  lastTradePrice: valueOfLastStockTrade(state, ownProps.meme && ownProps.meme.id).price,
  percentChange: percentChange(state, ownProps.meme && ownProps.meme.id)
})

export default connect(mapState)(TickerTape)
