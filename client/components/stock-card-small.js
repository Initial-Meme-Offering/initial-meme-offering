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
          <h1 className='green'>+{percentChange}%</h1>
        );
      }
      return <h1 className='red'>{percentChange}%</h1>
    }
  
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

export default connect(mapState)(SmallStockCard)
