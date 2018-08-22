import React from 'react'
import {Link} from 'react-router-dom'
import {MarketChart} from '../components'

const TrendingMemeObject = props => {
  const {meme, currentPrice, chartData, percentChange} = props

  return (
    <div className="box no-pad">
      <div className="columns is-mobile">
        <div className="column is-half">
          <p className="heading">{meme.symbol || 'SYM'}</p>
          <p className="title">{meme.name || 'Name'}</p>
          <div className="columns">
            <div className="column is-half">
              <Link id="card-link" to={`/allmemes/${meme.id}`}>
                <img className="image" src={meme.imageUrl || IMAGE} />
              </Link>
            </div>
            <div className="column is-half">
              <p>
                <strong>Trading At:</strong>&nbsp; ${currentPrice}
              </p>
              <p>
                <strong>Change:</strong>&nbsp; {percentChange}%
              </p>
            </div>
          </div>
        </div>
        <div className="column is-half">
          <MarketChart
            data={chartData}
            title={`(${meme.symbol || 'SYM'}) History`}
            x={chartData.x}
            y={chartData.y}
          />
        </div>
      </div>
    </div>
  )
}

export default TrendingMemeObject
