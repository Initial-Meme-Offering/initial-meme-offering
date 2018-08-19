import React from 'react'
import {marketChart, MarketChart} from '../components'

const TotalStockObject = props => {
  const {meme, quantity, currentPrice, lastPurchasePrice, chartData} = props
  return (
    <div className="box no-pad">
      <div className="level">
        <img className="image is-64x64" src={meme.imageUrl} />
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">{meme.symbol || 'SYM'}</p>
            <p className="title">{meme.name}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Quantity</p>
            <p className="title">{quantity}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <MarketChart
            data={chartData}
            title="Stock History"
            x={chartData.x}
            y={chartData.y}
          />
          {/* <div>
            <p className="heading">
              {offer.status === 'Completed'
                ? offer.offerType === 'sell'
                  ? 'Completed Sale'
                  : 'Completed Purchase'
                : offer.offerType === 'sell' ? 'Sell Order' : 'Buy Order'}
            </p>
            <p className="title">{`$${offer.price}`}</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default TotalStockObject
