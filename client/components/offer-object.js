import React from 'react'

const OfferObject = props => {
  const {meme, offer} = props
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
            <p className="title">{offer.quantity}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">
              {offer.status === 'Completed'
                ? offer.offerType === 'sell'
                  ? 'Completed Sale'
                  : 'Completed Purchase'
                : offer.offerType === 'sell' ? 'Sell Order' : 'Buy Order'}
            </p>
            <p className="title">{`$${offer.price}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferObject
