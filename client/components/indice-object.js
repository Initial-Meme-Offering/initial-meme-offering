import React from 'react'
import {Link} from 'react-router-dom'
import {MarketChart, MemesModal} from '../components'

const IMAGE = 'https://i.imgflip.com/1o00in.jpg'

class IndiceObject extends React.Component {
  render() {
    const {indice, currentPrice, indiceMemes, chartData} = this.props
    return (
      <div className="box no-pad">
        <div className="columns is-mobile">
          <div className="column is-half">
            <p className="heading">{indice.symbol || 'SYM'}</p>
            <p className="title">{indice.name || 'Name'}</p>
            <div className="columns">
              <div className="column is-half">
                <Link id="card-link" to={`/index/${indice.id}`}>
                  <img className="image" src={indice.imageUrl || IMAGE} />
                </Link>
              </div>
              <div className="column is-half">
                <p>
                  <strong>Trading At:</strong>&nbsp; ${currentPrice}
                </p>
                <MemesModal memes={indiceMemes} indiceName={indice.name} />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-half">
          <MarketChart
            data={chartData}
            title={`(${indice.symbol || 'SYM'}) History`}
            x={chartData.x}
            y={chartData.y}
          />
        </div>
      </div>
    )
  }
}

export default IndiceObject
