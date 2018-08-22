import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {valueOfLastStockTrade, percentChange} from '../../store'

//May need to afix cemented size to make sure multiple per row fit
class SingleMemeCard extends Component {
  render() {
    const {meme, lastTradePrice, percentChange} = this.props

    const colorOfPercent = () => {
      if (percentChange >= 0) {
        return (
          <h1 className="meme-market-data">
            <i className="fa fa-arrow-up green" aria-hidden="true"></i> {percentChange}%
          </h1>
        )
      }
      return (
        <h1 className="meme-market-data">
          <i className="fa fa-arrow-down red" aria-hidden="true"></i> {percentChange}%
        </h1>
      )
    }

    return (
      <div className="card meme-card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={meme.imageUrl} alt="Placeholder image" />
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

export default connect(mapState)(SingleMemeCard)
