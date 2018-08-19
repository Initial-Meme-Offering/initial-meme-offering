import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {valueOfLastStockTrade, percentChange} from '../store'

//May need to afix cemented size to make sure multiple per row fit
class SmallStockCard extends Component {
  render() {
    const {meme, lastTradePrice, percentChange} = this.props
    // const lastTradePrice = valueOfLastStockTrade(this.props.transactions, id)
    //   .price
    // if (lastTradePrice) {
    //   var secondLastTradePrice = valueOfSecondLastStockTrade(
    //     this.props.transactions,
    //     id
    //   ).price
    // }
    // const percentChange = (
    //   (lastTradePrice - secondLastTradePrice) /
    //   secondLastTradePrice *
    //   100
    // ).toFixed(1)

    // if (this.props.transactions) {
    console.log('lastTradePrice, percentChange', lastTradePrice, percentChange)
    return (
      <div className="card meme-card">
        <div className="card-image">
          <figure className="image is-4by3">
            <Link to={`/allmemes/${meme.id}`}>
              <img src={meme.imageUrl} alt="Placeholder image" />
            </Link>
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="subtitle is-4 center">
                {meme.name} ({meme.symbol})
              </p>
            </div>
          </div>
          <div className="columns center">
            <div className="column is-6 center">
              <h1>LastPrice: ${lastTradePrice}</h1>
            </div>
            <div className="column is-6 center">
              <h1 className="green">{percentChange}%</h1>
            </div>
          </div>
        </div>
      </div>
    )
    // } else {
    //   return <h1>Data did not render</h1>
    // }
  }
}

const mapState = (state, ownProps) => ({
  transactions: state.transactions,
  lastTradePrice: valueOfLastStockTrade(state, ownProps.meme.id),
  percentChange: percentChange(state, ownProps.meme.id)
})

export default connect(mapState, null)(SmallStockCard)
