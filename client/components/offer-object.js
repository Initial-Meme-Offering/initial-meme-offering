import React from 'react'
import {Link} from 'react-router-dom'

const OfferObject = props => {
  const {meme, status, offerType, price, quantity} = props
  return (
    <Link to={`/allmemes/${meme.id}`}>
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
            <div>
              <p className="heading">
                {status === 'Completed'
                  ? offerType === 'sell'
                    ? 'Completed Sale'
                    : 'Completed Purchase'
                  : offerType === 'sell' ? 'Sell Order' : 'Buy Order'}
              </p>
              <p className="title">{`$${price}`}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default OfferObject
