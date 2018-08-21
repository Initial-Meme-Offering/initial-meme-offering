import React from 'react'
import {MarketChart} from '../components'
import {Link} from 'react-router-dom'

const TotalStockObject = props => {
  const {meme, quantity, currentPrice, lastPurchasePrice, chartData} = props
  return (
    <Link to={`/allmemes/${meme.id}`}>
      <div className="box no-pad">
        <div className="columns is-mobile">
          <div className="column is-half">
            <p className="heading">{meme.symbol || 'SYM'}</p>
            <p className="title">{meme.name}</p>
            <div className="columns">
              <div className="column is-half">
                <img className="image" src={meme.imageUrl} />
              </div>
              <div className="column is-half">
                <p>
                  <strong>Quantity Owned:</strong>&nbsp;{quantity}
                </p>
                <p>
                  <strong>Last Purchase Price:</strong>&nbsp; ${
                    lastPurchasePrice
                  }
                </p>
                <p>
                  <strong>Trading At:</strong>&nbsp; ${currentPrice}
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <MarketChart
              data={chartData}
              title={`${meme.symbol} History`}
              x={chartData.x}
              y={chartData.y}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TotalStockObject
