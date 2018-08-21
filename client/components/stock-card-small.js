import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {valueOfLastStockTrade, percentChange} from '../store'

//May need to afix cemented size to make sure multiple per row fit
class SmallStockCard extends Component {
  render() {
    const {meme, lastTradePrice, percentChange} = this.props

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
      <div className="card meme-card move-card">
        <Link id="card-link" to={`/allmemes/${meme.id}`}>
          <div className="card-image contains-image">
            <figure className="image is-4by3 zoom">
              <img src={meme.imageUrl} alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <h1 className=" is-4 center meme-heading">{meme.symbol}</h1>
              </div>
            </div>
            <div className="columns center">
              <div className="column is-6 center meme-market-data">
                <h1 className="meme-market-data">${lastTradePrice}</h1>
              </div>
              <div className="column is-6 center meme-market-data">
                {colorOfPercent()}
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  lastTradePrice: valueOfLastStockTrade(state, ownProps.meme.id).price,
  percentChange: percentChange(state, ownProps.meme.id)
})

export default connect(mapState)(SmallStockCard)
