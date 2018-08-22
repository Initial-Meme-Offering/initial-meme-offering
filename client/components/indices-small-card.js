import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {valueOfLastStockTrade, percentChange} from '../store'

class SmallIndiceCard extends Component {
  render() {
    const {meme, lastTradePrice, percentChange} = this.props

    const colorOfPercent = () => {
      if (percentChange >= 0) {
        return (
          <h6 className="green-background meme-market-data white">
            +{percentChange}%
          </h6>
        )
      }
      return (
        <h6 className="red-background meme-market-data white">
          {percentChange}%
        </h6>
      )
    }

    return (
      <div className="card move-card">
        <div className="card-image">
          <figure className="image is-4by3">
            <Link id="card-link" to={`/allmemes/${meme.id}`}>
              <img src={meme.imageUrl} alt="Placeholder image" />
            </Link>
          </figure>
        </div>
        <div className="card-content">
          <div className="columns center">
            <div className="column is-6 center meme-market-data">
              <h1 className="meme-market-data">${lastTradePrice}</h1>
            </div>
            <div className="column is-6 center meme-market-data">
              {colorOfPercent()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  lastTradePrice: valueOfLastStockTrade(state, ownProps.meme.id).price,
  percentChange: percentChange(state, ownProps.meme.id)
})

export default connect(mapState)(SmallIndiceCard)
